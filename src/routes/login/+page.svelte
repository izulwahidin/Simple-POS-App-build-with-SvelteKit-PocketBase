<script>
	import { currentUser, pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	let user, pass, error;

	if ($currentUser) {
		goto('/');
	}

	const login = async () => {
		try {
			await pb.collection('users').authWithPassword(user, pass);
			goto('/');
		} catch (err) {
			error = err.data.message;
		}
	};
</script>

<div
	class="login flex flex-col justify-center m-auto md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
>
	<h2 class="text-3xl pb-3 text-center">Silahkan Login</h2>
	<form on:submit|preventDefault class="flex flex-col">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
			<input class="py-2 px-3" type="text" placeholder="Username" bind:value={user} />
			<input class="py-2 px-3" type="password" placeholder="Password" bind:value={pass} />
		</div>
		{#if error}
			<span class="mt-2 border border-red-500 rounded text-center">{error}</span>
		{/if}
		<button on:click={login} class="button mt-2">Login</button>
	</form>
</div>
