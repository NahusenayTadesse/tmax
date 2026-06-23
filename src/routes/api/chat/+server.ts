// src/routes/api/chat/+server.ts

import { json, type RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { createHmac, timingSafeEqual } from 'node:crypto';

import { PROMPT, searchProductsForAi } from '$lib/server/prompt';
import { OPENAI_KEY } from '$env/static/private';

import OpenAI from 'openai';

const CHAT_LIMIT_COOKIE = 'tmx_chat_limit';

const MAX_AI_PROMPTS = 10;
const LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const COOKIE_MAX_AGE_SECONDS = 24 * 60 * 60;

const CHAT_LIMIT_SECRET = '7c94f3d4e0bb4fa0b6fbf8b9d8224f9e8f44f6335f4cbf34421991f8bcbf6d42';

const openai = new OpenAI({
	apiKey: OPENAI_KEY
});

const MODEL = 'gpt-5.4-mini';

type ChatMessage = {
	role: 'user' | 'assistant' | 'system';
	content: string;
};

type ChatLimitPayload = {
	count: number;
	resetAt: number;
};

function base64url(value: string) {
	return Buffer.from(value).toString('base64url');
}

function fromBase64url(value: string) {
	return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(value: string) {
	return createHmac('sha256', CHAT_LIMIT_SECRET).update(value).digest('base64url');
}

function makeSignedCookie(payload: ChatLimitPayload) {
	const encodedPayload = base64url(JSON.stringify(payload));
	const signature = sign(encodedPayload);

	return `${encodedPayload}.${signature}`;
}

function readSignedCookie(cookieValue: string | undefined): ChatLimitPayload | null {
	if (!cookieValue) return null;

	const [encodedPayload, signature] = cookieValue.split('.');

	if (!encodedPayload || !signature) return null;

	const expectedSignature = sign(encodedPayload);

	const signatureBuffer = Buffer.from(signature);
	const expectedBuffer = Buffer.from(expectedSignature);

	if (
		signatureBuffer.length !== expectedBuffer.length ||
		!timingSafeEqual(signatureBuffer, expectedBuffer)
	) {
		return null;
	}

	try {
		return JSON.parse(fromBase64url(encodedPayload)) as ChatLimitPayload;
	} catch {
		return null;
	}
}

function checkAndUpdateChatLimit(cookies: import('@sveltejs/kit').Cookies) {
	const now = Date.now();

	const existing = readSignedCookie(cookies.get(CHAT_LIMIT_COOKIE));

	let payload: ChatLimitPayload;

	if (!existing || existing.resetAt <= now) {
		payload = {
			count: 1,
			resetAt: now + LIMIT_WINDOW_MS
		};
	} else {
		if (existing.count >= MAX_AI_PROMPTS) {
			return {
				allowed: false,
				remaining: 0,
				resetAt: existing.resetAt
			};
		}

		payload = {
			count: existing.count + 1,
			resetAt: existing.resetAt
		};
	}

	cookies.set(CHAT_LIMIT_COOKIE, makeSignedCookie(payload), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		maxAge: COOKIE_MAX_AGE_SECONDS
	});

	return {
		allowed: true,
		remaining: MAX_AI_PROMPTS - payload.count,
		resetAt: payload.resetAt
	};
}

const tools = [
	{
		type: 'function',
		name: 'searchProductsForAi',
		description:
			'Search the public TMax Electronics product catalog. Use only for TMax product-related questions such as product availability, prices, categories, tags, and recommendations.',
		parameters: {
			type: 'object',
			properties: {
				query: {
					type: ['string', 'null'],
					description:
						'The product search query, for example "charger", "power bank", "earbuds", or "USB flash drive".'
				},
				categoryName: {
					type: ['string', 'null'],
					description:
						'Optional product category name, for example "Mobile Accessories", "Power Solutions", "Storage Devices", "Audio Devices", or "Smart Electronics".'
				},
				tagNames: {
					type: ['array', 'null'],
					description: 'Optional product tags to filter by.',
					items: {
						type: 'string'
					}
				},
				inStockOnly: {
					type: ['boolean', 'null'],
					description: 'Whether to return only products that appear to be in stock.'
				},
				limit: {
					type: ['integer', 'null'],
					description: 'Maximum number of products to return. Must be between 1 and 8.'
				}
			},
			required: ['query', 'categoryName', 'tagNames', 'inStockOnly', 'limit'],
			additionalProperties: false
		},
		strict: true
	}
] as const;

function cleanToolArgs(args: unknown) {
	if (!args || typeof args !== 'object') {
		return {};
	}

	const value = args as {
		query?: unknown;
		categoryName?: unknown;
		tagNames?: unknown;
		inStockOnly?: unknown;
		limit?: unknown;
	};

	return {
		query: typeof value.query === 'string' ? value.query : undefined,

		categoryName: typeof value.categoryName === 'string' ? value.categoryName : undefined,

		tagNames: Array.isArray(value.tagNames)
			? value.tagNames.filter((tag): tag is string => typeof tag === 'string')
			: undefined,

		inStockOnly: typeof value.inStockOnly === 'boolean' ? value.inStockOnly : undefined,

		limit:
			typeof value.limit === 'number'
				? Math.max(1, Math.min(8, Math.floor(value.limit)))
				: undefined
	};
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { messages } = (await request.json()) as {
			messages: ChatMessage[];
		};

		if (!Array.isArray(messages)) {
			return json({ error: 'Invalid messages format.' }, { status: 400 });
		}

		const limit = checkAndUpdateChatLimit(cookies);

		if (!limit.allowed) {
			return json(
				{
					error: 'You have reached the chat limit for this device. Please try again later.',
					resetAt: new Date(limit.resetAt).toISOString()
				},
				{ status: 429 }
			);
		}

		const safeMessages = messages
			.filter((message) => message.role === 'user' || message.role === 'assistant')
			.slice(-10);

		const input = safeMessages.map((message) => ({
			role: message.role,
			content: message.content
		}));

		/**
		 * First request:
		 * The model either answers normally or asks to call searchProductsForAi.
		 */

		const firstResponse = await openai.responses.create({
			model: MODEL,
			instructions: PROMPT,
			input,
			tools,
			tool_choice: 'auto',
			parallel_tool_calls: false
		});

		const functionCalls = firstResponse.output.filter((item) => item.type === 'function_call');

		/**
		 * If the model did not call a function, return the normal answer.
		 */
		if (!functionCalls.length) {
			return json({
				reply: firstResponse.output_text || 'Sorry, I could not answer that right now.'
			});
		}

		/**
		 * Important:
		 * Preserve the model output, including function_call items,
		 * before adding function_call_output items.
		 */
		const followUpInput = [...input, ...firstResponse.output];

		for (const item of functionCalls) {
			if (item.name !== 'searchProductsForAi') {
				followUpInput.push({
					type: 'function_call_output',
					call_id: item.call_id,
					output: JSON.stringify({
						error: 'Unknown function call.'
					})
				});

				continue;
			}

			try {
				const rawArgs = JSON.parse(item.arguments || '{}');
				const args = cleanToolArgs(rawArgs);

				const result = await searchProductsForAi(args);

				followUpInput.push({
					type: 'function_call_output',
					call_id: item.call_id,
					output: JSON.stringify(result)
				});
			} catch (error) {
				console.error('searchProductsForAi failed:', error);

				followUpInput.push({
					type: 'function_call_output',
					call_id: item.call_id,
					output: JSON.stringify({
						error:
							'Product search failed. Tell the user to visit the Shop page or contact TMax support.'
					})
				});
			}
		}

		/**
		 * Second request:
		 * The model now sees the product search result and writes the final reply.
		 */
		const finalResponse = await openai.responses.create({
			model: MODEL,
			instructions: PROMPT,
			input: followUpInput,
			tools,
			tool_choice: 'auto',
			parallel_tool_calls: false
		});

		return json({
			reply: finalResponse.output_text || 'Sorry, I could not answer that right now.'
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				error: 'Something went wrong while sending your message.'
			},
			{ status: 500 }
		);
	}
};
