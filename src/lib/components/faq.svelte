<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/components/ui/accordion';
	import {
		TruckIcon,
		PackageIcon,
		ShieldCheckIcon,
		HelpCircleIcon,
		CoinsIcon,
		ZapIcon,
		BatteryChargingIcon,
		UsbIcon,
		MonitorIcon
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	const features = [
		{
			id: 'product-quality',
			title: 'What makes TMax Electronics products reliable?',
			description:
				'TMax Electronics carefully selects products to ensure quality, durability, and everyday performance. Each product is chosen to meet customer needs for dependable technology.',
			icon: ShieldCheckIcon
		},
		{
			id: 'product-categories',
			title: 'What products does TMax Electronics offer?',
			description:
				'TMax Electronics offers mobile accessories, power solutions, storage devices, audio devices, smart electronics, and corporate or bulk order solutions.',
			icon: PackageIcon
		},
		{
			id: 'power-solutions',
			title: 'Do you offer power banks and charging products?',
			description:
				'Yes. TMax Electronics provides high-capacity power banks, mobile chargers, power sockets, extension solutions, and other charging products for home, business, and everyday use.',
			icon: BatteryChargingIcon
		},
		{
			id: 'mobile-accessories',
			title: 'What mobile accessories are available?',
			description:
				'TMax Electronics offers chargers, cables, adapters, holders, and essential accessories designed for modern mobile devices and daily convenience.',
			icon: UsbIcon
		},
		{
			id: 'storage-devices',
			title: 'Do you sell storage devices?',
			description:
				'Yes. TMax Electronics provides USB flash drives, memory storage products, and reliable data transfer solutions available in different capacities.',
			icon: MonitorIcon
		},
		{
			id: 'pricing',
			title: 'Are the products affordably priced?',
			description:
				'Yes. TMax Electronics focuses on providing premium technology products at competitive market prices while maintaining quality and value.',
			icon: CoinsIcon
		},
		{
			id: 'availability',
			title: 'Are TMax Electronics products available nationwide?',
			description:
				'TMax Electronics aims to make reliable electronics and technology accessories available to customers across Ethiopia through strong market availability and customer support.',
			icon: TruckIcon
		},
		{
			id: 'warranty-support',
			title: 'Do you provide warranty support?',
			description:
				'Yes. TMax Electronics provides warranty assistance, product replacement guidance, technical support, and customer service after purchase.',
			icon: ShieldCheckIcon
		},
		{
			id: 'customer-support',
			title: 'Can I get help choosing the right product?',
			description:
				'Yes. The TMax Electronics support team can assist with product information, technical questions, warranty guidance, and corporate customer support.',
			icon: HelpCircleIcon
		}
	];
</script>

<div
	class="relative min-h-dvh overflow-hidden bg-background px-4 py-24 text-foreground sm:px-6 lg:px-8"
>
	<div
		class="absolute top-12 left-1/3 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-3xl"
	></div>
	<div
		class="absolute right-1/3 bottom-12 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/5 blur-3xl"
	></div>

	<div class="mx-auto max-w-6xl">
		<div
			transition:fly={{ y: 30, duration: 700 }}
			class="mb-16 flex flex-col items-center gap-3 text-center"
		>
			<span
				class="rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-[11px] font-bold tracking-widest text-primary uppercase backdrop-blur-xl"
			>
				Customer Support
			</span>

			<h1
				class="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
			>
				Frequently Asked Questions
			</h1>

			<p class="max-w-xl text-base text-muted-foreground">
				Quick answers about TMax Electronics products, categories, pricing, warranty support, and
				customer service.
			</p>
		</div>

		<div transition:fly={{ y: 30, duration: 700, delay: 150 }}>
			<Accordion type="single" collapsible class="grid w-full items-start gap-4 md:grid-cols-2">
				{#each features as feature (feature.id)}
					<AccordionItem
						value={feature.id}
						class="group overflow-hidden rounded-2xl border border-primary/10 bg-card/30 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-card/50 [&[data-state=open]]:border-primary/30 [&[data-state=open]]:bg-primary/5 [&[data-state=open]]:shadow-lg"
					>
						<AccordionTrigger class="px-6 py-4 hover:no-underline">
							<div class="flex items-center gap-4 text-left">
								<div
									class="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground"
								>
									<svelte:component this={feature.icon} class="size-5" />
								</div>

								<h3
									class="text-sm font-bold tracking-wide transition-colors duration-300 group-hover:text-primary group-data-[state=open]:text-primary"
								>
									{feature.title}
								</h3>
							</div>
						</AccordionTrigger>

						<AccordionContent
							class="border-t border-primary/10 bg-background/40 px-6 py-4 backdrop-blur-xl"
						>
							<p class="text-xs leading-relaxed text-muted-foreground">
								{feature.description}
							</p>
						</AccordionContent>
					</AccordionItem>
				{/each}
			</Accordion>
		</div>
	</div>
</div>
