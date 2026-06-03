<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import {
		CheckIcon,
		ShieldCheckIcon,
		TruckIcon,
		CoinsIcon,
		LaptopIcon,
		SmartphoneIcon,
		CpuIcon
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	const highlights = [
		{
			icon: ShieldCheckIcon,
			label: '12-Month Warranty',
			description: 'Every device fully covered by TMAX'
		},
		{
			icon: TruckIcon,
			label: 'Same-Day Delivery',
			description: 'Fast, reliable delivery within Addis Ababa'
		},
		{ icon: CoinsIcon, label: 'Priced in Birr', description: 'Local pricing with no hidden costs' },
		{
			icon: LaptopIcon,
			label: 'Directly Sourced',
			description: 'Authentic tech straight from manufacturers'
		}
	];

	const products = [
		{ name: 'Phones', icon: SmartphoneIcon },
		{ name: 'Laptops', icon: LaptopIcon },
		{ name: 'Audio', icon: CpuIcon },
		{ name: 'Smart Home', icon: ShieldCheckIcon }
	];
</script>

<section
	class="relative overflow-hidden bg-background px-4 py-24 text-foreground transition-colors duration-300 sm:px-6 lg:px-8"
>
	<!-- Ambient Background Glows - works beautifully in both dark/light modes -->
	<div
		class="absolute top-0 left-1/4 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/10 opacity-70 blur-3xl duration-4000 dark:bg-primary/5"
	></div>
	<div
		class="absolute right-1/4 bottom-0 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/5 opacity-70 blur-3xl duration-6000 dark:bg-primary/10"
	></div>

	<div class="mx-auto max-w-6xl">
		<!-- Section Header -->
		<div transition:fly={{ y: 30, duration: 800 }} class="mb-20 flex flex-col gap-4 text-center">
			<span
				class="mx-auto max-w-fit rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur-md"
			>
				TMAX Ecosystem
			</span>
			<h2
				class="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl"
			>
				About TMAX
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				Your premium destination for authentic tech in Addis Ababa. Sourced directly, priced
				transparently in Birr, delivered today.
			</p>
		</div>

		<!-- Main Content Grid -->
		<div class="mb-16 grid gap-8 lg:grid-cols-3">
			<!-- NEW SECTION: Dynamic Pure CSS Technical Grid (Replaces old Image Card) -->
			<div transition:fly={{ y: 30, duration: 800, delay: 150 }} class="lg:col-span-2">
				<Card
					class="group relative h-full overflow-hidden border-primary/10 bg-gradient-to-br from-card/60 via-card/40 to-primary/5 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-primary/30"
				>
					<!-- Abstract structural design lines for a high-tech vibe -->
					<div
						class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(var(--primary),0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary),0.03)_1px,transparent_1px)] bg-[size:24px_24px]"
					></div>

					<div class="grid h-full items-center gap-6 p-8 md:grid-cols-5">
						<!-- Content Area -->
						<div class="flex flex-col justify-center gap-4 md:col-span-3">
							<div class="flex items-center gap-2 text-primary">
								<CpuIcon class="size-5 animate-spin duration-8000" />
								<span class="text-xs font-bold tracking-widest uppercase">Core Promise</span>
							</div>
							<h3 class="text-3xl font-bold tracking-tight text-foreground">The TMAX Standard</h3>
							<p class="text-sm leading-relaxed font-light text-muted-foreground">
								At TMAX, we bridge the gap between global technology innovation and local
								convenience. By sourcing our ecosystem directly from trusted manufacturing
								pipelines, we eliminate middleman markups to give you premium products at fair
								market rates.
							</p>
							<p class="text-sm leading-relaxed font-light text-muted-foreground">
								We believe buying high-end tech should be stress-free. Every smartphone, workspace
								laptop, and automated appliance is cataloged natively in Birr, hand-delivered
								same-day across Addis, and secured by our ironclad warranty infrastructure.
							</p>
						</div>

						<!-- Tech Micro-Dashboard Widget UI Element -->
						<div
							class="hidden flex-col gap-3 rounded-xl border border-primary/10 bg-background/60 p-4 shadow-inner backdrop-blur-sm transition-all duration-500 group-hover:border-primary/20 md:col-span-2 md:flex"
						>
							<div class="flex items-center justify-between border-b border-primary/5 pb-2">
								<span class="font-mono text-xs text-muted-foreground">DEVICE_SECURE_OS</span>
								<div class="h-2 w-2 animate-ping rounded-full bg-emerald-500"></div>
							</div>

							<div class="space-y-2 py-2">
								<div class="flex items-center justify-between text-xs">
									<span class="text-muted-foreground">TMAX Warranty</span>
									<span class="font-mono font-bold text-primary">Active (12 Months)</span>
								</div>
								<div class="h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
									<div
										class="h-full w-full origin-left rounded-full bg-primary transition-transform duration-1000 group-hover:scale-x-95"
									></div>
								</div>
							</div>

							<div class="rounded-lg border border-primary/10 bg-primary/5 p-2.5">
								<div class="flex items-center gap-2">
									<ShieldCheckIcon class="size-4 text-primary" />
									<span class="text-xs font-semibold">100% Authenticity Verified</span>
								</div>
							</div>

							<div class="font-mono text-[10px] leading-tight text-muted-foreground/60">
								Loc: Addis Ababa, ET<br />
								Currency: ETB (Birr)
							</div>
						</div>
					</div>
				</Card>
			</div>

			<!-- Sleek Tech Highlight Feature Cards -->
			<div class="flex flex-col gap-4">
				{#each highlights as highlight, i (highlight.label)}
					<div transition:fly={{ y: 20, duration: 600, delay: 200 + i * 100 }}>
						<Card
							class="group border-primary/10 bg-card/40 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/60 hover:shadow-md"
						>
							<CardContent class="flex gap-4 pt-6">
								<div class="shrink-0">
									<div
										class="flex size-12 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
									>
										<svelte:component
											this={highlight.icon}
											class="size-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
										/>
									</div>
								</div>
								<div class="min-w-0 flex-1">
									<p class="text-sm font-semibold tracking-wide text-foreground">
										{highlight.label}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-muted-foreground">
										{highlight.description}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
		</div>

		<!-- Products Matrix Section -->
		<div transition:fly={{ y: 30, duration: 800, delay: 600 }}>
			<Card class="border-primary/10 bg-card/20 shadow-xl backdrop-blur-lg">
				<CardHeader
					class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
				>
					<div>
						<CardTitle class="text-xl font-bold tracking-tight"
							>Product Deployment Portfolio</CardTitle
						>
						<CardDescription
							>Explore tailored hardware setups optimized for performance</CardDescription
						>
					</div>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
						{#each products as product (product.name)}
							<div
								class="group relative flex flex-col gap-3 rounded-xl border border-primary/5 bg-primary/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/10 hover:shadow-lg"
							>
								<div
									class="w-fit rounded-lg bg-primary/10 p-2 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
								>
									<svelte:component this={product.icon} class="size-5" />
								</div>
								<div>
									<h4 class="text-sm font-bold tracking-wide text-foreground">{product.name}</h4>
									<p
										class="mt-1 flex items-center gap-1 font-mono text-[11px] text-muted-foreground"
									>
										<CheckIcon class="size-3 text-primary" /> Same-Day Available
									</p>
								</div>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
