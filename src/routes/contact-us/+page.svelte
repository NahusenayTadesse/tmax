<script lang="ts">
	import { z } from 'zod';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { MailIcon, SendIcon, PhoneIcon, ClockIcon, CpuIcon } from '@lucide/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-svelte';
	import BrandLinkedin from '@tabler/icons-svelte/icons/brand-linkedin';
	import { fly } from 'svelte/transition';

	let { data } = $props();
	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json'
	});

	// Updated Social links with proper layout matching TMAX
	const socialLinks = [
		{
			name: 'Facebook',
			href: 'https://www.facebook.com/',
			icon: IconBrandFacebook
		},
		{
			icon: IconBrandInstagram,
			name: 'Instagram',
			href: 'https://www.instagram.com/'
		},
		{
			icon: IconBrandTiktok,
			name: 'TikTok',
			href: 'https://www.tiktok.com/'
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/',
			icon: BrandLinkedin
		}
	];

	// Direct Contact Info
	const contactInfo = [
		{
			icon: MailIcon,
			label: 'Email Support',
			value: 'support@tmax.com',
			href: 'mailto:support@tmax.com'
		},
		{
			icon: PhoneIcon,
			label: 'Direct Call / WhatsApp',
			value: '+251 930 109 760',
			href: 'https://wa.me/+251930109760'
		}
	];

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') toast.error($message.text);
			else {
				toast.success($message.text);
			}
		}
	});
</script>

<svelte:head>
	<title>Contact Us | TMAX Tech Hub</title>
	<meta
		name="description"
		content="Get in touch with TMAX for device inquiries, warranty claims, and order support in Addis Ababa."
	/>
</svelte:head>

<div
	class="relative min-h-dvh w-full overflow-hidden bg-background px-4 py-20 text-foreground transition-colors duration-300 sm:px-6 lg:px-8"
