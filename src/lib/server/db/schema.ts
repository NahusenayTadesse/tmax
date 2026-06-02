import {
	mysqlTable,
	int,
	varchar,
	boolean,
	mysqlEnum,
	decimal,
	text,
	timestamp
} from 'drizzle-orm/mysql-core';
import { secureFields, user } from './auth.schema';

export const blogCategories = mysqlTable('blog_categories', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull()
});

export const blog = mysqlTable('blog', {
	id: int('id').primaryKey().autoincrement(),
	title: varchar({ length: 255 }).notNull(),
	categoryId: int('category_id')
		.notNull()
		.references(() => blogCategories.id),
	slug: varchar({ length: 255 }).notNull(),
	excerpt: text(),
	content: text(),
	isFeaturedOnHome: boolean('is_featured_on_home').default(false),
	featuredImage: varchar('featured_image', { length: 255 }),
	...secureFields
});

export const blogGallery = mysqlTable('blog_gallery', {
	id: int('id').primaryKey().autoincrement(),

	blogId: int('blog_id')
		.notNull()
		.references(() => blog.id),
	imageUrl: varchar('image_url', { length: 255 })
});

export const paymentMethods = mysqlTable('payment_methods', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 100 }).notNull().unique(),
	description: varchar('description', { length: 255 }),
	...secureFields
});

export const products = mysqlTable('products', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 50 }).notNull(),
	brand: varchar('brand', { length: 100 }),
	featuredImage: varchar('featured_image', { length: 255 }),
	description: varchar('description', { length: 255 }),
	quantity: int('quantity').notNull().default(0),
	commissionAmount: decimal('commission_amount', { precision: 10, scale: 2 }).notNull(),
	supplierId: int('supplier_id').references(() => productSuppliers.id),
	reorderLevel: int('reorder_level'),
	...secureFields
});

export const tags = mysqlTable('tags', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 50 }).notNull()
});

export const productTags = mysqlTable('product_tags', {
	productId: int('product_id').references(() => products.id, { onDelete: 'cascade' }),
	tagId: int('tag_id').references(() => tags.id, { onDelete: 'cascade' })
});

export const prices = mysqlTable('prices', {
	id: int('id').primaryKey().autoincrement(),
	productId: int('product_id').references(() => products.id, { onDelete: 'cascade' }),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(),
	amount: varchar('variant', { length: 255 }).notNull()
});

export const productImages = mysqlTable('product_images', {
	id: int('id').primaryKey().autoincrement(),
	productId: int('product_id').references(() => products.id, { onDelete: 'cascade' }),
	imageUrl: varchar('image_url', { length: 255 }).notNull()
});

export const customers = mysqlTable('customers', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 100 }).notNull(),
	email: varchar('email', { length: 100 }).notNull().unique(),
	phone: varchar('phone', { length: 20 }),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	address: varchar('address', { length: 255 }),
	...secureFields
});

export const discounts = mysqlTable('discounts', {
	id: int('id').primaryKey().autoincrement(),
	amount: decimal('amount', { precision: 10, scale: 2 }),
	productId: int('product_id').references(() => products.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 50 }).notNull().unique(),
	description: varchar('description', { length: 255 }),
	...secureFields
});

export const productCategories = mysqlTable('product_categories', {
	id: int('id').autoincrement().primaryKey(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	description: varchar('description', { length: 255 }),
	...secureFields
});

export const categoriesProducts = mysqlTable('categories_products', {
	id: int('id').autoincrement().primaryKey(),
	categoryId: int('category_id').references(() => productCategories.id, { onDelete: 'cascade' }),
	productId: int('product_id').references(() => products.id, { onDelete: 'cascade' }),
	...secureFields
});

export const transactions = mysqlTable('transactions', {
	id: int('id').primaryKey().autoincrement(),
	amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
	paymentStatus: mysqlEnum('payment_status', [
		'pending',
		'pending',
		'paid',
		'unpaid',
		'refunded',
		'partially_paid',
		'partially_refunded',
		'overpaid',
		'disputed'
	]).default('pending'),
	paymentMethodId: int('payment_method_id').references(() => paymentMethods.id, {
		onDelete: 'set null'
	}),
	recieptLink: varchar('reciept_link', { length: 255 }),
	...secureFields
});
export const productAdjustments = mysqlTable('product_adjustments', {
	id: int('id').autoincrement().primaryKey(),
	productsId: int('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	supplierId: int('supplier_id').references(() => productSuppliers.id),
	adjustment: int('adjustment').notNull(), // e.g., +50 for new stock, -1 for a sale, -1 for internal use
	reason: varchar('reason', { length: 255 }),
	transactionId: int('transaction_id').references(() => transactions.id), // Link directly to the sale that caused the adjustment
	...secureFields
});

export const orders = mysqlTable('orders', {
	id: int('id').autoincrement().primaryKey(),
	customerId: int('customer_id').references(() => customers.id),
	status: mysqlEnum('status', ['pending', 'delivered', 'cancelled']),
	transactionId: int('transaction_id').references(() => transactions.id), // Link directly to the sale that caused the adjustment
	...secureFields
});

export const orderItems = mysqlTable('order_items', {
	id: int('id').autoincrement().primaryKey(),
	orderId: int('order_id').references(() => orders.id),
	productId: int('product_id').references(() => products.id),
	quantity: int('quantity').notNull(),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(),
	amount: varchar('amount', { length: 255 }).notNull(),
	...secureFields
});

export const damagedProducts = mysqlTable('damaged_products', {
	id: int('id').primaryKey().autoincrement(),
	productId: int('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	quantity: int('quantity').notNull(),
	damagedBy: varchar('damaged_by', { length: 36 }).notNull(),
	reason: varchar('reason', { length: 255 }).notNull(),
	...secureFields
});

export const productSuppliers = mysqlTable('product_suppliers', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 50 }).notNull(),
	phone: varchar('phone', { length: 20 }).notNull(),
	email: varchar('email', { length: 100 }),
	description: varchar('description', { length: 255 }),
	...secureFields
});

export const contactMessages = mysqlTable('contact_messages', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 100 }).notNull(),
	phone: varchar('phone', { length: 20 }),
	subject: varchar('subject', { length: 255 }).notNull(),
	address: varchar('address', { length: 255 }),
	message: text('message').notNull(),
	seen: boolean('seen').default(false),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const gallery = mysqlTable('gallery', {
	id: int('id').primaryKey().autoincrement(),
	imageUrl: varchar('image_url', { length: 255 })
});

export const testimonials = mysqlTable('testimonials', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 255 }).notNull(),
	position: varchar('position', { length: 255 }),
	message: text('message').notNull(),
	avatar: varchar('avatar', { length: 255 }),
	...secureFields
});

export * from './auth.schema';
