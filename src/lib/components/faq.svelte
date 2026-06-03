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
		ClockIcon,
		CpuIcon,
		LaptopIcon
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	const features = [
		{
			id: 'product-authenticity',
			title: 'Are all devices authentic?',
			description:
				'Absolutely. Every phone, laptop, audio system, and smart home accessory in our catalog is sourced directly from certified manufacturing channels. We bypass third-party traders to guarantee genuine hardware.',
			icon: CpuIcon
		},
		{
			id: 'warranty-infrastructure',
			title: 'How does the 12-month warranty work?',
			description:
				'Every purchase is tied to our signature 12-month TMAX hardware warranty. In the rare event of a factory anomaly, our localized service infrastructure handles diagnostics and repairs rapidly with zero extra charge.',
			icon: ShieldCheckIcon
		},
		{
			id: 'currency-payments',
			title: 'Can I pay entirely in local Birr?',
			description:
				'Yes. All items listed on TMAX are transparently priced in Ethiopian Birr (ETB). We completely accept cash, standard local mobile banking apps (Telebirr, CBE Birr, etc.), and direct electronic bank transfers.',
			icon: CoinsIcon
		},
		{
			id: 'addis-delivery',
			title: 'How fast is same-day delivery?',
			description:
				'If your order is placed within our operational window, our dedicated courier network dispatches the device straight to your precise home or office location anywhere in Addis Ababa within hours.',
			icon: TruckIcon
		},
		{
			id: 'wholesale-b2b',
			title: 'Do you offer bulk enterprise setups?',
			description:
				'Yes. We accommodate batch orders for companies expanding their office hardware layout or developers building automated smart-home complexes. Reach out directly via our contact channels for customized B2B contracts.',
			icon: LaptopIcon
		},
		{
			id: 'pre-orders',
			title: 'Can I secure unreleased hardware?',
			description:
				'For custom configurations or cutting-edge upcoming global releases, we offer an advanced secure booking system to lock down your preferred ecosystem tier ahead of time.',
			icon: ClockIcon
		},
		{
			id: 'box-verification',
			title: 'Can I inspect the seal on delivery?',
			description:
				'Yes. TMAX operations prioritize customer assurance. Upon arrival, our delivery personnel allow you to verify the factory security seals and matching product serial strings before finishing handoffs.',
			icon: PackageIcon
		},
		{
			id: 'support-hotline',
			title: 'Technical troubleshooting help',
			description:
				'Not sure which spec matches your professional workflow? Our support technicians are available to detail differences in processing power, ecosystem syncing, and smart-home configurations.',
			icon: HelpCircleIcon
		}
	];
</script>

<div
	class="relative min-h-dvh overflow-hidden bg-background px-4 py-24 text-foreground transition-colors duration-300 sm:px-6 lg:px-8"
>
	<!-- High-tech backdrop nodes for light/dark responsive neon bleeding -->
	<div
		class="absolute top-12 left-1/3 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/10 opacity-60 blur-3xl duration-4000 dark:bg-primary/5"
	></div>
	<div
		class="absolute right-1/3 bottom-12 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/5 opacity-60 blur-3xl duration-6000 dark:bg-primary/10"
	></div>

	<div class="mx-auto max-w-6xl">
		<!-- Dynamic Section Header -->
		<div
			transition:fly={{ y: 30, duration: 800 }}
			class="mb-16 flex flex-col items-center gap-3 text-center"
		>
			<span
				class="rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-[11px] font-bold tracking-widest text-primary uppercase backdrop-blur-sm"
			>
				Knowledge Base
			</span>
			<h1
				class="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
			>
				Frequently Asked Questions
			</h1>
			<p class="max-w-xl text-base text-muted-foreground">
				Everything you need to know about our sourcing ecosystem, Birr invoicing parameters, and
				TMAX logistics.
			</p>
		</div>

		<!-- Grid-mapped Glassmorphic Accordion Structure -->
		<div transition:fly={{ y: 30, duration: 800, delay: 200 }}>
			<Accordion type="single" collapsible class="grid w-full items-start gap-4 md:grid-cols-2">
				{#each features as feature (feature.id)}
					<AccordionItem
						value={feature.id}
						class="group overflow-hidden rounded-2xl border border-primary/5 bg-card/30 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/20 hover:bg-card/50 [&[data-state=open]]:border-primary/30 [&[data-state=open]]:bg-gradient-to-br [&[data-state=open]]:from-card/60 [&[data-state=open]]:to-primary/5 [&[data-state=open]]:shadow-md"
					>
						<AccordionTrigger class="px-6 py-4 transition-colors duration-300 hover:no-underline">
							<div class="flex items-center gap-4 text-left">
								<!-- Icon box toggles full brand color upon selection states -->
								<div
									class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground"
								>
									<svelte:component
										this={feature.icon}
										class="size-5 text-primary transition-colors duration-300 group-data-[state=open]:text-primary-foreground"
									/>
								</div>
								<h3
									class="text-sm font-bold tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary group-data-[state=open]:text-primary"
								>
									{feature.title}
								</h3>
							</div>
						</AccordionTrigger>

						<AccordionContent
							class="border-t border-primary/5 bg-background/40 px-6 py-4 backdrop-blur-sm"
						>
							<p class="text-xs leading-relaxed font-light text-muted-foreground">
								{feature.description}
							</p>
						</AccordionContent>
					</AccordionItem>
				{/each}
			</Accordion>
		</div>
	</div>
</div>
