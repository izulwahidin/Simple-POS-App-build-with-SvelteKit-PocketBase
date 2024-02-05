<script>
	import { onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pocketbase';
	let query;
	let items = [];

	const getProduct = async () => {
		console.log(query);
		const listProduct = await pb.collection('products').getList(1, 10, {
			sort: 'updated',
			expand: 'categories,tags',
			filter: pb.filter('name ~ {:search} || description ~ {:search}', {
				search: query ?? ''
			})
		});
		items = listProduct.items;
		console.log(items);
	};

	const addToCard = () => {};

	onMount(async () => getProduct());
</script>

<div class="checkout gap-2 pt-4">
	<div class="border border-red-500">
		<h3 class="text-2xl font-bold py-2">Cari Produk</h3>
		<input type="text" bind:value={query} on:keyup={getProduct} class="min-w-[350px] px-2 py-1" />
		<h3 class="text-2xl font-bold py-2">List Produk</h3>
		{#each items as item (item.id)}
			<div class="flex justify-between px-2 gap-2 border border-slate-700 py-2">
				<img src="https://picsum.photos/200/200" alt="" />
				<div class="w-full">
					<h1>{item.name}</h1>
					<p class="truncate">{item.description}</p>
					<div class="flex gap-2">
						<p>Categori:</p>
						{#each item.expand.categories as cat}
							<span>{cat.name}, </span>
						{/each}
					</div>
					<div class="flex gap-2">
						<p>Tag:</p>
						{#each item.expand.tags as tag}
							<span>{tag.name}, </span>
						{/each}
					</div>
					<button on:click={addToCard} class="button mt-3">Tambah ke Keranjang</button>
				</div>
			</div>
		{/each}
	</div>
	<div class="border border-red-500">
		<h3 class="text-center text-2xl font-bold">Keranjang</h3>
	</div>
</div>
