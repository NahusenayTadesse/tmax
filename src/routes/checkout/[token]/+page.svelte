<script lang="ts">
	let { data } = $props();

	import ProductList from './productList.svelte';
</script>

<ProductList productList={data?.productList} />
