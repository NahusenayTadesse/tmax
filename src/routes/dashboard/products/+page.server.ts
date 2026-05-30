import { db } from '$lib/server/db';
import {
	products,
	productCategories,
	prices,
	tags,
	categoriesProducts,
	productTags
} from '$lib/server/db/schema';
import { eq, inArray } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(schema));

	// First, get products
	const productsData = await db
		.select({
			id: products.id,
			name: products.name,
			image: products.featuredImage,
			description: products.description
		})
		.from(products)
		.leftJoin(productCategories, eq(productCategories.id, products.categoryId))
		.where(eq(products.isActive, true));

	// Then, get prices for those products
	const productIds = productsData.map((p) => p.id);
	const pricesData = await db.select().from(prices);

	// Then filter in memory

	const relevantPrices = pricesData.filter((p) => productIds.includes(p.productId));
	const relevantProductCategories = await db
		.select({
			name: productCategories.name
		})
		.from(categoriesProducts)
		.leftJoin(productCategories, eq(productCategories.id, categoriesProducts.categoryId))
		.where(inArray(categoriesProducts.productId, productIds));
	const relevantProductTags = await db
		.select({
			name: tags.name
		})
		.from(productTags)
		.leftJoin(tags, eq(productTags.tagId, tags.id))
		.where(inArray(productTags.productId, productIds));

	// Merge in application code
	const productList = productsData.map((p) => ({
		...p,
		priceList: relevantPrices
			.filter((price) => price.productId === p.id)
			.map((price) => ({
				amount: price.amount + ' Pieces',
				price: 'ETB ' + price.price
			})),
		categories: relevantProductCategories,
		tags: relevantProductTags
	}));

	return {
		productList,
		form
	};
};
