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
			id: 'fast-charging',
			title: 'Do T-max power banks support fast charging?',
			description:
				'Yes. Selected T-max power banks support 22.5W fast charging, helping you power phones, tablets, and other USB devices faster than standard output power banks.',
			icon: ZapIcon
		},
		{
			id: 'capacity-options',
			title: 'What battery capacities are available?',
			description:
				'T-max power banks come in high-capacity options such as 20000mAh, 40000mAh, 70000mAh, and 80000mAh, giving customers choices for daily use, travel, work, and backup power.',
			icon: BatteryChargingIcon
		},
		{
			id: 'device-compatibility',
			title: 'Which devices can I charge?',
			description:
				'They are designed for common USB-powered devices including smartphones, tablets, earbuds, smart watches, portable speakers, and other Type-C or USB-compatible devices.',
			icon: UsbIcon
		},
		{
			id: 'smart-protection',
			title: 'Are they safe for daily charging?',
			description:
				'Yes. T-max power banks include smart chip protection features that help support safer charging, stable current output, and protection against common charging risks.',
			icon: ShieldCheckIcon
		},
		{
			id: 'led-display',
			title: 'Do they show battery percentage?',
			description:
				'Some models include an LED digital display, making it easier to check remaining battery level before leaving home, work, or travel.',
			icon: MonitorIcon
		},
		{
			id: 'delivery',
			title: 'Is same-day delivery available?',
			description:
				'Yes. Orders within Addis Ababa can be delivered the same day during working hours, depending on product availability and delivery location.',
			icon: TruckIcon
		},
		{
			id: 'local-payment',
			title: 'Can I pay in Ethiopian Birr?',
			description:
				'Yes. T-max products are priced locally in Ethiopian Birr, with simple payment options for customers in Addis Ababa.',
			icon: CoinsIcon
		},
		{
			id: 'packaging',
			title: 'What comes with the packaging?',
			description:
				'Each product comes in branded T-max packaging with model information, capacity details, charging specifications, QR code labeling, and product safety information.',
			icon: PackageIcon
		},
		{
			id: 'support',
			title: 'Can I get help choosing a model?',
			description:
				'Yes. Support is available to help you choose the right power bank based on your phone, charging habits, capacity needs, and daily usage.',
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
				Power Bank Guide
			</span>

			<h1
				class="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
			>
				Frequently Asked Questions
			</h1>

			<p class="max-w-xl text-base text-muted-foreground">
				Quick answers about T-max capacity, fast charging, safety, delivery, and daily use.
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
