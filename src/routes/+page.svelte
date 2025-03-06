<script>
	import LandingPage from './LandingPage.svelte';

	export let data;
</script>

<main>
	<LandingPage user={data.user} />
</main>

<style>
</style>
