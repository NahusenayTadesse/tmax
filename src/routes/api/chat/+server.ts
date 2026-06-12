// src/routes/api/chat/+server.ts

import { json, type RequestHandler } from '@sveltejs/kit';
import { PROMPT } from '$lib/server/prompt';

import { OPENAI_KEY } from '$env/static/private';
import OpenAI from 'openai';
const openai = new OpenAI({
	apiKey: OPENAI_KEY
});

type ChatMessage = {
	role: 'user' | 'assistant' | 'system';
	content: string;
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { messages } = (await request.json()) as {
			messages: ChatMessage[];
		};

		if (!Array.isArray(messages)) {
			return json({ error: 'Invalid messages format.' }, { status: 400 });
		}

		const safeMessages = messages
			.filter((message) => message.role === 'user' || message.role === 'assistant')
			.slice(-10);

		const response = await openai.responses.create({
			model: 'gpt-5.4-mini',
			instructions: PROMPT,
			input: safeMessages.map((message) => ({
				role: message.role,
				content: message.content
			}))
		});

		return json({
			reply: response.output_text || 'Sorry, I could not answer that right now.'
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
