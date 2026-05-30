CREATE TABLE `blog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`category_id` int NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text,
	`is_featured_on_home` boolean DEFAULT false,
	`featured_image` varchar(255),
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `blog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	CONSTRAINT `blog_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`blog_id` int NOT NULL,
	`image_url` varchar(255),
	CONSTRAINT `blog_gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `blog` ADD CONSTRAINT `blog_category_id_blog_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog` ADD CONSTRAINT `blog_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog` ADD CONSTRAINT `blog_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog` ADD CONSTRAINT `blog_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog_gallery` ADD CONSTRAINT `blog_gallery_blog_id_blog_id_fk` FOREIGN KEY (`blog_id`) REFERENCES `blog`(`id`) ON DELETE no action ON UPDATE no action;