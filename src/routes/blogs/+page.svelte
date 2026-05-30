<script lang="ts">
	import PortfolioHero from '$lib/components/blogs/portfolio-hero.svelte';
	import PortfolioFilters from '$lib/components/blogs/portfolio-filters.svelte';
	import PortfolioGrid from '$lib/components/blogs/portfolio-grid.svelte';
	import type { BlogItem } from '$lib/data/portfolio';

	// Set app hook

	// Filter state
	let searchQuery = $state('');
	let selectedEventType = $state<string | null>(null);
	let { data } = $props();
	// Filtered items
	const filteredItems = $derived.by(() => {
		let items: BlogItem[] = data?.portfolioItems ?? [];

		// Filter by event type
		if (selectedEventType) {
			items = items.filter((item) => item.category === selectedEventType);
		}

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			items = items.filter(
				(item) =>
					item.title.toLowerCase().includes(query) ||
					item.excerpt?.toLowerCase().includes(query) ||
					item.category?.toLowerCase().includes(query) ||
					item.content?.toLowerCase().includes(query)
			);
		}

		return items;
	});

	const resultsCount = $derived(filteredItems.length);
</script>

<svelte:head>
	<title>Insights & Event Trends | Yebehir Ventures Blog</title>
	<meta name="title" content="Insights & Event Trends | Yebehir Ventures Blog" />
	<meta
		name="description"
		content="Expert advice on event management, brand experiences, and venue hosting in Ethiopia. Stay ahead of the curve with the Yebehir Ventures blog."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="/blog" />
	<meta property="og:title" content="Yebehir Ventures Blog | Event Excellence in Addis" />
	<meta
		property="og:description"
		content="Discover professional insights on creating, managing, and monetizing events."
	/>
	<meta property="og:image" content="/logo.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Yebehir Ventures Blog" />
	<meta property="twitter:image" content="/logo.jpg" />

	<link rel="canonical" href="https://yebehir.com/blog" />
</svelte:head>

<div class="min-h-dvh bg-background text-foreground">
	<!-- Header -->

	<!-- Hero Section -->
	<PortfolioHero />

	<!-- Main Content -->
	<main class="mx-auto mt-10 max-w-7xl px-4 pb-20">
		<!-- Filters -->
		<div class="mb-10">
			<PortfolioFilters
				portfolioItems={data?.portfolioItems}
				bind:searchQuery
				placeholder="Search blogs"
				bind:selectedEventType
			/>
		</div>

		<!-- Results count -->
		<div class="mb-6 text-center">
			<p class="text-muted-foreground">
				Showing <span class="font-semibold text-foreground">{resultsCount}</span>
				{resultsCount === 1 ? 'blog' : 'blogss'}
			</p>
		</div>

		<!-- Portfolio Grid -->
		<PortfolioGrid items={filteredItems} />
	</main>
</div>
