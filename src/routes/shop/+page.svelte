<script lang="ts">
	import ProductCard from '$lib/components/product-card.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';
	import {
		SearchIcon,
		XIcon,
		ChevronLeft,
		ChevronRight,
		FilterIcon,
		SlidersHorizontalIcon
	} from '@lucide/svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { goto } from '$app/navigation';
	import { page as sveltePage } from '$app/state';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	// Search & Bounds State Management
	let searchQuery = $state(sveltePage.url.searchParams.get('search') ?? '');
	let minPrice = $derived(Number(data?.priceRange?.minPrice) || 0);
	let maxPrice = $derived(Number(data?.priceRange?.maxPrice) || 50000);

	let sliderPrices = $state([
		Number(sveltePage.url.searchParams.get('min')) || minPrice,
		Number(sveltePage.url.searchParams.get('max')) || maxPrice
	]);

	// Filter Matrices Arrays
	let selectedCategories = $state(
		sveltePage.url.searchParams.get('categories')?.split(',').filter(Boolean) ?? []
	);
	let selectedTags = $state(
		sveltePage.url.searchParams.get('tags')?.split(',').filter(Boolean) ?? []
	);
	let selectedBrands = $state(
		sveltePage.url.searchParams.get('brands')?.split(',').filter(Boolean) ?? []
	);

	const hasActiveFilters = $derived(
		sveltePage.url.searchParams.toString() !== '' &&
			sveltePage.url.searchParams.toString() !== 'page=1'
	);

	// Reactive Lists from Data Hooks
	const categories = $derived(data?.categories ?? []);
	const brands = $derived(data?.brandList?.map((b) => b.name) ?? []);
	const tags = $derived(data?.tagList ?? []);

	// Active Toggle State Evaluators
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

	let debounceTimer: ReturnType<typeof setTimeout>;
	function handleSliderChange() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			applyPriceFilter();
		}, 400);
	}

	function applyPriceFilter() {
		toast.success('Price bounds applied');
		const newUrl = new URL(sveltePage.url);
		newUrl.searchParams.set('min', sliderPrices[0].toString());
		newUrl.searchParams.set('max', sliderPrices[1].toString());
		newUrl.searchParams.set('page', '1');
		goto(newUrl, { keepFocus: true, noScroll: true });
	}

	function applyCategoryFilter(category: string) {
		selectedCategories = selectedCategories.includes(category)
			? selectedCategories.filter((c) => c !== category)
			: [...selectedCategories, category];

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
		selectedBrands = selectedBrands.includes(brand)
			? selectedBrands.filter((b) => b !== brand)
			: [...selectedBrands, brand];

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
		selectedTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];

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
		sliderPrices = [minPrice, maxPrice];
		selectedCategories = [];
		selectedBrands = [];
		selectedTags = [];
		goto(sveltePage.url.pathname);
	}

	const goToPage = (p: number) => updateFilters({ page: p });
</script>

<svelte:head>
	<title>Products Marketplace | Tmax Electronics</title>
	<meta
		name="description"
		content="Explore Tmax Electronics premium catalog. Discover smartphones, dynamic power banks, and authentic tech components with official warranties."
	/>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-b from-background via-background/98 to-muted/20 pb-16 text-foreground antialiased transition-colors duration-300"
