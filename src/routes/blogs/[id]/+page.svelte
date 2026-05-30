<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowLeftIcon, CalendarIcon } from '@lucide/svelte';
	import type { BlogItem } from '$lib/data/portfolio';
	import Gallery from '$lib/components/gallery.svelte';
	import { formatEthiopianDate } from '$lib/global.svelte.js';
	const { data } = $props();

	const item: BlogItem = $derived(data?.portfolioItems);

	const formattedDate = $derived(
		item?.createdAt ? formatEthiopianDate(new Date(item?.createdAt)) : null
	);

	const post: BlogItem = $derived(data?.portfolioItems);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{post.title} | Yebehir Ventures Blog</title>
	<meta name="title" content="{post.title} | Yebehir Ventures" />
	<meta
		name="description"
		content={post.excerpt ||
			'Read the latest from Yebehir Ventures about events, venues, and brand experiences in Addis Ababa.'}
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content="/blogs/{post.slug}" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:image" content="/files/{post.featuredImage}" />
	<meta property="article:section" content={post.category || 'Events'} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="/blogs/{post.slug}" />
	<meta property="twitter:title" content={post.title} />
	<meta property="twitter:description" content={post.excerpt} />
	<meta property="twitter:image" content="/files/{post.featuredImage}" />

	<!-- Canonical URL -->
	<link rel="canonical" href="/blogs/{post.slug}" />

	<!-- Article Specific Tags -->
	<meta name="author" content="Yebehir Ventures" />
</svelte:head>

<div class="min-h-dvh" in:fade={{ duration: 300 }}>
	<!-- Hero Image Section -->
	<div class="relative h-[50vh] overflow-hidden lg:h-[60vh]">
		<img src={`/files/${item.featuredImage}`} alt={item.title} class="h-full w-full object-cover" />
		<div
			class="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"
		></div>

		<!-- Back Button -->
		<div class="absolute top-6 left-6 z-10" in:fly={{ x: -20, duration: 400, delay: 200 }}>
			<Button
				variant="secondary"
				size="sm"
				class="shadow-lg-lg rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
				href="/blogs"
			>
				<ArrowLeftIcon class="mr-2 size-4" />
				Back to Blogs
			</Button>
		</div>

		<!-- Event Type Badge -->
		{#if item.category}
			<div class="absolute top-6 right-6 z-10" in:fly={{ x: 20, duration: 400, delay: 200 }}>
				<Badge
					class="shadow-lg-lg bg-primary/90 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm"
				>
					{item.category}
				</Badge>
			</div>
		{/if}
	</div>

	<!-- Content Section -->
	<div class="relative -mt-20 lg:-mt-32">
		<div class="mx-auto max-w-4xl px-4 lg:px-8">
			<div
				class="shadow-lg-xl rounded-2xl border bg-card p-6 lg:p-10"
				in:fly={{ y: 40, duration: 500, delay: 100 }}
			>
				<!-- Title -->
				<h1 class="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
					{item.title}
				</h1>

				<!-- Meta Information -->
				<div class="mb-6 flex flex-wrap gap-4 lg:gap-6">
					{#if formattedDate}
						<div class="flex items-center gap-2 text-muted-foreground">
							<div class="flex size-9 items-center justify-center rounded-full">
								<CalendarIcon class="size-4 " />
							</div>
							<div>
								<p class="text-xs text-muted-foreground/70">Date</p>
								<p class="text-sm font-medium text-foreground">{formattedDate}</p>
							</div>
						</div>
					{/if}
				</div>

				<Separator class="my-6" />

				<!-- Description -->
				{#if item.excerpt}
					<div class="flex flex-col gap-4">
						<p class="text-base leading-relaxed text-muted-foreground lg:text-lg">
							{item.excerpt}
						</p>
					</div>
				{/if}

				<!-- Additional Details Section -->
				<article class="mt-8 rounded-xl border border-border/50 bg-muted/50 p-6">
					{@html item.content}

					<br />

					{#if data?.images}
						<Gallery bento images={data.images} title={item.title} />
					{/if}
				</article>

				<!-- CTA Section -->
				<div class="mt-8 flex flex-col gap-3 sm:flex-row">
					<Button class="flex-1 rounded-full" href="/contact-us" size="lg"
						>Contact Us About This Blog</Button
					>
					<Button variant="outline" class="flex-1 rounded-full" size="lg" href="/blogs"
						>View More Blogs</Button
					>
				</div>
			</div>
		</div>
	</div>

	<!-- Spacer -->
	<div class="h-20"></div>
</div>

<!-- ... existing code ... -->

<!-- Gallery Section -->
