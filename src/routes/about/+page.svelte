<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import {
		CheckIcon,
		ShieldCheckIcon,
		TruckIcon,
		CoinsIcon,
		CpuIcon,
		LayersIcon,
		ActivityIcon,
		GlobeIcon,
		ArrowRightIcon,
		SparklesIcon,
		QrCodeIcon,
		ZapIcon,
		BatteryChargingIcon,
		PlugZapIcon
	} from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import Faq from '$lib/components/faq.svelte';
	import Testimonial from '$lib/components/testimonial.svelte';
	import Slider from '$lib/components/slider.svelte';

	const meta = {
		title: 'Our Architecture | TMAX High-Density Power Systems Addis Ababa',
		description:
			'An inside look into the smart battery technology, sourcing pipelines, and safety engineering behind TMAX—bringing authentic, high-capacity power banks to Ethiopia.',
		url: 'https://tmax.et/about',
		image: 'https://tmax.et/og-about.jpg',
		keywords:
			'TMAX powerbanks, premium power bank Addis Ababa, backup battery Ethiopia, laptop power bank Birr, authentic electronics'
	};

	// --- SVELTE 5 RUNES ---
	let activeTab = $state('cells');

	// Derived state example mapping for the structural data matrix
	const pillars = $derived({
		cells: {
			title: 'Grade-A Lithium Polymer Cells',
			subtitle: 'Zero Overheating. True Capacity Foundations.',
			description:
				'The local market is saturated with degraded, recycled batteries that lose efficiency or swell up under load. TMAX utilizes premium, high-density Lithium Polymer and EV-grade cells engineered to retain 85%+ health after 1,000 charging cycles.',
			metrics: [
				'EV-Grade Silicon-Carbon Cells',
				'Accurate, Non-Inflated mAh Ratings',
				'Smart Thermal Dissipation'
			]
		},
		protection: {
			title: 'Multi-Layer Circuit Protection',
			subtitle: 'In-House Hardware Safety Infrastructure',
			description:
				'Fluctuating grid power in Addis Ababa can damage low-tier accessories. Our powerbanks integrate intelligent proprietary chips guarding against over-voltage, short-circuits, and smart power allocation for delicate electronics.',
			metrics: [
				'Dual-Stage Surge Isolation',
				'Intelligent Output Allocation',
				'12-Month Mechanical Warranty'
			]
		},
		currency: {
			title: 'Natively Calculated Economy',
			subtitle: 'No FX Premium. Structured entirely in Birr.',
			description:
				'We believe keeping your workspace or mobile node energized shouldn’t depend on parallel foreign exchange rates. Every single transaction, wholesale contract, and invoice is fixed stably in Ethiopian Birr.',
			metrics: [
				'Transparent Local Pricing',
				'Corporate Fleet Procurement',
				'Zero Hidden Import Adjustments'
			]
		}
	} as Record<string, { title: string; subtitle: string; description: string; metrics: string[] }>);

	const logisticsSteps = [
		{
			phase: '01',
			title: 'Cell-Level Safety Audits',
			details:
				'Batteries undergo rigorous multi-stage safety stress testing directly at manufacturing pipelines.'
		},
		{
			phase: '02',
			title: 'Addis Storage Ready',
			details:
				'Devices are imported and stocked securely in local climate-controlled hubs to optimize battery life.'
		},
		{
			phase: '03',
			title: 'Same-Day Last Mile Dispatch',
			details:
				'Dispatched through dedicated TMAX distribution loops immediately across Addis locations.'
		}
	];

	const matrixProducts = [
		{
			name: 'Ultra-High Capacity Power',
			desc: 'Laptop-grade 100W/140W PD backup nodes',
			icon: BatteryChargingIcon
		},
		{
			name: 'Compact Fast Charging',
			desc: 'Sleek, pocket-sized high-output daily arrays',
			icon: ZapIcon
		},
		{
			name: 'GaN Charging Ecosystems',
			desc: 'Multi-port high-efficiency wall stations',
			icon: PlugZapIcon
		},
		{
			name: 'Smart Electronic Nodes',
			desc: 'Intelligent peripheral devices & power accessories',
			icon: CpuIcon
		}
	];

	let { data } = $props();
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta name="keywords" content={meta.keywords} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="twitter:title" content={meta.title} />
	<meta property="twitter:description" content={meta.description} />
</svelte:head>

