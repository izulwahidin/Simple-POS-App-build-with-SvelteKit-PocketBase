<script>
	import { currentUser, pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	const logout = async () => {
		try {
			await pb.authStore.clear();
		} catch (error) {
			return error.data;
		}
		goto('/login');
	};
</script>

<div class="relative mx-[-8px]">
	<div class="bg-slate-300 py-2 absolute top-0 w-full container rounded-b-xl">
		<div class="flex justify-between items-center mx-2 gap-2">
			<p class="text-">Halo, <span class="font-bold">{$currentUser?.name ?? 'Kak'}</span></p>
			{#if $currentUser}
				<button on:click={logout} class="button">Logout</button>
			{/if}
		</div>
	</div>
</div>
