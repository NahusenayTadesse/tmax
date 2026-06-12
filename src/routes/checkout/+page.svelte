<script lang="ts">
	import { useCart } from '$lib/hooks/cart.svelte.js';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Badge } from '$lib/components/ui/badge';
	import {
		ShoppingCartIcon,
		CreditCardIcon,
		PackageIcon,
		ArrowLeftIcon,
		UserRoundPlusIcon,
		UserIcon,
		ShieldCheckIcon
	} from '@lucide/svelte';
	import CartItem from '$lib/components/floating-cart/cart-item.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';
	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	import Signup from '$lib/forms/Signup.svelte';
	import Login from '$lib/forms/Login.svelte';

	const cart = useCart();
	let { data } = $props();

	// Reusable, local-safe currency formatter
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'ETB'
		}).format(price);
	};

	const { form, errors, enhance, allErrors, delayed, message } = superForm(data.form, {
		dataType: 'json',
		resetForm: true,
		onResult: ({ result }) => {
			// Clear the cart for BOTH regular success and Chapa redirects
			if (result.type === 'success' || result.type === 'redirect') {
				cart.clearCart();
			}

			// Only show the instant success toast if they aren't being redirected
			if (result.type === 'success') {
				toast.success('Secure digital transaction processed successfully!');
			}
		}
	});

	// Pure reactive derivation for item sub-arrays
	const formattedData = $derived(
		cart?.items.map((item) => ({
			product: item.productId,
			quantity: item.quantity,
			amount: item.amount,
			price: item.price
		})) || []
	);

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});

	$effect(() => {
		$form.selectedProducts = formattedData;
	});
</script>

<svelte:head>
	<title>Secure Checkout | Tmax Electronics</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div
	class="relative min-h-screen bg-linear-to-b from-background via-background/98 to-muted/20 pb-16 text-foreground antialiased selection:bg-primary/20"