>
	<!-- Ambient Background Glows -->
	<div
		class="absolute top-0 left-1/4 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/10 opacity-70 blur-3xl duration-4000 dark:bg-primary/5"
	></div>
	<div
		class="absolute right-1/4 bottom-0 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/5 opacity-70 blur-3xl duration-6000 dark:bg-primary/10"
	></div>

	<main class="mx-auto max-w-6xl">
		<!-- Section Header -->
		<div
			transition:fly={{ y: 30, duration: 800 }}
			class="mb-16 flex flex-col items-center gap-3 text-center"
		>
			<span
				class="rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-[11px] font-bold tracking-widest text-primary uppercase backdrop-blur-sm"
			>
				Support Center
			</span>
			<h2
				class="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
			>
				Get in Touch
			</h2>
			<p class="max-w-xl text-base text-muted-foreground">
				Have questions about specifications, order dispatch, or our 12-month warranty? Drop us a
				line.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Contact Form Wrapper -->
			<div transition:fly={{ y: 30, duration: 800, delay: 150 }} class="lg:col-span-2">
				<Card
					class="relative overflow-hidden border-primary/10 bg-gradient-to-br from-card/60 via-card/40 to-primary/5 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-primary/20"
				>
					<!-- High-tech grid background layout -->
					<div
						class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(var(--primary),0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary),0.03)_1px,transparent_1px)] bg-[size:24px_24px]"
					></div>

					<CardHeader>
						<CardTitle class="text-2xl font-bold tracking-tight">Send a Message</CardTitle>
						<CardDescription
							>Our engineering and logistics teams typical reply within minutes.</CardDescription
						>
					</CardHeader>
					<CardContent>
						<form class="space-y-5" action="?/contact" method="POST" use:enhance>
							<div class="grid gap-4 sm:grid-cols-2">
								<InputComp
									{form}
									{errors}
									type="text"
									name="name"
									label="Full Name"
									placeholder="John Doe"
								/>
								<InputComp
									type="email"
									{form}
									{errors}
									name="email"
									label="Email Address"
									placeholder="your@email.com"
								/>
							</div>

							<div class="grid gap-4 sm:grid-cols-2">
								<InputComp
									type="tel"
									{form}
									{errors}
									name="phoneNumber"
									label="Phone Number"
									placeholder="+251 9..."
								/>
								<InputComp
									{form}
									{errors}
									type="text"
									name="subject"
									label="Subject"
									placeholder="Order / Warranty Inquiry"
								/>
							</div>

							<InputComp
								{form}
								{errors}
								type="textarea"
								name="contactMessage"
								label="Message"
								placeholder="Tell us what device you're looking for..."
							/>

							<!-- Animated Interactive Submit Button -->
							<Button
								type="submit"
								class="group w-full gap-2 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(var(--primary),0.3)]"
							>
								{#if $delayed}
									<LoadingBtn name="Routing Transmissions..." />
								{:else}
									<SendIcon
										class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
									/>
									Submit Inquiry
								{/if}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>

			<!-- Sidebar Info Columns -->
			<div class="flex flex-col gap-6">
				<!-- Direct Communications Info Block -->
				<div transition:fly={{ y: 20, duration: 600, delay: 200 }}>
					<Card class="border-primary/10 bg-card/40 shadow-md backdrop-blur-md">
						<CardHeader>
							<CardTitle class="text-lg font-bold tracking-wide">Direct Lines</CardTitle>
						</CardHeader>
						<CardContent class="flex flex-col gap-3">
							{#each contactInfo as info (info.label)}
								<a
									href={info.href}
									class="group flex items-center gap-4 rounded-xl border border-primary/5 bg-primary/5 p-3.5 transition-all duration-300 hover:border-primary/20 hover:bg-primary/10"
								>
									<div
										class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground"
									>
										<info.icon
											class="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
										/>
									</div>
									<div class="min-w-0 flex-1">
										<p class="text-xs font-medium text-muted-foreground">{info.label}</p>
										<p class="truncate text-sm font-bold tracking-wide text-foreground">
											{info.value}
										</p>
									</div>
								</a>
							{/each}
						</CardContent>
					</Card>
				</div>

				<!-- Connect Metrics / Social Block -->
				<div transition:fly={{ y: 20, duration: 600, delay: 300 }}>
					<Card class="border-primary/10 bg-card/40 shadow-md backdrop-blur-md">
						<CardHeader>
							<CardTitle class="text-lg font-bold tracking-wide">Follow Channels</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="grid grid-cols-2 gap-3">
								{#each socialLinks as social (social.name)}
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										class="group flex flex-col items-center gap-2 rounded-xl border border-primary/5 bg-primary/5 p-4 text-center transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:shadow-md"
										title={social.name}
									>
										<div
											class="rounded-lg bg-primary/5 p-2 transition-transform duration-300 group-hover:scale-110"
										>
											<social.icon class="h-5 w-5 text-primary" />
										</div>
										<span class="text-xs font-semibold tracking-wide">{social.name}</span>
									</a>
								{/each}
							</div>
						</CardContent>
					</Card>
				</div>

				<!-- Operational Delivery Schedules Block -->
				<div transition:fly={{ y: 20, duration: 600, delay: 400 }}>
					<Card
						class="border-primary/10 bg-gradient-to-br from-card/40 to-primary/5 shadow-md backdrop-blur-md"
					>
						<CardHeader class="flex flex-row items-center gap-2.5 pb-2">
							<ClockIcon class="h-5 w-5 text-primary" />
							<CardTitle class="!mt-0 text-lg font-bold tracking-wide">Delivery Hours</CardTitle>
						</CardHeader>
						<CardContent class="space-y-3 text-sm font-light">
							<div class="flex items-center justify-between border-b border-primary/5 pb-1.5">
								<span class="text-muted-foreground">Mon — Fri</span>
								<span class="font-mono font-semibold text-foreground">8:30 AM — 5:30 PM</span>
							</div>
							<div class="flex items-center justify-between">
								<span class="text-muted-foreground">Saturday</span>
								<span class="font-mono font-semibold text-foreground">8:30 AM — 12:00 PM</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>

		<section transition:fly={{ y: 30, duration: 800, delay: 500 }} class="relative mt-16 w-full">
			<div class="absolute inset-0 -z-10 rounded-3xl bg-primary/5 blur-xl"></div>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6989163918774!2d38.74450221007991!3d8.999827389408697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8513494db273%3A0x88235dbe171c4224!2sDiplomat%20Building!5e0!3m2!1sen!2set!4v1772532021053!5m2!1sen!2set"
				style="border:0;"
				class="h-[40vh] w-full rounded-3xl border border-primary/10 shadow-lg lg:h-[50vh]"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				title="TMAX Headquarters Map Location"
			></iframe>
		</section>
	</main>
</div>
