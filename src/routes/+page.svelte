<script lang="ts">
	import { useCart } from '$lib/hooks/cart.svelte.js';

	import ProductCard from '$lib/components/product-card.svelte';

	// Set app and cart hooks
	useCart();
	let { data } = $props();

	import * as Carousel from '$lib/components/ui/carousel/index.js';

	import Hero from '$lib/components/hero.svelte';
	import About from '$lib/components/about.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowBigRight } from '@lucide/svelte';
	import Faq from '$lib/components/faq.svelte';
	import Slider from '$lib/components/slider.svelte';
	import Testimonial from '$lib/components/testimonial.svelte';
	import ImgSeparator from '$lib/components/imgSeparator.svelte';
</script>

<svelte:head>
	<title>Home - TMAX</title>
</svelte:head>

<Hero bestSelling={data?.bestSelling[0]?.productName ?? ''} id={data?.bestSelling[0]?.productId} />
<ImgSeparator />
<About />
<ImgSeparator />
<section
	class="relative mx-auto flex max-w-7xl flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
>
	<!-- Top decorative ambient glow tailored to focus eyes on the product lineup -->
	<div
		class="absolute top-0 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 opacity-60 blur-3xl"
	></div>

	<!-- Carousel Header: Centered layout with modern styling -->
	<div class="mb-12 flex flex-col items-center gap-3 text-center">
		<span
			class="rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-[11px] font-bold tracking-widest text-primary uppercase backdrop-blur-sm"
		>
			Addis Ababa Hotlist
		</span>
		<h2
			class="bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl"
		>
			Best Selling Devices
		</h2>
		<p class="max-w-xl text-sm text-muted-foreground">
			The most requested hardware setups in our inventory, fully covered by our 12-month TMAX
			warranty.
		</p>
	</div>

	<!-- Carousel Wrapper Area: Centered layout -->
	<div class="relative w-full px-2 sm:px-8">
		<Carousel.Root
			opts={{
				align: 'start',
				loop: true
			}}
			class="mx-auto w-full max-w-6xl"
		>
			<Carousel.Content class="-ml-4 pb-6">
				{#each data?.bestSelling as product (product.productId)}
					<Carousel.Item class="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/3">
						<!-- Custom Card Wrapper: Elevated drop shadow, smooth hover elevations, and border glowing triggers -->
						<div
							class="group h-full rounded-2xl border border-primary/5 bg-card/40 p-1 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:bg-card/70 hover:shadow-[0_12px_30px_rgba(var(--primary),0.08)]"
						>
							<ProductCard {...product} />
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>

			<!-- Premium Navigation Buttons: Fully visible, styled, and centered beautifully around the deck boundaries -->
			<div class="hidden sm:block">
				<Carousel.Previous
					class="absolute top-1/2 -left-4 h-11 w-11 -translate-y-1/2 border-primary/10 bg-background/80 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
				/>
				<Carousel.Next
					class="absolute top-1/2 -right-4 h-11 w-11 -translate-y-1/2 border-primary/10 bg-background/80 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
				/>
			</div>
		</Carousel.Root>
	</div>
	<Button href="/shop" size="lg" class="justify-self-center!">
		View More Products <ArrowBigRight />
	</Button>
</section>
<ImgSeparator />
{#if data?.imagesList?.length > 0}
	<Slider imagesList={data?.imagesList} />
{/if}
<ImgSeparator />
{#if data?.testimonialList.length > 0}
	<main class="flex flex-col items-center justify-center px-4 py-12 md:py-20">
		<!-- Section Header -->
		<div class="mb-12 max-w-2xl text-center">
			<h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">What Our Customers Say</h2>
			<p class="text-lg text-muted-foreground">
				Don't just take our word for it. Here's what people are saying about their experience.
			</p>
		</div>

		<!-- Testimonial Carousel -->
		<Testimonial testimonials={data.testimonialList} />
	</main>
{/if}
<ImgSeparator />
<Faq />
