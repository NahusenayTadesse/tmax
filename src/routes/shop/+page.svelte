<script lang="ts">
	import ProductCard from '$lib/components/product-card.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';
	import { SearchIcon, XIcon, ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { goto } from '$app/navigation';
	import { page as sveltePage } from '$app/state';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	let searchQuery = $state(sveltePage.url.searchParams.get('search') ?? '');
	let minPrice = $derived(Number(data?.priceRange?.minPrice) || 0);
	let maxPrice = $derived(Number(data?.priceRange?.maxPrice));

	let sliderPrices = $state([minPrice, maxPrice]);
	let selectedCategories = $state(
		sveltePage.url.searchParams.get('categories')?.split(',').filter(Boolean) ?? []
	);
	const hasActiveFilters = $derived(sveltePage.url.searchParams.toString() !== '');

	// All unique categories from the current product list
	const categories = $derived(data?.categories);

	const brands = $derived(data?.brandList.map((b) => b.name));

	const tags = $derived(data?.tagList);

	let selectedTags = $state(
		sveltePage.url.searchParams.get('tags')?.split(',').filter(Boolean) ?? []
	);

	let selectedBrands = $state(
		sveltePage.url.searchParams.get('brands')?.split(',').filter(Boolean) ?? []
	);

	const isAllSelected = $derived(selectedCategories.length === 0);
	const isAllTagsSelected = $derived(selectedTags.length === 0);
	const isAllBrandsSelected = $derived(selectedBrands.length === 0);

	function updateFilters(newParams: Record<string, string | number | undefined>) {
		const newUrl = new URL(sveltePage.url);
		for (const [key, value] of Object.entries(newParams)) {
			if (value !== undefined && value !== '' && value !== 0) {
				newUrl.searchParams.set(key, value.toString());
			} else {
				newUrl.searchParams.delete(key);
			}
		}
		if (!newParams.page) newUrl.searchParams.set('page', '1');
		goto(newUrl, { keepFocus: true, noScroll: true });
	}

	function handleSearch() {
		updateFilters({ search: searchQuery });
	}
	let debounceTimer = $state();
	function handleSliderChange() {
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			applyPriceFilter();
		}, 300);
	}

	function applyPriceFilter() {
		toast.success('Price filter applied');
		const newUrl = new URL(sveltePage.url);
		newUrl.searchParams.set('min', sliderPrices[0].toString());
		newUrl.searchParams.set('max', sliderPrices[1].toString());
		newUrl.searchParams.set('page', '1');
		goto(newUrl, { keepFocus: true, noScroll: true });
	}

	function applyCategoryFilter(category: string) {
		if (selectedCategories.includes(category)) {
			selectedCategories = selectedCategories.filter((c) => c !== category);
		} else {
			selectedCategories = [...selectedCategories, category];
		}
		const newUrl = new URL(sveltePage.url);
		if (selectedCategories.length > 0) {
			newUrl.searchParams.set('categories', selectedCategories.join(','));
		} else {
			newUrl.searchParams.delete('categories');
		}
		newUrl.searchParams.set('page', '1');
		goto(newUrl, { keepFocus: true, noScroll: true });
	}

	function applyBrandFilter(brand: string) {
		if (selectedBrands.includes(brand)) {
			selectedBrands = selectedBrands.filter((c) => c !== brand);
		} else {
			selectedBrands = [...selectedBrands, brand];
		}
		const newUrl = new URL(sveltePage.url);
		if (selectedBrands.length > 0) {
			newUrl.searchParams.set('brands', selectedBrands.join(','));
		} else {
			newUrl.searchParams.delete('brands');
		}
		newUrl.searchParams.set('page', '1');
		goto(newUrl, { keepFocus: true, noScroll: true });
	}

	function applyTagFilter(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
		const newUrl = new URL(sveltePage.url);
		if (selectedTags.length > 0) {
			newUrl.searchParams.set('tags', selectedTags.join(','));
		} else {
			newUrl.searchParams.delete('tags');
		}
		newUrl.searchParams.set('page', '1');
		goto(newUrl, { keepFocus: true, noScroll: true });
	}

	function clearCategories() {
		selectedCategories = [];
		const newUrl = new URL(sveltePage.url);
		newUrl.searchParams.delete('categories');
		goto(newUrl, { keepFocus: true, noScroll: true });
	}

	function clearBrands() {
		selectedBrands = [];
		const newUrl = new URL(sveltePage.url);
		newUrl.searchParams.delete('brands');
		goto(newUrl, { keepFocus: true, noScroll: true });
	}

	function clearTags() {
		selectedTags = [];
		const newUrl = new URL(sveltePage.url);
		newUrl.searchParams.delete('tags');
		goto(newUrl, { keepFocus: true, noScroll: true });
	}

	function resetFilters() {
		searchQuery = '';
		minPrice = 0;
		maxPrice = 2000;
		selectedCategories = [];
		goto(sveltePage.url.pathname);
	}

	const goToPage = (p: number) => updateFilters({ page: p });
</script>

<svelte:head>
	<title>Products | Industrial & Construction Supply Solutions</title>
	<meta
		name="description"
		content="Procure professional-grade mechanical hand tools, construction materials, and bulk industrial supplies."
	/>
</svelte:head>

