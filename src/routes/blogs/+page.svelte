<script lang="ts">
	import PortfolioHero from '$lib/components/blogs/portfolio-hero.svelte';
	import PortfolioFilters from '$lib/components/blogs/portfolio-filters.svelte';
	import PortfolioGrid from '$lib/components/blogs/portfolio-grid.svelte';
	import type { BlogItem } from '$lib/data/portfolio';

	let searchQuery = $state('');
	let selectedCategory = $state<string | null>(null);
	let { data } = $props();

	const filteredItems = $derived.by(() => {
		let items: BlogItem[] = data?.portfolioItems ?? [];

		if (selectedCategory) {
			items = items.filter((item) => item.category === selectedCategory);
		}

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
	<title>TMAX Blog | Power Bank Guides, Charging Tips & Battery Safety</title>
	<meta name="title" content="TMAX Blog | Power Bank Guides, Charging Tips & Battery Safety" />
	<meta
		name="description"
		content="Read TMAX guides about power banks, fast charging, battery capacity, safe charging habits, product care, and same-day delivery in Addis Ababa."
	/>
	<meta
		name="keywords"
		content="TMAX blog, TMAX power bank, power bank Ethiopia, Addis Ababa power bank, fast charging tips, battery safety, 22.5W charging, power bank guide"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tmax.et/blog" />
	<meta
		property="og:title"
		content="TMAX Blog | Power Bank Guides, Charging Tips & Battery Safety"
	/>
	<meta
		property="og:description"
		content="Explore practical TMAX articles about choosing the right power bank, understanding fast charging, battery safety, and daily backup power."
	/>
	<meta property="og:image" content="https://tmax.et/logo.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="TMAX Blog | Power Bank Guides, Charging Tips & Battery Safety"
	/>
	<meta
		name="twitter:description"
		content="Helpful TMAX power bank guides, charging tips, safety advice, and product care articles."
	/>
	<meta name="twitter:image" content="https://tmax.et/logo.png" />

	<link rel="canonical" href="https://tmax.et/blog" />
</svelte:head>

<div class="min-h-dvh bg-background text-foreground">
	<PortfolioHero />

	<main class="mx-auto mt-10 max-w-7xl px-4 pb-20">
		<div class="mb-10">
			<PortfolioFilters
				portfolioItems={data?.portfolioItems}
				bind:searchQuery
				placeholder="Search power bank guides"
				bind:selectedEventType={selectedCategory}
			/>
		</div>

		<div class="mb-6 text-center">
			<p class="text-sm text-muted-foreground">
				Showing <span class="font-semibold text-foreground">{resultsCount}</span>
				{resultsCount === 1 ? ' article' : ' articles'}
			</p>
		</div>

		<PortfolioGrid items={filteredItems} />
	</main>
</div>
