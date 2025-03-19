<script>
	import { onMount } from 'svelte';
	import LandingPage from './LandingPage.svelte';
	export let data;
	import OffCanvas from './OffCanvas.svelte';
	import { supabase } from '$lib/supabaseClient';

	onMount(async () => {
		const {
			data: { session }
		} = await supabase.auth.getSession();

		console.log(session);
	});
</script>

<main>
	<div style="position:relative;">
		<OffCanvas />
	</div>
	{#if data}
		<LandingPage user={data.user} />
	{:else}
		<LandingPage />
	{/if}
</main>

<style>
</style>
