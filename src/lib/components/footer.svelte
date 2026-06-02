<script lang="ts">
	import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon, LaptopIcon } from '@lucide/svelte';

	// Svelte 5 state for newsletter, if you decide to add it back
	let email = $state('');

	import {
		IconBrandFacebook,
		IconBrandInstagram,
		IconBrandTiktok,
		IconBrandYoutube
	} from '@tabler/icons-svelte';

	const socialLinks = [
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/tmaxelectronics',
			icon: IconBrandInstagram,
			color: 'hover:text-pink-500 hover:border-pink-500/30'
		},
		{
			name: 'TikTok',
			url: 'https://www.tiktok.com/@tmaxelectronics',
			icon: IconBrandTiktok,
			color: 'hover:text-foreground hover:border-foreground/30'
		},
		{
			name: 'Facebook',
			url: 'https://facebook.com/tmaxelectronics',
			icon: IconBrandFacebook,
			color: 'hover:text-blue-600 hover:border-blue-600/30'
		},
		{
			name: 'YouTube',
			url: 'https://youtube.com',
			icon: IconBrandYoutube,
			color: 'hover:text-red-600 hover:border-red-600/30'
		}
	];
</script>

<!-- Glassmorphism Container with Shadcn border and background alpha -->
<footer
	class="relative overflow-hidden border-t border-border bg-card/60 text-card-foreground backdrop-blur-md"
>
	<!-- Subtle ambient accent glow behind the glass -->
	<div
		class="pointer-events-none absolute -top-24 -left-24 -z-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
	></div>

	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 gap-10 pb-8 md:grid-cols-3">
			<!-- Column 1: Company Info -->
			<div class="flex flex-col gap-4">
				<div class="flex items-center gap-2">
					<!-- Replace with your actual SVG logo or local asset if needed -->
					<img src="/logo.webp" class="w-30" alt="Tmax" />
					<span class="text-xl font-bold tracking-tight text-foreground">Electronics</span>
				</div>
				<p class="text-sm leading-relaxed text-muted-foreground">
					Your premier destination for cutting-edge consumer electronics, components, and innovative
					technology solutions.
				</p>

				<div class="mt-2 flex flex-col gap-3 text-sm">
					<a
						href="https://maps.google.com"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-start gap-3 text-muted-foreground transition-colors hover:text-foreground"
					>
						<MapPinIcon class="mt-0.5 size-4 shrink-0 text-primary" />
						<span>Main HQ Showroom, Addis Ababa, Ethiopia</span>
					</a>
					<a
						href="tel:+251900000000"
						class="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
					>
						<PhoneIcon class="size-4 shrink-0 text-primary" />
						<span>+251 900 000 000</span>
					</a>
					<a
						href="mailto:info@tmaxelectronics.com"
						class="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
					>
						<MailIcon class="size-4 shrink-0 text-primary" />
						<span>info@tmaxelectronics.com</span>
					</a>
					<a
						href="https://tmaxelectronics.com"
						class="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
					>
						<GlobeIcon class="size-4 shrink-0 text-primary" />
						<span>tmaxelectronics.com</span>
					</a>
				</div>
			</div>

			<!-- Column 2: Quick Links -->
			<div class="md:justify-self-center">
				<h4 class="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
					Quick Links
				</h4>
				<ul class="flex flex-col gap-2.5 text-sm">
					<li>
						<a href="/" class="text-muted-foreground transition-colors hover:text-foreground"
							>Home</a
						>
					</li>
					<li>
						<a href="/shop" class="text-muted-foreground transition-colors hover:text-foreground"
							>Products</a
						>
					</li>
					<li>
						<a href="/orders" class="text-muted-foreground transition-colors hover:text-foreground"
							>Orders</a
						>
					</li>
					<li>
						<a
							href="/about-us"
							class="text-muted-foreground transition-colors hover:text-foreground">About Us</a
						>
					</li>
					<li>
						<a href="/contact" class="text-muted-foreground transition-colors hover:text-foreground"
							>Contact Us</a
						>
					</li>
				</ul>
			</div>

			<!-- Column 3: Location / Map View -->
			<div class="flex flex-col">
				<h4
					class="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wider text-foreground uppercase"
				>
					<MapPinIcon class="size-4 text-primary" /> Store Location
				</h4>
				<div class="relative h-36 w-full overflow-hidden rounded-xl border border-border bg-muted">
					<!-- Standard placeholder map embed. Replace string with your exact coordinates if necessary -->
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6989163918774!2d38.74450221007991!3d8.999827389408697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTknNTkuNCJOIDM4wrA0NSc0MC4yIkU!5e0!3m2!1sen!2set!4v1710000000000!5m2!1sen!2set"
						style="border:0;"
						class="absolute inset-0 h-full w-full opacity-80 contrast-125 grayscale invert dark:invert-0"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title="Tmax Store Map Location"
					></iframe>
				</div>
			</div>
		</div>

		<!-- Bottom Strip: Social Media & Copyright Info -->
		<div
			class="flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row"
		>
			<div class="flex flex-col items-center gap-1 md:items-start">
				<p class="text-sm font-medium text-foreground">Connect With Us</p>
				<p class="text-xs text-muted-foreground">Stay updated with the latest tech drops.</p>
			</div>

			<!-- Refined grid layouts for custom card-style social chips -->
			<div class="flex gap-3">
				{#each socialLinks as social (social.url)}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class={[
							'flex items-center justify-center rounded-lg border border-border bg-card/40 p-2.5 text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-background hover:shadow-md',
							social.color
						]}
						title={social.name}
					>
						<social.icon class="h-5 w-5" />
					</a>
				{/each}
			</div>
		</div>

		<!-- Final Copyright -->
		<div class="mt-8 pt-4 text-center text-xs text-muted-foreground/60">
			<p>&copy; {new Date().getFullYear()} Tmax Electronics. All rights reserved.</p>
		</div>
	</div>
</footer>
