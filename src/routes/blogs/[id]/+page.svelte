<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import {
		ArrowLeftIcon,
		CalendarIcon,
		BatteryChargingIcon,
		ZapIcon,
		ShieldCheckIcon,
		BookOpenIcon,
		ArrowRightIcon
	} from '@lucide/svelte';
	import Gallery from '$lib/components/gallery.svelte';
	import { formatEthiopianDate } from '$lib/global.svelte.js';

	const { data } = $props();

	const item = $derived(data?.portfolioItems);
	const post = $derived(data?.portfolioItems);

	const formattedDate = $derived(
		item?.createdAt ? formatEthiopianDate(new Date(item.createdAt)) : null
	);

	const pageTitle = $derived(`${post?.title ?? 'TMAX Power Guide'} | TMAX Blog`);
	const pageDescription = $derived(
		post?.excerpt ||
			'Read TMAX guides about power banks, fast charging, battery capacity, safe charging, and everyday backup power.'
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />
	<meta name="description" content={pageDescription} />
	<meta
		name="keywords"
		content="TMAX blog, TMAX power bank, power bank Ethiopia, Addis Ababa power bank, fast charging, battery safety, 22.5W charging"
	/>

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://tmax.et/blogs/${post?.slug ?? ''}`} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta
		property="og:image"
		content={`https://tmax.et/files/${post?.featuredImage ?? 'logo.png'}`}
	/>
	<meta property="article:section" content={post?.category || 'Power Bank Guide'} />
	<meta property="article:author" content="TMAX" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={`https://tmax.et/blogs/${post?.slug ?? ''}`} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta
		name="twitter:image"
		content={`https://tmax.et/files/${post?.featuredImage ?? 'logo.png'}`}
	/>

	<link rel="canonical" href={`https://tmax.et/blogs/${post?.slug ?? ''}`} />
	<meta name="author" content="TMAX" />
</svelte:head>

<div
	class="relative min-h-dvh overflow-hidden bg-background text-foreground"
	in:fade={{ duration: 300 }}
>
	<div
		class="absolute top-0 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
	></div>
	<div class="absolute right-0 bottom-40 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>

	<section class="relative overflow-hidden px-4 pt-8 pb-28 sm:px-6 lg:px-8">
		<div
			class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:28px_28px]"
		></div>

		<div class="mx-auto max-w-6xl">
			<div class="mb-8 flex items-center justify-between gap-4">
				<Button
					variant="outline"
					size="sm"
					class="rounded-full border-primary/20 bg-background/40 backdrop-blur-xl"
					href="/blogs"
					in:fly={{ x: -16, duration: 400 }}
				>
					<ArrowLeftIcon class="mr-2 size-4" />
					Back to Guides
				</Button>

				{#if item?.category}
					<Badge
						class="border border-primary/20 bg-primary/10 px-4 py-1.5 text-primary backdrop-blur-xl hover:bg-primary/10"
						in:fly={{ x: 16, duration: 400 }}
					>
						{item.category}
					</Badge>
				{/if}
			</div>

			<div class="grid gap-10 lg:grid-cols-12 lg:items-center">
				<div class="lg:col-span-6" in:fly={{ y: 24, duration: 600 }}>
					<div
						class="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold tracking-widest text-primary uppercase backdrop-blur-xl"
					>
						<BookOpenIcon class="size-4" />
						TMAX Power Guide
					</div>

					<h1 class="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
						{item?.title}
					</h1>

					{#if item?.excerpt}
						<p class="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
							{item.excerpt}
						</p>
					{/if}

					{#if formattedDate}
						<div
							class="mt-8 inline-flex items-center gap-3 rounded-2xl border border-primary/10 bg-card/40 px-4 py-3 backdrop-blur-2xl"
						>
							<div
								class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
							>
								<CalendarIcon class="size-5" />
							</div>
							<div>
								<p class="text-xs text-muted-foreground">Published</p>
								<p class="text-sm font-bold">{formattedDate}</p>
							</div>
						</div>
					{/if}
				</div>

				<div class="lg:col-span-6" in:fly={{ y: 24, duration: 600, delay: 120 }}>
					<div
						class="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/40 p-2 shadow-2xl backdrop-blur-2xl"
					>
						<div
							class="absolute top-6 right-6 z-10 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary backdrop-blur-xl"
						>
							TMAX
						</div>

						<img
							src={`/files/${item?.featuredImage}`}
							alt={item?.title}
							class="h-[360px] w-full rounded-2xl object-cover sm:h-[460px]"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="relative -mt-14 px-4 pb-20 sm:px-6 lg:px-8">
		<div
			class="mx-auto max-w-4xl rounded-3xl border border-primary/10 bg-card/50 p-6 shadow-2xl backdrop-blur-2xl lg:p-10"
			in:fly={{ y: 36, duration: 600, delay: 150 }}
		>
			<div class="mb-8 grid gap-4 sm:grid-cols-3">
				<div class="rounded-2xl border border-primary/10 bg-background/40 p-4 backdrop-blur-xl">
					<BatteryChargingIcon class="mb-3 size-6 text-primary" />
					<p class="text-sm font-bold">Capacity</p>
					<p class="mt-1 text-xs text-muted-foreground">Choose the right backup power.</p>
				</div>

				<div class="rounded-2xl border border-primary/10 bg-background/40 p-4 backdrop-blur-xl">
					<ZapIcon class="mb-3 size-6 text-primary" />
					<p class="text-sm font-bold">Fast Charging</p>
					<p class="mt-1 text-xs text-muted-foreground">Understand output and speed.</p>
				</div>

				<div class="rounded-2xl border border-primary/10 bg-background/40 p-4 backdrop-blur-xl">
					<ShieldCheckIcon class="mb-3 size-6 text-primary" />
					<p class="text-sm font-bold">Safety</p>
					<p class="mt-1 text-xs text-muted-foreground">Charge smarter every day.</p>
				</div>
			</div>

			<Separator class="mb-8 bg-primary/10" />

			<article
				class="prose prose-sm prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary max-w-none text-muted-foreground"
			>
				{@html item?.content}
			</article>

			{#if data?.images}
				<div class="mt-10">
					<Gallery bento images={data.images} title={item?.title} />
				</div>
			{/if}

			<Separator class="my-8 bg-primary/10" />

			<div
				class="rounded-3xl border border-primary/10 bg-primary/5 p-6 text-center backdrop-blur-xl"
			>
				<h2 class="text-2xl font-black tracking-tight">Need help choosing a TMAX power bank?</h2>
				<p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
					Explore our models or contact TMAX support for help choosing the right capacity and
					charging speed.
				</p>

				<div class="mt-6 flex flex-col gap-3 sm:flex-row">
					<Button class="group flex-1 rounded-full" href="/products" size="lg">
						View Power Banks
						<ArrowRightIcon class="ml-2 size-4 transition-transform group-hover:translate-x-1" />
					</Button>

					<Button
						variant="outline"
						class="flex-1 rounded-full border-primary/20 bg-background/40 backdrop-blur-xl"
						size="lg"
						href="/blogs"
					>
						Read More Guides
					</Button>
				</div>
			</div>
		</div>
	</section>
</div>
