<script>
	import LandingPage from './LandingPage.svelte';
	export let data;
	import OffCanvas from './OffCanvas.svelte';
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
