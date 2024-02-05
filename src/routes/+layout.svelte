<script>
	import '../app.css';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<div class="container mx-[auto] px-2 bg-slate-200 min-h-screen">
	<Header />
	<div class="py-14">
		<slot />
	</div>
	<Footer />
</div>