>
	<!-- Top Sticky Dynamic Filter Hub Bar -->
	<header
		class="sticky top-0 z-40 border-b border-border/80 bg-background/75 shadow-xs backdrop-blur-md"
	>
		<div class="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
			<div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1
						class="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl"
					>
						Hardware Catalog
					</h1>
					<p class="mt-1 text-xs text-muted-foreground sm:text-sm">
						Found {Number(data?.productCount?.count || 0)} premium products across {brands.length} authorized
						suppliers.
					</p>
				</div>

				{#if hasActiveFilters}
					<Button
						variant="ghost"
						size="sm"
						onclick={resetFilters}
						class="h-8 self-start rounded-lg border border-destructive/20 text-xs text-destructive transition-all hover:bg-destructive/10 sm:self-center"
					>
						<XIcon size={12} class="mr-1.5" /> Clear active specs
					</Button>
				{/if}
			</div>

			<!-- Core Search Execution Field -->
			<div class="relative">
				<SearchIcon
					class="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/80"
				/>
				<Input
					type="text"
					placeholder="Query model indexes, device names, specifications..."
					bind:value={searchQuery}
					oninput={handleSearch}
					class="h-10 rounded-xl border-border bg-card/50 pl-10 shadow-inner focus-visible:border-primary focus-visible:ring-primary/20"
				/>
			</div>
		</div>
	</header>

	<!-- Primary Content Split Matrix -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
			<!-- SECTION 1: Advanced Filtering Control Sidebar -->
			<aside class="lg:col-span-1">
				<div
					class="sticky top-32 space-y-5 rounded-2xl border border-border/80 bg-card/40 p-5 shadow-sm backdrop-blur-md"
				>
					<div class="flex items-center gap-2 border-b border-border/60 pb-3">
						<SlidersHorizontalIcon class="size-4 text-primary" />
						<h3 class="text-sm font-bold tracking-wider text-foreground uppercase">
							Filter Engine
						</h3>
					</div>

					<!-- Price Sliders Control Block -->
					<div class="space-y-4 border-b border-border/60 pb-5">
						<div class="flex items-center justify-between text-xs">
							<span class="font-medium text-muted-foreground">Price Bracket</span>
							<span
								class="rounded border bg-muted px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary"
							>
								{sliderPrices[0]} - {sliderPrices[1]} ETB
							</span>
						</div>
						<Slider
							type="multiple"
							bind:value={sliderPrices}
							step={50}
							min={minPrice}
							max={maxPrice}
							onValueChange={handleSliderChange}
							class="py-2"
						/>
						<div class="flex justify-between font-mono text-[10px] text-muted-foreground/80">
							<span>{minPrice} ETB</span>
							<span>{maxPrice} ETB</span>
						</div>
					</div>

					<!-- Brands Selection Module -->
					<div
						class="max-h-[220px] scrollbar-none space-y-2.5 overflow-y-auto border-b border-border/60 pb-5"
					>
						<h4 class="text-xs font-bold tracking-wider text-muted-foreground uppercase">Brands</h4>
						<div class="flex items-center gap-2.5 py-0.5">
							<Checkbox
								id="brand-all"
								checked={isAllBrandsSelected}
								onCheckedChange={clearBrands}
								class="rounded-md"
							/>
							<Label for="brand-all" class="flex-1 cursor-pointer text-sm font-medium"
								>All Brands</Label
							>
						</div>
						{#each brands as brand (brand)}
							<div class="flex items-center gap-2.5 py-0.5">
								<Checkbox
									id={`brand-${brand}`}
									checked={selectedBrands?.includes(brand)}
									onCheckedChange={() => applyBrandFilter(brand)}
									class="rounded-md"
								/>
								<Label
									for={`brand-${brand}`}
									class="flex-1 cursor-pointer text-sm font-medium text-foreground/80 group-hover:text-foreground"
								>
									{brand}
								</Label>
							</div>
						{/each}
					</div>

					<!-- Categories Selection Module -->
					<div
						class="max-h-[220px] scrollbar-none space-y-2.5 overflow-y-auto border-b border-border/60 pb-5"
					>
						<h4 class="text-xs font-bold tracking-wider text-muted-foreground uppercase">
							Categories
						</h4>
						<div class="flex items-center gap-2.5 py-0.5">
							<Checkbox
								id="category-all"
								checked={isAllSelected}
								onCheckedChange={clearCategories}
								class="rounded-md"
							/>
							<Label for="category-all" class="flex-1 cursor-pointer text-sm font-medium"
								>All Categories</Label
							>
						</div>
						{#each categories as category (category.name)}
							<div class="flex items-center gap-2.5 py-0.5">
								<Checkbox
									id={`category-${category.name}`}
									checked={selectedCategories.includes(category.name)}
									onCheckedChange={() => applyCategoryFilter(category.name)}
									class="rounded-md"
								/>
								<Label
									for={`category-${category.name}`}
									class="flex-1 cursor-pointer text-sm font-medium text-foreground/80"
								>
									{category.name}
								</Label>
							</div>
						{/each}
					</div>

					<!-- System Tags Module -->
					<div class="max-h-[200px] scrollbar-none space-y-2.5 overflow-y-auto">
						<h4 class="text-xs font-bold tracking-wider text-muted-foreground uppercase">
							Hardware Labels
						</h4>
						<div class="flex items-center gap-2.5 py-0.5">
							<Checkbox
								id="tag-all"
								checked={isAllTagsSelected}
								onCheckedChange={clearTags}
								class="rounded-md"
							/>
							<Label for="tag-all" class="flex-1 cursor-pointer text-sm font-medium">All Tags</Label
							>
						</div>
						{#each tags as tag (tag.name)}
							<div class="flex items-center gap-2.5 py-0.5">
								<Checkbox
									id={`tag-${tag.name}`}
									checked={selectedTags.includes(tag.name)}
									onCheckedChange={() => applyTagFilter(tag.name)}
									class="rounded-md"
								/>
								<Label
									for={`tag-${tag.name}`}
									class="flex-1 cursor-pointer text-sm font-medium text-foreground/80"
								>
									#{tag.name}
								</Label>
							</div>
						{/each}
					</div>
				</div>
			</aside>

			<!-- SECTION 2: Dynamic Products Grid Canvas -->
			<div class="space-y-8 lg:col-span-3">
				{#if data.productList.length === 0}
					<div
						class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/20 py-28 text-center backdrop-blur-xs"
					>
						<FilterIcon class="mb-4 size-10 stroke-[1.5] text-muted-foreground/30" />
						<h3 class="text-base font-bold tracking-tight">No specifications found</h3>
						<p class="mt-1 max-w-xs text-sm text-muted-foreground">
							No items match these filters. Modify parameters or reset values to try again.
						</p>
						<Button
							variant="outline"
							class="mt-5 h-9 rounded-xl px-4 text-xs"
							onclick={resetFilters}
						>
							Reset Canvas Engine
						</Button>
					</div>
				{:else}
					<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
						{#each data.productList as product (product.productId)}
							<div class="transition-all duration-300 hover:-translate-y-1">
								<ProductCard {...product} />
							</div>
						{/each}
					</div>

					<!-- High-End Monospace Pagination Block -->
					{#if data.pagination.totalPages > 1}
						<div
							class="mt-12 flex items-center justify-center gap-1.5 border-t border-border/40 pt-6"
						>
							<Button
								variant="outline"
								size="icon"
								class="size-8 rounded-lg border-border"
								disabled={!data.pagination.hasPrevPage}
								onclick={() => goToPage(data.pagination.currentPage - 1)}
								aria-label="Previous page"
							>
								<ChevronLeft size={14} />
							</Button>

							{#each Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1) as p (p)}
								{@const isCurrent = p === data.pagination.currentPage}
								<Button
									variant={isCurrent ? 'default' : 'outline'}
									class="size-8 rounded-lg font-mono text-xs font-bold transition-all duration-200
									{isCurrent
										? 'shadow-sm ring-2 ring-primary/10'
										: 'border-border text-muted-foreground hover:text-foreground'}"
									onclick={() => goToPage(p)}
								>
									{p}
								</Button>
							{/each}

							<Button
								variant="outline"
								size="icon"
								class="size-8 rounded-lg border-border"
								disabled={!data.pagination.hasNextPage}
								onclick={() => goToPage(data.pagination.currentPage + 1)}
								aria-label="Next page"
							>
								<ChevronRight size={14} />
							</Button>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</main>
</div>
