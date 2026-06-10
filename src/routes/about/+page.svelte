<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import {
		ShieldCheckIcon,
		TruckIcon,
		CoinsIcon,
		ActivityIcon,
		ArrowRightIcon,
		SparklesIcon,
		ZapIcon,
		BatteryChargingIcon,
		CheckIcon,
		CpuIcon,
		ScanQrCodeIcon,
		PackageCheckIcon,
		MapPinIcon,
		BadgeCheckIcon,
		CableIcon,
		SmartphoneIcon,
		GaugeIcon,
		BoxIcon,
		HeadphonesIcon,
		LayersIcon
	} from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';

	import Faq from '$lib/components/faq.svelte';
	import Testimonial from '$lib/components/testimonial.svelte';
	import Slider from '$lib/components/slider.svelte';
	import ImgSeparator from '$lib/components/imgSeparator.svelte';

	const meta = {
		title: 'About TMAX | High-Capacity Power Banks in Addis Ababa',
		description:
			'TMAX delivers authentic, high-capacity power banks with fast charging, smart protection, Birr pricing, and same-day delivery in Addis Ababa.',
		url: 'https://tmax.et/about',
		image: 'https://tmax.et/og-about.jpg',
		keywords: 'TMAX power bank, Addis Ababa power bank, fast charging Ethiopia, backup battery Birr'
	};

	type TabKey = 'power' | 'safety' | 'trust';
	let activeTab = $state<TabKey>('power');

	const tabs = {
		power: {
			label: 'Power',
			title: 'High-Capacity Backup Power',
			text: 'TMAX power banks are built for dependable daily backup, from compact carry models to larger reserve power units.',
			points: [
				'Up to 80000mAh options',
				'22.5W fast charging',
				'USB, Type-C, and cable-ready models'
			]
		},
		safety: {
			label: 'Safety',
			title: 'Smart Chip Protection',
			text: 'Integrated protection systems help support stable charging and protect connected devices from unstable output.',
			points: ['Short-circuit protection', 'Power-current control', 'Safer multi-device charging']
		},
		trust: {
			label: 'Trust',
			title: 'Authentic TMAX Packaging',
			text: 'Each unit is presented in branded packaging with model details, QR codes, and quality-focused product information.',
			points: ['Clear model labeling', 'Verified brand identity', 'Warranty-backed experience']
		}
	} as const;

	const benefits = [
		{
			icon: ShieldCheckIcon,
			title: '12-Month Warranty',
			text: 'Confidence after purchase with warranty-backed support.'
		},
		{
			icon: TruckIcon,
			title: 'Same-Day Delivery',
			text: 'Fast local delivery across Addis Ababa.'
		},
		{
			icon: CoinsIcon,
			title: 'Priced in Birr',
			text: 'Transparent local pricing without hidden costs.'
		},
		{
			icon: ScanQrCodeIcon,
			title: 'Brand Verification',
			text: 'Packaging includes QR and model details for better trust.'
		}
	];

	const stats = [
		{ value: '80K', label: 'mAh capacity options', detail: 'Reserve power for longer days' },
		{ value: '22.5W', label: 'fast charging', detail: 'Built for quick top-ups' },
		{ value: '12', label: 'month warranty', detail: 'Local after-sales support' },
		{ value: '1 Day', label: 'Addis delivery', detail: 'Same-day dispatch available' }
	];

	const productLayers = [
		{
			icon: BatteryChargingIcon,
			title: 'Capacity Core',
			text: 'Large battery reserves designed for phones, accessories, travel, work, and emergency backup.'
		},
		{
			icon: GaugeIcon,
			title: 'Fast Output System',
			text: '22.5W-ready models help reduce downtime when your phone needs a fast power boost.'
		},
		{
			icon: CpuIcon,
			title: 'Smart Control Chip',
			text: 'Internal protection logic supports safer current control and more stable charging behavior.'
		},
		{
			icon: CableIcon,
			title: 'Multi-Port Flexibility',
			text: 'USB, Type-C, and cable-ready choices make it easier to power different daily devices.'
		}
	];

	const journey = [
		{
			icon: SmartphoneIcon,
			title: 'Pick your capacity',
			text: 'Choose a compact daily model or a larger reserve unit based on how much backup you need.'
		},
		{
			icon: ScanQrCodeIcon,
			title: 'Check product details',
			text: 'Review model labels, QR information, cable options, charging speed, and warranty support.'
		},
		{
			icon: TruckIcon,
			title: 'Get local delivery',
			text: 'Order in Birr and receive same-day delivery service across Addis Ababa when available.'
		}
	];

	const trustSignals = [
		{
			icon: PackageCheckIcon,
			title: 'Branded packaging',
			text: 'Clear TMAX model presentation and retail-ready product information.'
		},
		{
			icon: BadgeCheckIcon,
			title: 'Warranty-backed',
			text: 'Support after purchase gives customers more confidence.'
		},
		{
			icon: MapPinIcon,
			title: 'Local availability',
			text: 'Built around Addis Ababa customers, delivery, and Birr pricing.'
		},
		{
			icon: HeadphonesIcon,
			title: 'Human support',
			text: 'Contact the team before or after purchase for guidance.'
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
	<meta property="og:image" content={meta.image} />
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-background text-foreground">
	<div
		class="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_35%)]"
	></div>
	<div
		class="absolute top-32 left-[-12%] -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-3xl"
	></div>
	<div
		class="absolute right-[-12%] bottom-20 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-3xl"
	></div>

	<section
		class="mx-auto grid max-w-7xl gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8"
	>
		<div transition:fly={{ x: -24, duration: 700 }} class="lg:col-span-5">
			<div
				class="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur-xl"
			>
				<ActivityIcon class="size-3 animate-pulse" />
				TMAX Power System
			</div>

			<h1 class="text-5xl leading-none font-black tracking-tight sm:text-7xl">
				Power that keeps you moving.
			</h1>

			<p class="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
				Authentic TMAX power banks with large capacity, 22.5W fast charging, smart chip protection,
				and same-day delivery in Addis Ababa.
			</p>

			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<Button size="lg" href="/shop" class="group gap-2">
					Order Now
					<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-1" />
				</Button>

				<Button
					size="lg"
					href="/contact-us"
					variant="outline"
					class="border-primary/20 bg-background/40 backdrop-blur-xl"
				>
					Contact Us
				</Button>
			</div>
		</div>

		<div transition:fly={{ x: 24, duration: 700, delay: 150 }} class="lg:col-span-7">
			<Card
				class="relative overflow-hidden border-primary/20 bg-card/40 shadow-2xl backdrop-blur-2xl"
			>
				<div
					class="grid-drift absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.06)_1px,transparent_1px)] bg-[size:28px_28px]"
				></div>
				<div class="float-slow absolute top-6 right-6 text-8xl font-black text-primary/10">
					TMAX
				</div>

				<CardContent class="relative p-6 sm:p-8">
					<div class="mb-6 flex items-center justify-between border-b border-primary/10 pb-4">
						<span class="font-mono text-xs text-muted-foreground">POWER_STATUS</span>
						<span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
							READY
						</span>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						{#each benefits as item, i}
							<div
								transition:fly={{ y: 16, duration: 500, delay: 200 + i * 80 }}
								class="group rounded-2xl border border-primary/10 bg-background/40 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/5"
							>
								<div
									class="mb-4 flex size-11 items-center justify-center rounded-xl border border-primary/10 bg-primary/10 text-primary transition group-hover:scale-110"
								>
									<svelte:component this={item.icon} class="size-5" />
								</div>
								<h3 class="text-sm font-bold">{item.title}</h3>
								<p class="mt-2 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>
		</div>
	</section>
	<ImgSeparator />
	<section
		class="border-y border-primary/10 bg-card/20 px-4 py-20 backdrop-blur-xl sm:px-6 lg:px-8"
	>
		<div class="mx-auto max-w-6xl">
			<div class="mb-10 text-center">
				<span class="text-xs font-bold tracking-widest text-primary uppercase">Why TMAX</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
					Fast. Safe. Built for daily power.
				</h2>
			</div>

			<div
				class="mb-8 grid rounded-2xl border border-primary/10 bg-background/40 p-1.5 backdrop-blur-2xl sm:grid-cols-3"
			>
				{#each Object.entries(tabs) as [key, tab]}
					<button
						on:click={() => (activeTab = key as TabKey)}
						class="rounded-xl px-4 py-3 text-xs font-bold tracking-wider uppercase transition duration-300 {activeTab ===
						key
							? 'bg-primary text-primary-foreground shadow-lg'
							: 'text-muted-foreground hover:bg-primary/10 hover:text-foreground'}"
					>
						{tab.label}
					</button>
				{/each}
			</div>

			{#key activeTab}
				<div
					in:fade={{ duration: 250 }}
					class="grid gap-8 rounded-3xl border border-primary/10 bg-card/40 p-6 shadow-2xl backdrop-blur-2xl md:grid-cols-12 md:p-8"
				>
					<div class="md:col-span-7">
						<div
							class="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"
						>
							{#if activeTab === 'power'}
								<BatteryChargingIcon class="size-6" />
							{:else if activeTab === 'safety'}
								<CpuIcon class="size-6" />
							{:else}
								<ShieldCheckIcon class="size-6" />
							{/if}
						</div>

						<h3 class="text-2xl font-black tracking-tight">{tabs[activeTab].title}</h3>
						<p class="mt-3 text-sm leading-relaxed text-muted-foreground">
							{tabs[activeTab].text}
						</p>
					</div>

					<div class="space-y-3 md:col-span-5 md:border-l md:border-primary/10 md:pl-8">
						{#each tabs[activeTab].points as point}
							<div
								class="flex items-center gap-3 rounded-xl border border-primary/10 bg-background/40 p-3"
							>
								<span class="rounded-full bg-primary/10 p-1 text-primary">
									<CheckIcon class="size-3" />
								</span>
								<span class="text-sm font-medium">{point}</span>
							</div>
						{/each}
					</div>
				</div>
			{/key}
		</div>
	</section>
	<ImgSeparator />
	<section class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
		<div class="absolute inset-x-8 top-24 -z-10 h-48 rounded-full bg-primary/10 blur-3xl"></div>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each stats as stat, i}
				<div
					transition:fly={{ y: 18, duration: 500, delay: i * 80 }}
					class="float-card group relative overflow-hidden rounded-3xl border border-primary/10 bg-card/35 p-6 shadow-xl backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-primary/30 hover:bg-primary/5"
				>
					<div
						class="absolute -top-12 -right-12 size-28 rounded-full bg-primary/10 blur-2xl transition duration-500 group-hover:scale-150"
					></div>
					<div class="relative">
						<p class="font-mono text-4xl font-black tracking-tighter text-primary">{stat.value}</p>
						<h3 class="mt-3 text-sm font-bold tracking-wider uppercase">{stat.label}</h3>
						<p class="mt-2 text-xs leading-relaxed text-muted-foreground">{stat.detail}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
	<ImgSeparator />
	<section
		class="relative overflow-hidden border-y border-primary/10 bg-card/20 px-4 py-24 backdrop-blur-xl sm:px-6 lg:px-8"
	>
		<div
			class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12),transparent_45%)]"
		></div>
		<div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
			<div class="lg:col-span-5">
				<div
					class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase backdrop-blur-xl"
				>
					<LayersIcon class="size-3" />
					Inside the Build
				</div>
				<h2 class="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
					More than a battery. A complete power layer.
				</h2>
				<p class="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
					TMAX combines capacity, output speed, smart protection, and flexible ports into a daily
					backup system for Addis Ababa customers.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:col-span-7">
				{#each productLayers as layer, i}
					<Card
						class="group relative overflow-hidden border-primary/10 bg-background/35 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-primary/30 hover:bg-primary/5"
					>
						<div
							class="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)/0.12),transparent_45%)] opacity-0 transition duration-500 group-hover:opacity-100"
						></div>
						<CardContent class="relative p-6">
							<div
								class="mb-5 flex size-12 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-primary transition duration-500 group-hover:scale-110 group-hover:rotate-6"
							>
								<svelte:component this={layer.icon} class="size-6" />
							</div>
							<span class="font-mono text-xs text-muted-foreground">0{i + 1}</span>
							<h3 class="mt-2 text-lg font-black">{layer.title}</h3>
							<p class="mt-3 text-sm leading-relaxed text-muted-foreground">{layer.text}</p>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</section>
	<ImgSeparator />
	<section class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<span class="text-xs font-bold tracking-widest text-primary uppercase"
				>Simple Buying Flow</span
			>
			<h2 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
				From low battery to delivered power.
			</h2>
		</div>

		<div class="relative grid gap-5 lg:grid-cols-3">
			<div class="absolute top-1/2 right-0 left-0 -z-10 hidden h-px bg-primary/20 lg:block"></div>
			{#each journey as step, i}
				<div
					class="group relative rounded-3xl border border-primary/10 bg-card/40 p-6 shadow-xl backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-primary/30"
				>
					<div
						class="absolute -top-3 left-6 rounded-full border border-primary/20 bg-background px-3 py-1 font-mono text-xs text-primary shadow-lg"
					>
						Step {i + 1}
					</div>
					<div
						class="mt-5 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl transition duration-500 group-hover:scale-110"
					>
						<svelte:component this={step.icon} class="size-6" />
					</div>
					<h3 class="mt-6 text-xl font-black">{step.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
				</div>
			{/each}
		</div>
	</section>
	<ImgSeparator />
	<section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-card/35 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10"
		>
			<div
				class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.16),transparent_40%)]"
			></div>
			<div class="grid gap-8 lg:grid-cols-12 lg:items-center">
				<div class="lg:col-span-4">
					<div
						class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase"
					>
						<BoxIcon class="size-3" />
						Trust System
					</div>
					<h2 class="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
						Designed to feel clear before you buy.
					</h2>
					<p class="mt-4 text-sm leading-relaxed text-muted-foreground">
						The page experience, product packaging, support flow, and delivery promise all work
						together to make TMAX easier to choose.
					</p>
				</div>

				<div class="grid gap-4 sm:grid-cols-2 lg:col-span-8">
					{#each trustSignals as signal}
						<div
							class="group flex gap-4 rounded-2xl border border-primary/10 bg-background/40 p-5 backdrop-blur-xl transition duration-300 hover:border-primary/30 hover:bg-primary/5"
						>
							<div
								class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110"
							>
								<svelte:component this={signal.icon} class="size-5" />
							</div>
							<div>
								<h3 class="text-sm font-bold">{signal.title}</h3>
								<p class="mt-2 text-xs leading-relaxed text-muted-foreground">{signal.text}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
	<ImgSeparator />
	<section class="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/40 p-8 shadow-2xl backdrop-blur-2xl sm:p-12"
		>
			<div
				class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.16),transparent_45%)]"
			></div>

			<div class="mx-auto flex max-w-xl flex-col items-center gap-6">
				<div
					class="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase"
				>
					<SparklesIcon class="size-3" />
					Power Ready
				</div>

				<h2 class="text-3xl font-black tracking-tight sm:text-4xl">
					Stay charged wherever the day takes you.
				</h2>

				<p class="text-sm leading-relaxed text-muted-foreground">
					Get authentic TMAX fast-charging power banks with local support, Birr pricing, and
					same-day delivery.
				</p>

				<Separator class="bg-primary/10" />

				<Button href="/shop" size="lg" class="group gap-2">
					Order for Delivery
					<ZapIcon class="size-4 transition-transform group-hover:scale-110" />
				</Button>
			</div>
		</div>
	</section>