>
	<div
		class="pointer-events-none absolute top-0 right-1/4 -z-10 h-200 w-200 rounded-full bg-primary/5 blur-[100px]"
	></div>
	<div
		class="w-[87.5 pointer-events-none absolute bottom-1/3 left-1/4 -z-10 h-87.5 rounded-full bg-blue-500/5 blur-[100px]"
	></div>

	<div class="mx-auto max-w-6xl px-4 py-8 md:py-12">
		<div
			class="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between"
		>
			<div class="flex items-center gap-3.5">
				<div class="rounded-xl border border-primary/20 bg-primary/10 p-2.5 text-primary shadow-xs">
					<ShoppingCartIcon class="size-5" />
				</div>
				<div>
					<h1 class="text-2xl font-extrabold tracking-tight sm:text-3xl">Secure Checkout</h1>
					<p class="text-sm text-muted-foreground">
						Review your hardware configuration payload and settle distribution dispatching lines.
					</p>
				</div>
			</div>
			<div
				class="flex items-center gap-2 self-start rounded-xl border border-border/80 bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground sm:self-center"
			>
				<ShieldCheckIcon class="size-3.5 text-green-500" />
				<span>End-to-End Encrypted Gateway</span>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
			<div class="lg:col-span-7">
				<section
					class="rounded-2xl border border-border/80 bg-card/40 p-6 shadow-xs backdrop-blur-md"
				>
					<div class="mb-6 flex items-center gap-2 border-b border-border/60 pb-4">
						<CreditCardIcon class="size-4 text-primary" />
						<h2 class="text-lg font-bold tracking-tight">Customer Verification</h2>
					</div>

					{#if !data?.user}
						<div class="space-y-6">
							<div
								class="rounded-xl border border-dashed border-border bg-muted/20 p-5 text-center"
							>
								<p class="mb-4 text-sm text-muted-foreground">
									You are currently checking out as a guest. Authenticate to sync order tracking
									details and hardware logs with an account profile.
								</p>

								<div class="flex flex-wrap items-center justify-center gap-3">
									<DialogComp
										title="Create Profile Account"
										variant="default"
										IconComp={UserRoundPlusIcon}
									>
										<Signup data={data?.signupForm} action="/signup/?/signup" />
									</DialogComp>

									<DialogComp title="Log In with Credentials" variant="outline" IconComp={UserIcon}>
										<Login data={data?.loginForm} action="/login/?/login" />
									</DialogComp>
								</div>
							</div>

							<form
								action="?/add"
								use:enhance
								id="main"
								class="space-y-4"
								method="post"
								enctype="multipart/form-data"
							>
								<Errors allErrors={$allErrors} />
								<InputComp
									label="Name"
									name="name"
									type="text"
									{form}
									{errors}
									placeholder="Enter Your Name"
								/>
								<InputComp
									label="Email"
									name="email"
									type="email"
									{form}
									{errors}
									placeholder="Enter Your Email"
									required
								/>
								<InputComp
									label="Phone"
									name="phone"
									type="text"
									{form}
									{errors}
									placeholder="Enter Your Phone"
									required
								/>
								<InputComp
									label=""
									name="selectedProducts"
									type="hidden"
									{form}
									{errors}
									placeholder=""
								/>

								<div class="space-y-2 pt-4">
									<Button
										type="submit"
										form="main"
										class="h-12 w-full rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all duration-300 active:scale-98"
										disabled={cart.items.length === 0 || $delayed}
									>
										{#if $delayed && !$form.payWithChapa}
											<LoadingBtn name="Adding Your Order..." />
										{:else}
											Add Order with &mdash; {formatPrice(cart.totalPrice)}
										{/if}
									</Button>
									<Button
										type="submit"
										form="main"
										class="h-12 w-full rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all duration-300 active:scale-98"
										disabled={cart.items.length === 0 || $delayed}
										onclick={() => ($form.payWithChapa = true)}
									>
										{#if $delayed && $form.payWithChapa}
											<LoadingBtn name="Redirecting to Chapa..." />
										{:else}
											Pay On With Chapa &mdash; {formatPrice(cart.totalPrice)}
										{/if}
									</Button>
									<p class="prose-sm max-w-prose rounded-lg border bg-muted text-center text-sm">
										Pay with Chapa using <a href="https://telebirr.et" target="_blank">Telebirr</a>,
										CBE Birr and More
									</p>
								</div>
							</form>
						</div>
					{:else if data?.user}
						<form
							action="?/add"
							use:enhance
							id="main"
							class="space-y-5"
							method="post"
							enctype="multipart/form-data"
						>
							<InputComp
								label=""
								name="selectedProducts"
								type="hidden"
								{form}
								{errors}
								placeholder=""
							/>

							<div
								class="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-4 shadow-inner backdrop-blur-xs"
							>
								<div class="space-y-0.5">
									<span
										class="text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
										>Authenticated Secure Profile</span
									>
									<p class="text-sm font-medium text-foreground">
										{data.user.email || 'Verified User'}
									</p>
									<p class="text-xs text-muted-foreground">
										{cart.totalItems} pipeline items staged in memory
									</p>
								</div>
								<div class="text-right">
									<span class="block text-xs text-muted-foreground">Allocation Total</span>
									<span class="font-mono text-lg font-bold text-primary"
										>{formatPrice(cart.totalPrice)}</span
									>
								</div>
							</div>

							<div class="space-y-2 pt-4">
								<Button
									type="submit"
									form="main"
									class="h-12 w-full rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all duration-300 active:scale-98"
									disabled={cart.items.length === 0 || $delayed}
								>
									{#if $delayed && !$form.payWithChapa}
										<LoadingBtn name="Adding Your Order..." />
									{:else}
										Add Order with &mdash; {formatPrice(cart.totalPrice)}
									{/if}
								</Button>
								<Button
									type="submit"
									form="main"
									class="h-12 w-full rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all duration-300 active:scale-98"
									disabled={cart.items.length === 0 || $delayed}
									onclick={() => ($form.payWithChapa = true)}
								>
									{#if $delayed && $form.payWithChapa}
										<LoadingBtn name="Redirecting to Chapa..." />
									{:else}
										Pay On With Chapa &mdash; {formatPrice(cart.totalPrice)}
									{/if}
								</Button>
								<p class="prose-sm max-w-prose rounded-lg border bg-muted text-center">
									Pay with Chapa using <a href="https://telebirr.et" target="_blank">Telebirr</a>,
									CBE Birr and More
								</p>
							</div>
						</form>
					{/if}
				</section>
			</div>

			<div class="lg:col-span-5">
				<div class="sticky top-28 space-y-6">
					<div
						class="rounded-2xl border border-border/80 bg-card/50 p-6 shadow-xs backdrop-blur-md"
					>
						<div class="mb-5 flex items-center justify-between border-b border-border/60 pb-3">
							<h2 class="flex items-center gap-2 text-base font-bold tracking-tight">
								<PackageIcon class="size-4 text-muted-foreground" />
								<span>Manifest Summary</span>
							</h2>
							<Badge
								class="rounded-md border-primary/20 bg-primary/10 font-mono text-[11px] font-bold text-primary hover:bg-primary/20"
							>
								{cart.totalItems} Units
							</Badge>
						</div>

						{#if cart.items.length > 0}
							<ScrollArea class="max-h-96 pr-3">
								<div class="divide-y divide-border/60">
									{#each cart.items as item}
										<div class="py-2.5 transition-all">
											<CartItem {item} />
										</div>
									{/each}
								</div>
							</ScrollArea>

							<div class="mt-6 space-y-3 border-t border-border/60 pt-4">
								<div class="flex justify-between text-xs sm:text-sm">
									<span class="text-muted-foreground">Subtotal Allocation</span>
									<span class="font-mono font-medium">{formatPrice(cart.totalPrice)}</span>
								</div>
								<div class="flex justify-between text-xs sm:text-sm">
									<span class="text-muted-foreground">Logistics Premium Shipping</span>
									<span
										class="rounded-md border border-green-500/20 bg-green-500/10 px-2 py-0.5 font-sans text-xs font-bold tracking-wider text-green-500 uppercase"
									>
										Complimentary
									</span>
								</div>
								<div
									class="flex justify-between border-t border-border pt-4 text-base font-bold sm:text-lg"
								>
									<span class="tracking-tight">Gross Total Cost</span>
									<span class="font-mono text-primary">{formatPrice(cart.totalPrice)}</span>
								</div>
							</div>
						{:else}
							<div class="py-12 text-center">
								<PackageIcon class="mx-auto mb-3.5 size-10 stroke-[1.5] text-muted-foreground/30" />
								<p class="mb-4 text-sm font-medium text-muted-foreground">
									No active allocations found in cart storage memory.
								</p>
								<Button
									href="/shop"
									variant="outline"
									class="h-9 gap-2 rounded-xl border-border bg-background/50 text-xs hover:bg-background"
								>
									<ArrowLeftIcon class="size-3.5" />
									<span>Browse Hardware Store</span>
								</Button>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
