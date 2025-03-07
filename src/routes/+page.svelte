<script>
	import LandingPage from './LandingPage.svelte';

	export let data;
</script>

<main>
	{#if data}
		<LandingPage user={data.user} />
	{:else}
		<LandingPage />
	{/if}
</main>

<style>
</style>
