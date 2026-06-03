<script lang="ts">
	import { MessageSquareCode, ArrowRight, Star } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
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

			<div class="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8 md:mt-16">
				<div>
					<div class="text-xl font-black tracking-tight md:text-2xl">12,400+</div>
					<div class="mt-1 text-[10px] font-medium text-muted-foreground md:text-xs">
						customers in 2025
					</div>
				</div>
				<div>
					<div class="text-xl font-black tracking-tight md:text-2xl">Same day</div>
					<div class="mt-1 text-[10px] font-medium text-muted-foreground md:text-xs">
						delivery in Addis
					</div>
				</div>
				<div>
					<div class="flex items-center gap-1 text-xl font-black tracking-tight md:text-2xl">
						4.9 <Star class="h-4 w-4 fill-primary text-primary" />
					</div>
					<div class="mt-1 text-[10px] font-medium text-muted-foreground md:text-xs">
						service rating
					</div>
				</div>
			</div>
		</div>

		<div
			class="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-linear-to-br from-background via-primary to-secondary p-6 text-white shadow-md md:p-8 lg:col-span-5"
		>
			<div
				class="absolute inset-0 bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[size:40px_40px] opacity-10"
			></div>

			<div class="relative z-10 flex items-center justify-between">
				<span
					class="rounded-md border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-black tracking-widest uppercase backdrop-blur-md"
				>
					Deal of the week
				</span>

				<div class="flex items-center gap-1 font-mono text-xs font-bold">
					<span class="rounded bg-black/80 px-2 py-1">08</span>:
					<span class="rounded bg-black/80 px-2 py-1">12</span>:
					<span class="rounded bg-black/80 px-2 py-1">37</span>
				</div>
			</div>

			<div
				class="relative z-10 my-6 flex aspect-[4/3] w-full flex-col items-center justify-between rounded-2xl border border-white/20 bg-white/20 p-4 shadow-inner backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.01]"
			>
				<div class="self-start rounded-md bg-black/80 px-2 py-1 text-xs font-bold text-white">
					-18%
				</div>

				<div class="flex h-full max-h-[160px] w-full items-center justify-center text-white/40">
					<div
						class="h-32 w-32 animate-pulse rounded-xl bg-gradient-to-tr from-white/10 to-white/30 shadow-md"
					></div>
				</div>

				<div
					class="self-start rounded-md bg-white/90 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-slate-800 uppercase shadow-sm"
				>
					Halo X9 Pro · Titanium
				</div>
			</div>

			<div class="relative z-10 flex items-end justify-between">
				<div class="space-y-1">
					<div class="text-[10px] font-bold tracking-wider text-white/80 uppercase">Halo</div>
					<h3 class="text-xl font-bold tracking-tight">X9 Pro · 256GB</h3>
					<div class="mt-1 flex items-baseline gap-2">
						<span class="text-2xl font-black tracking-tight">ETB 86,500</span>
						<span class="text-sm font-medium text-white/60 line-through">96,000</span>
					</div>
				</div>
			</div>
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
