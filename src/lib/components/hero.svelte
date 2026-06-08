<script lang="ts">
	import { MessageSquareCode, ArrowRight, Star } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let heroImage = ['hero.webp', 'hero (1).webp', 'hero (2).webp', 'hero (3).webp', 'hero (4).webp'];

	let currentImage = $state(0);

	onMount(() => {
		currentImage = heroImage.length - 1;

		setInterval(() => {
			currentImage = (currentImage + 1) % heroImage.length;
		}, 5000);
	});
</script>

<section
	class="hero flex min-h-screen w-full items-center justify-center bg-background p-4 font-sans text-foreground antialiased selection:bg-primary selection:text-primary-foreground md:p-8 lg:p-12"
>
	<div class="grid w-full max-w-7xl grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
		<div
			class="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-primary/10 bg-card bg-[radial-gradient(#00b4ed_1px,transparent_1px)] [background-size:24px_24px] [background-position:center] p-8 text-card-foreground shadow-sm md:p-12 lg:col-span-7 lg:p-16"
		>
			<div
				class="mb-8 inline-flex w-fit items-center gap-2 self-start rounded-full border border-primary/20 bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-transform hover:scale-[1.02] md:text-sm"
			>
				<span class="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
				New · Halo X9 Pro now in Addis
			</div>

			<div class="max-w-2xl space-y-6">
				<h1
					class="text-4xl leading-[1.1] font-extrabold tracking-tight text-balance md:text-5xl lg:text-6xl"
				>
					Real tech.<br />
					<span class="text-primary">Real warranty.</span><br />
					Ethiopia-ready.
				</h1>

				<p class="max-w-xl text-sm leading-relaxed font-medium text-muted-foreground md:text-base">
					Phones, laptops, audio and smart home — sourced directly, priced in birr, delivered the
					same day in Addis. Every device covered by our 12-month TMAX warranty.
				</p>
			</div>

			<div class="mt-8 flex flex-wrap items-center gap-4 md:mt-12">
				<Button href="/shop" variant="default">
					Shop the catalog
					<ArrowRight class="h-4 w-4" />
				</Button>

				<Button variant="outline">
					<MessageSquareCode class="h-4 w-4 opacity-70" />
					Ask the assistant
				</Button>
			</div>
		</div>
		<div
			class="relative h-full w-full overflow-hidden rounded-[2rem] bg-linear-to-br from-background via-primary to-secondary shadow-md lg:col-span-5"
		>
			{#key currentImage}
				<img
					src={heroImage[currentImage]}
					alt="hero"
					in:fly={{ x: -100, duration: 300 }}
					out:fly={{ x: 100, duration: 300 }}
					class="absolute inset-0 h-full w-full rounded-xl object-contain"
				/>
			{/key}
		</div>
	</div>
</section>

<style>
	.hero {
		background:
			radial-gradient(
				ellipse 120% 80% at 0% 0%,
				color-mix(in srgb, var(--primary) 35%, transparent),
				transparent 75%
			),
			linear-gradient(180deg, var(--secondary), var(--background));
	}
</style>