</div>
<ImgSeparator />
{#if data?.imagesList?.length > 0}
	<Slider imagesList={data.imagesList} />
{/if}
<ImgSeparator />
{#if data?.testimonialList?.length > 0}
	<main class="flex flex-col items-center justify-center px-4 py-16">
		<div class="mb-10 max-w-2xl text-center">
			<h2 class="text-3xl font-bold md:text-4xl">What Customers Say</h2>
			<p class="mt-3 text-muted-foreground">Real feedback from people using TMAX products.</p>
		</div>

		<Testimonial testimonials={data.testimonialList} />
	</main>
{/if}
<ImgSeparator />
<Faq />

<style>
	@keyframes float-slow {
		0%,
		100% {
			transform: translate3d(0, 0, 0) rotate(0deg);
		}
		50% {
			transform: translate3d(0, -14px, 0) rotate(-2deg);
		}
	}

	@keyframes grid-drift {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 56px 56px;
		}
	}

	.float-slow {
		animation: float-slow 7s ease-in-out infinite;
	}

	.float-card:nth-child(odd) {
		animation: float-slow 8s ease-in-out infinite;
	}

	.float-card:nth-child(even) {
		animation: float-slow 9s ease-in-out infinite reverse;
	}

	.grid-drift {
		animation: grid-drift 18s linear infinite;
	}
</style>
