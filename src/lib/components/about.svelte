<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import {
		BatteryChargingIcon,
		ZapIcon,
		ShieldCheckIcon,
		UsbIcon,
		MonitorIcon,
		CableIcon
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	const features = [
		{
			icon: ZapIcon,
			label: '22.5W Fast Charging',
			description: 'High-speed current output for phones, tablets, and daily devices.'
		},
		{
			icon: ShieldCheckIcon,
			label: 'Smart Chip Protection',
			description: 'Built-in protection for safer and more reliable charging.'
		},
		{
			icon: MonitorIcon,
			label: 'LED Digital Display',
			description: 'Clear battery percentage display on selected models.'
		},
		{
			icon: UsbIcon,
			label: 'Multi-Port Output',
			description: 'Charge multiple devices with USB and Type-C support.'
		}
	];

	const powerBanks = [
		{
			model: 'TMP-06',
			capacity: '40000mAh',
			title: 'Compact Fast Charging Power Bank',
			description:
				'Portable high-capacity power bank with 22.5W fast charging and smart protection.'
		},
		{
			model: 'TMP-10',
			capacity: '80000mAh',
			title: 'Powerful Reserve Power Bank',
			description: 'Large-capacity backup power designed for extended use and multiple devices.'
		},
		{
			model: 'TP-201',
			capacity: '20000mAh',
			title: 'IOS & Type-C Line Power Bank',
			description: 'Built-in IOS and Type-C cable support with fast charging convenience.'
		},
		{
			model: 'TMP-09',
			capacity: '70000mAh',
			title: 'LED Light Fast Charging Power Bank',
			description:
				'High-capacity model with LED display, multiple USB interfaces, and Type-C output.'
		}
	];
</script>

<section class="relative overflow-hidden bg-background px-4 py-24 text-foreground sm:px-6 lg:px-8">
	<div class="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
	<div class="absolute right-1/4 bottom-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>

	<div class="mx-auto max-w-6xl">
		<div transition:fly={{ y: 30, duration: 700 }} class="mb-16 text-center">
			<span
				class="mx-auto mb-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold tracking-wider text-primary uppercase"
			>
				T-max Power Series
			</span>

			<h2 class="text-4xl font-extrabold tracking-tight sm:text-6xl">
				Exquisite Packaging. Powerful Charging.
			</h2>

			<p class="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
				T-max power banks combine large battery capacity, 22.5W fast charging, LED display options,
				and smart chip protection for dependable everyday power.
			</p>
		</div>

		<div class="mb-16 grid gap-8 lg:grid-cols-3">
			<div transition:fly={{ y: 30, duration: 700, delay: 120 }} class="lg:col-span-2">
				<Card
					class="relative h-full overflow-hidden border-primary/10 bg-card/50 shadow-xl backdrop-blur-md"
				>
					<div
						class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:24px_24px]"
					></div>

					<CardContent class="grid h-full gap-8 p-8 md:grid-cols-5 md:items-center">
						<div class="md:col-span-3">
							<div class="mb-4 flex items-center gap-2 text-primary">
								<BatteryChargingIcon class="size-5" />
								<span class="text-xs font-bold tracking-widest uppercase">Core Product Line</span>
							</div>

							<h3 class="text-3xl font-bold tracking-tight">Reliable Power for Every Device</h3>

							<p class="mt-4 text-sm leading-relaxed text-muted-foreground">
								From compact daily backup models to large-capacity reserve power banks, T-max offers
								fast charging solutions built for phones, laptops, headphones, and other USB-powered
								devices.
							</p>

							<div class="mt-6 grid grid-cols-2 gap-3">
								<div class="rounded-xl border border-primary/10 bg-primary/5 p-4">
									<p class="text-xs text-muted-foreground">Up to</p>
									<p class="text-2xl font-bold text-primary">80000mAh</p>
								</div>

								<div class="rounded-xl border border-primary/10 bg-primary/5 p-4">
									<p class="text-xs text-muted-foreground">Fast Charging</p>
									<p class="text-2xl font-bold text-primary">22.5W</p>
								</div>
							</div>
						</div>

						<div class="md:col-span-2">
							<div class="rounded-2xl border border-primary/10 bg-background/70 p-5 shadow-inner">
								<div class="mb-4 flex items-center justify-between">
									<span class="font-mono text-xs text-muted-foreground">TMAX_POWER_STATUS</span>
									<span
										class="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary"
									>
										Active
									</span>
								</div>

								<div class="space-y-4">
									<div>
										<div class="mb-1 flex justify-between text-xs">
											<span class="text-muted-foreground">Charging Speed</span>
											<span class="font-mono text-primary">22.5W</span>
										</div>
										<div class="h-2 rounded-full bg-primary/10">
											<div class="h-2 w-4/5 rounded-full bg-primary"></div>
										</div>
									</div>

									<div class="rounded-xl border border-primary/10 bg-primary/5 p-3">
										<div class="flex items-center gap-2">
											<CableIcon class="size-4 text-primary" />
											<span class="text-xs font-semibold">USB / Type-C / IOS Line Support</span>
										</div>
									</div>

									<p class="font-mono text-[11px] leading-relaxed text-muted-foreground">
										Models: TMP-06, TMP-10, TP-201, TMP-09<br />
										Protection: Smart Chip<br />
										Display: LED Digital Display
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div class="flex flex-col gap-4">
				{#each features as feature, i}
					<div transition:fly={{ y: 20, duration: 600, delay: 180 + i * 90 }}>
						<Card
							class="border-primary/10 bg-card/40 backdrop-blur-md transition hover:-translate-y-1"
						>
							<CardContent class="flex gap-4 pt-6">
								<div
									class="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary"
								>
									<svelte:component this={feature.icon} class="size-6" />
								</div>

								<div>
									<p class="text-sm font-semibold">{feature.label}</p>
									<p class="mt-1 text-xs leading-relaxed text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
		</div>

		<Card class="border-primary/10 bg-card/30 shadow-xl backdrop-blur-lg">
			<CardHeader>
				<CardTitle>Why Choose T-max Power Banks?</CardTitle>
				<CardDescription>
					A fast, safe, and dependable charging experience designed for everyday use.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div class="grid gap-4 md:grid-cols-3">
					<div class="rounded-2xl border border-primary/10 bg-background/60 p-6">
						<ZapIcon class="mb-4 size-7 text-primary" />
						<h4 class="text-sm font-bold">Built for Speed</h4>
						<p class="mt-2 text-xs leading-relaxed text-muted-foreground">
							22.5W fast charging support helps reduce waiting time when powering phones, tablets,
							and other USB devices.
						</p>
					</div>

					<div class="rounded-2xl border border-primary/10 bg-background/60 p-6">
						<ShieldCheckIcon class="mb-4 size-7 text-primary" />
						<h4 class="text-sm font-bold">Protected Charging</h4>
						<p class="mt-2 text-xs leading-relaxed text-muted-foreground">
							Smart chip protection helps deliver safer charging by supporting stable and reliable
							power output.
						</p>
					</div>

					<div class="rounded-2xl border border-primary/10 bg-background/60 p-6">
						<BatteryChargingIcon class="mb-4 size-7 text-primary" />
						<h4 class="text-sm font-bold">Made for Daily Backup</h4>
						<p class="mt-2 text-xs leading-relaxed text-muted-foreground">
							High-capacity options are designed to keep essential devices powered at home, at work,
							or on the move.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
</section>