<div class="min-h-dvh bg-background pb-8 text-foreground transition-colors duration-300">
	<!-- Sticky Header + Search -->
	<header class="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div class="mb-6 flex items-center justify-between">
				<div>
					<h2 class="text-3xl font-bold">Smartphones</h2>
					<p class="mt-1 text-muted-foreground">
						{Number(data?.productCount.count)} Powerbanks, {brands.length} brands - all warranty-backed
					</p>
				</div>
				{#if hasActiveFilters}
					<Button variant="outline" size="sm" onclick={resetFilters}>
						<XIcon size={14} class="mr-1" /> Reset Filters
					</Button>
				{/if}
			</div>
			<div class="relative">
				<SearchIcon class="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="text"
					placeholder="Search by product name..."
					bind:value={searchQuery}
					oninput={handleSearch}
					class="h-11 rounded-lg pl-10"
				/>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
			<!-- Filters Sidebar -->
			<aside class="lg:col-span-1">
				<div class="sticky top-36 space-y-6">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-semibold">Filters</h3>
					</div>

					<!-- Price Range -->
					<div class="flex flex-col gap-4 border-b pb-6">
						<h4 class="text-sm font-medium">Price Range</h4>
						Showing Prices {sliderPrices[0]} - {sliderPrices[1]}
						<Slider
							type="multiple"
							bind:value={sliderPrices}
							step={1}
							min={minPrice}
							max={maxPrice}
							onValueChange={handleSliderChange}
						/>

						<div class="flex justify-between text-xs text-muted-foreground">
							<span>{minPrice} ETB</span>
							<span>{maxPrice} ETB</span>
						</div>
					</div>
					<!-- Brands -->

					<div class="flex flex-col gap-3">
						<h4 class="text-sm font-medium">Brands</h4>
						<div class="flex items-center gap-3">
							<Checkbox
								id="brand-all"
								checked={isAllBrandsSelected}
								onCheckedChange={clearBrands}
								class="cursor-pointer"
							/>
							<Label for="category-all" class="flex-1 cursor-pointer text-sm">All</Label>
						</div>
						{#each brands as brand (brand)}
							<div class="flex items-center gap-3">
								<Checkbox
									id={`brand-${brand}`}
									checked={selectedBrands?.includes(brand)}
									onCheckedChange={() => applyBrandFilter(brand)}
									class="cursor-pointer"
								/>
								<Label for={`category-${brand}`} class="flex-1 cursor-pointer text-sm">
									{brand}
								</Label>
							</div>
						{/each}
					</div>

					<!-- Categories -->
					<div class="flex flex-col gap-3">
						<h4 class="text-sm font-medium">Categories</h4>
						<div class="flex items-center gap-3">
							<Checkbox
								id="category-all"
								checked={isAllSelected}
								onCheckedChange={clearCategories}
								class="cursor-pointer"
							/>
							<Label for="category-all" class="flex-1 cursor-pointer text-sm">All</Label>
						</div>
						{#each categories as category (category)}
							<div class="flex items-center gap-3">
								<Checkbox
									id={`category-${category}`}
									checked={selectedCategories.includes(category.name)}
									onCheckedChange={() => applyCategoryFilter(category.name)}
									class="cursor-pointer"
								/>
								<Label for={`category-${category.name}`} class="flex-1 cursor-pointer text-sm">
									{category.name}
								</Label>
							</div>
						{/each}
					</div>
					<!-- Tags -->
					<div class="flex flex-col gap-3">
						<h4 class="text-sm font-medium">Tags</h4>
						<div class="flex items-center gap-3">
							<Checkbox
								id="tag-all"
								checked={isAllTagsSelected}
								onCheckedChange={clearTags}
								class="cursor-pointer"
							/>
							<Label for="category-all" class="flex-1 cursor-pointer text-sm">All</Label>
						</div>
						{#each tags as tag (tag)}
							<div class="flex items-center gap-3">
								<Checkbox
									id={`tag-${tag}`}
									checked={selectedTags.includes(tag.name)}
									onCheckedChange={() => applyTagFilter(tag.name)}
									class="cursor-pointer"
								/>
								<Label for={`tag-${tag.name}`} class="flex-1 cursor-pointer text-sm">
									{tag.name}
								</Label>
							</div>
						{/each}
					</div>
				</div>
			</aside>

			<!-- Products Grid -->
			<div class="lg:col-span-3">
				{#if data.productList.length === 0}
					<div class="flex flex-col items-center justify-center py-24 text-center">
						<SearchIcon class="mb-4 size-12 text-muted-foreground/40" />
						<h3 class="text-lg font-semibold">No products found</h3>
						<p class="mt-1 text-sm text-muted-foreground">
							Try adjusting your filters or search term.
						</p>
						<Button variant="outline" class="mt-4" onclick={resetFilters}>Clear Filters</Button>
					</div>
				{:else}
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{#each data.productList as product (product.productId)}
							<ProductCard {...product} />
						{/each}
					</div>

					<!-- Pagination -->
					{#if data.pagination.totalPages > 1}
						<div class="mt-10 flex items-center justify-center gap-2">
							<Button
								variant="outline"
								size="sm"
								disabled={!data.pagination.hasPrevPage}
								onclick={() => goToPage(data.pagination.currentPage - 1)}
							>
								<ChevronLeft size={16} />
							</Button>

							{#each Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1) as p (p)}
								<Button
									variant={p === data.pagination.currentPage ? 'default' : 'outline'}
									size="sm"
									onclick={() => goToPage(p)}
								>
									{p}
								</Button>
							{/each}

							<Button
								variant="outline"
								size="sm"
								disabled={!data.pagination.hasNextPage}
								onclick={() => goToPage(data.pagination.currentPage + 1)}
							>
								<ChevronRight size={16} />
							</Button>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</main>
</div>