<div class="relative min-h-screen bg-background text-foreground transition-colors duration-300">
	<!-- Abstract Matrix Energy Background Effects -->
	<div
		class="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.06),transparent_50%)]"
	></div>
	<div
		class="absolute top-[30%] left-[-10%] -z-10 h-160 w-160 animate-pulse rounded-full bg-primary/5 blur-[120px] duration-8000"
	></div>
	<div
		class="absolute right-[-10%] bottom-[20%] -z-10 h-160 w-160 animate-pulse rounded-full bg-primary/5 blur-[120px] duration-6000"
	></div>

	<!-- ================= SECT 1: ASYMMETRICAL EDITORIAL HERO ================= -->
	<section class="relative mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
		<div class="grid gap-16 lg:grid-cols-12 lg:items-center">
			<!-- Left Column: Heavy Typographic Brand Profile -->
			<div transition:fly={{ x: -30, duration: 800 }} class="space-y-6 lg:col-span-5">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] tracking-widest text-primary uppercase backdrop-blur-md"
				>
					<ActivityIcon class="size-3 animate-pulse" /> Energy Grid Architecture v2.6
				</div>
				<h1 class="z-100 text-5xl leading-none font-black tracking-tight sm:text-7xl">
					Portable <br />
					<span
						class="bg-linear-to-r from-primary via-primary/80 to-foreground bg-clip-text text-transparent"
						>Power</span
					> <br />
				</h1>
				<p class="max-w-md text-base leading-relaxed font-light text-muted-foreground">
					TMAX redefines backup infrastructure in Ethiopia. We engineer and distribute verified,
					high-performance powerbanks and electronic peripherals designed to keep your workflow
					uninterrupted.
				</p>
				<div class="flex items-center gap-4 pt-4">
					<div class="h-px w-12 bg-primary/40"></div>
					<span class="font-mono text-xs tracking-widest text-muted-foreground uppercase"
						>Addis Ababa Energy Hub</span
					>
				</div>
			</div>

			<!-- Right Column: Micro-Dashboard Structural Grid -->
			<div transition:fly={{ x: 30, duration: 800, delay: 200 }} class="lg:col-span-7">
				<div
					class="relative rounded-2xl border border-primary/10 bg-gradient-to-br from-card via-card/50 to-primary/5 p-2 shadow-2xl backdrop-blur-xl"
				>
					<div
						class="pointer-events-none absolute top-4 right-4 font-mono text-8xl font-black text-primary/10 select-none"
					>
						MAX
					</div>

					<div class="space-y-8 rounded-xl border border-primary/5 bg-background/50 p-6 sm:p-8">
						<!-- Custom Mini Hub Header -->
						<div class="flex items-center justify-between border-b border-primary/5 pb-4">
							<div class="flex items-center gap-3">
								<div class="flex h-3 w-3 items-center justify-center rounded-full bg-primary/20">
									<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
								</div>
								<span class="font-mono text-xs tracking-wider text-muted-foreground"
									>POWERBANK_STATE_ANALYSIS</span
								>
							</div>
							<span
								class="rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-500"
								>ENERGY_STABLE</span
							>
						</div>

						<!-- Asymmetric Feature Quad -->
						<div class="grid gap-4 sm:grid-cols-2">
							<div
								class="group rounded-xl border border-primary/5 bg-primary/5 p-5 transition-all duration-300 hover:border-primary/20"
							>
								<ShieldCheckIcon class="mb-3 size-6 text-primary" />
								<h3 class="text-sm font-bold tracking-tight">Authentic Capacity Promise</h3>
								<p class="mt-1.5 text-xs leading-relaxed font-light text-muted-foreground">
									No fake metrics. The capacity stated on our electronics is exactly what matches
									the internal cells.
								</p>
							</div>

							<div
								class="group rounded-xl border border-primary/5 bg-primary/5 p-5 transition-all duration-300 hover:border-primary/20"
							>
								<TruckIcon class="mb-3 size-6 text-primary" />
								<h3 class="text-sm font-bold tracking-tight">Rapid Regional Dispatch</h3>
								<p class="mt-1.5 text-xs leading-relaxed font-light text-muted-foreground">
									Same-day delivery infrastructure routing portable power directly to your
									coordinates.
								</p>
							</div>

							<div
								class="group rounded-xl border border-primary/5 bg-primary/5 p-5 transition-all duration-300 hover:border-primary/20"
							>
								<CoinsIcon class="mb-3 size-6 text-primary" />
								<h3 class="text-sm font-bold tracking-tight">Birr Denominated Value</h3>
								<p class="mt-1.5 text-xs leading-relaxed font-light text-muted-foreground">
									Insulated completely from localized macro foreign currency fluctuations or
									gray-market markups.
								</p>
							</div>

							<div
								class="group rounded-xl border border-primary/5 bg-primary/5 p-5 transition-all duration-300 hover:border-primary/20"
							>
								<QrCodeIcon class="mb-3 size-6 text-primary" />
								<h3 class="text-sm font-bold tracking-tight">Anti-Counterfeit Protection</h3>
								<p class="mt-1.5 text-xs leading-relaxed font-light text-muted-foreground">
									Every batch item tracked via unique digital cryptographic parameters to prove TMAX
									authenticity.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ================= SECT 2: INTERACTIVE DEEP DIVE TABS ================= -->
	<section
		class="border-t border-primary/5 bg-gradient-to-b from-transparent via-card/20 to-transparent px-4 py-24 sm:px-6 lg:px-8"
	>
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 gap-6 text-center lg:flex lg:items-end lg:justify-between lg:text-left">
				<div class="max-w-xl">
					<span class="font-mono text-xs font-semibold tracking-widest text-primary uppercase"
						>Core Engineering</span
					>
					<h2 class="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
						How TMAX Batteries are Engineered
					</h2>
				</div>
				<p class="mt-4 max-w-sm text-sm font-light text-muted-foreground lg:mt-0">
					Click through our design modules to understand how we maintain elite power storage and
					safety controls.
				</p>
			</div>

			<!-- Custom Glass Tab Selectors -->
			<div
				class="mb-8 grid grid-cols-3 gap-2 rounded-xl border border-primary/10 bg-card/40 p-1.5 backdrop-blur-md"
			>
				<button
					on:click={() => (activeTab = 'cells')}
					class="relative rounded-lg py-3 font-mono text-xs tracking-wider uppercase transition-all duration-300 {activeTab ===
					'cells'
						? 'bg-primary font-bold text-primary-foreground shadow-md'
						: 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'}"
				>
					01. Battery Cells
				</button>
				<button
					on:click={() => (activeTab = 'protection')}
					class="relative rounded-lg py-3 font-mono text-xs tracking-wider uppercase transition-all duration-300 {activeTab ===
					'protection'
						? 'bg-primary font-bold text-primary-foreground shadow-md'
						: 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'}"
				>
					02. Safety Chips
				</button>
				<button
					on:click={() => (activeTab = 'currency')}
					class="relative rounded-lg py-3 font-mono text-xs tracking-wider uppercase transition-all duration-300 {activeTab ===
					'currency'
						? 'bg-primary font-bold text-primary-foreground shadow-md'
						: 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'}"
				>
					03. Birr Logic
				</button>
			</div>

			<!-- Dynamic Content Pane -->
			<div class="min-h-[280px]">
				{#key activeTab}
					<div
						in:fade={{ duration: 300 }}
						class="grid items-center gap-8 rounded-2xl border border-primary/10 bg-card/20 p-8 shadow-xl backdrop-blur-lg lg:grid-cols-12"
					>
						<div class="space-y-4 lg:col-span-7">
							<span class="font-mono text-xs font-bold tracking-widest text-primary uppercase"
								>{pillars[activeTab].subtitle}</span
							>
							<h3 class="text-2xl font-bold tracking-tight">{pillars[activeTab].title}</h3>
							<p class="text-sm leading-relaxed font-light text-muted-foreground">
								{pillars[activeTab].description}
							</p>
						</div>
						<div class="space-y-3 lg:col-span-5 lg:border-l lg:border-primary/10 lg:pl-8">
							<p class="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
								Architecture Thresholds:
							</p>
							{#each pillars[activeTab].metrics as metric}
								<div class="flex items-center gap-3 text-xs">
									<div class="rounded-full bg-primary/10 p-1 text-primary">
										<CheckIcon class="size-3" />
									</div>
									<span class="font-medium text-foreground">{metric}</span>
								</div>
							{/each}
						</div>
					</div>
				{/key}
			</div>
		</div>
	</section>

	<!-- ================= SECT 3: REGIONAL LOGISTICS BLUEPRINT ================= -->
	<section class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-3">
			<div class="space-y-4 lg:pr-6">
				<div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
					<GlobeIcon class="size-5" />
				</div>
				<h2 class="text-2xl font-bold tracking-tight">The Supply & Transit Blueprint</h2>
				<p class="text-xs leading-relaxed font-light text-muted-foreground">
					A direct visualization of how your backup battery systems move from specialized
					manufacturing quality checks directly into your devices.
				</p>
			</div>

			<div class="relative grid gap-6 sm:grid-cols-3 lg:col-span-2">
				<!-- Continuous Structural Connection Line (Desktop) -->
				<div
					class="absolute top-1/2 right-0 left-0 -z-10 hidden h-[1px] bg-gradient-to-r from-primary/20 via-primary/10 to-transparent sm:block"
				></div>

				{#each logisticsSteps as step, i}
					<div
						transition:fly={{ y: 20, duration: 600, delay: i * 150 }}
						class="group flex flex-col gap-4 rounded-xl border border-primary/5 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20"
					>
						<span
							class="font-mono text-2xl font-black text-primary/30 transition-colors duration-300 group-hover:text-primary"
							>{step.phase}</span
						>
						<h4 class="text-sm font-bold tracking-tight">{step.title}</h4>
						<p class="text-xs leading-relaxed font-light text-muted-foreground">{step.details}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ================= SECT 4: DEPLOYMENT PORTFOLIO MATRIX ================= -->
	<section class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
		<Card
			class="overflow-hidden border-primary/10 bg-gradient-to-b from-card/40 to-card/10 shadow-2xl backdrop-blur-xl"
		>
			<CardHeader class="border-b border-primary/5 p-6 sm:p-8">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<CardTitle class="text-xl font-bold tracking-tight"
							>Hardware Deployment Portfolio Matrix</CardTitle
						>
						<CardDescription class="text-xs font-light"
							>Explore localized charging hardware configurations optimized for continuous system
							uptime.</CardDescription
						>
					</div>
					<span class="max-w-fit rounded-md bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
						>In-Stock In Addis Ababa</span
					>
				</div>
			</CardHeader>
			<CardContent class="p-6 sm:p-8">
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{#each matrixProducts as prod}
						<div
							class="group relative flex flex-col justify-between gap-6 rounded-xl border border-primary/5 bg-background/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/40"
						>
							<div class="space-y-4">
								<div
									class="w-fit rounded-lg border border-primary/10 bg-primary/5 p-2.5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
								>
									<svelte:component this={prod.icon} class="size-4" />
								</div>
								<div>
									<h4 class="text-sm font-bold tracking-wide">{prod.name}</h4>
									<p class="mt-1 text-xs leading-snug font-light text-muted-foreground">
										{prod.desc}
									</p>
								</div>
							</div>
							<div
								class="flex items-center justify-between border-t border-primary/5 pt-3 font-mono text-[10px] text-muted-foreground/80"
							>
								<span class="flex items-center gap-1"
									><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Sealed Brand New</span
								>
								<span>ETB Units</span>
							</div>
						</div>
					{/each}
				</div>
			</CardContent>
		</Card>
	</section>

	<!-- ================= SECT 5: DISPATCH CTA INTERFACE ================= -->
	<section class="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-tr from-card via-card/90 to-primary/5 p-8 shadow-2xl backdrop-blur-2xl sm:p-12"
		>
			<!-- Visual Grid Accents inside CTA -->
			<div
				class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(var(--primary),0.02)_1px,transparent_1px)] bg-[size:40px_40px]"
			></div>

			<div class="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-6">
				<div
					class="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] tracking-widest text-primary uppercase"
				>
					<SparklesIcon class="size-3" /> System Deployment Ready
				</div>
				<h2 class="text-3xl font-black tracking-tight sm:text-4xl">
					Secure Your Mobile Power Vault
				</h2>
				<p class="text-sm leading-relaxed font-light text-muted-foreground">
					Never let grid variations interrupt your digital production. Secure grade-A powerbanks and
					fast-charging hardware infrastructure natively in Birr today.
				</p>

				<Separator class="my-2 bg-primary/10" />

				<div class="flex w-full flex-col justify-center gap-4 sm:flex-row">
					<Button
						size="lg"
						class="group gap-2 font-mono text-xs tracking-wider uppercase shadow-xl shadow-primary/10"
					>
						Order Now for Delivery
						<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-1" />
					</Button>
					<Button
						size="lg"
						variant="outline"
						class="border-primary/10 bg-background/30 font-mono text-xs tracking-wider uppercase hover:bg-background/80"
					>
						Read Testing Specs
					</Button>
				</div>
			</div>
		</div>
	</section>
</div>

{#if data?.imagesList?.length > 0}
	<Slider imagesList={data?.imagesList} />
{/if}

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
<Faq />

<style>
	/* Custom slow-pulse keyframe variables */
	:global(.duration-6000) {
		animation-duration: 6000ms;
	}
	:global(.duration-8000) {
		animation-duration: 8000ms;
	}
</style>
