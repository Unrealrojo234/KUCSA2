<script>
	import { goto } from '$app/navigation';
	export let user;
	import { supabase } from '$lib/supabaseClient';
	import UpcomingEvents from './UpcomingEvents.svelte';
</script>

<section
	id="hero"
	class="d-flex align-items-center justify-content-center text-center position-relative"
	style="height: 100vh;"
>
	<div class="hero-background"></div>
	<div class="container">
		{#if !user}
			<h1 class="display-4">Welcome to <span class="highlight">KUCSA</span></h1>
		{:else}
			<h1 class="display-4">Welcome back to <span class="highlight">KUCSA</span></h1>
		{/if}
		<p class="lead">Your Gateway to Computing Excellence</p>
		{#if !user}
			<a href="/auth/login" style="text-decoration: none;border:none;" class="cta-button">login</a>
		{/if}
	</div>
</section>

<section id="about" class="py-5 bg-dark">
	<div class="container text-center">
		<h2 class="mb-4 display-4 fw-bold">About <span class="highlight">KUCSA</span></h2>
		<p class="">
			KUCSA is the premier computing club at Kisii University, dedicated to fostering innovation,
			collaboration, and technical growth.
		</p>
		<p class="mb-5">
			Kisii University Computing Students Association is exploring the tech potential of its members
			to introduce plans and programs that are aimed at exposing our members to the job market and
			trends, a voice to the surrounding society and a direct engagements professionally across
			Africa and global society that leads to future career growth and employability.
		</p>
		<div class="row justify-content-center">
			<div class="col-md-4 mb-4">
				<div class="icon-card">
					<img
						src="programming.svg"
						alt="Coding"
						class="mb-3"
						style="width: 100px; height: 140px;"
					/>
					<p>Coding Workshops</p>
				</div>
			</div>
			<div class="col-md-4 mb-4">
				<div class="icon-card">
					<img
						src="social-networking.svg"
						alt="Networking"
						class="mb-3"
						style="width: 140px; height: 140px;"
					/>
					<p>Networking Events</p>
				</div>
			</div>
			<div class="col-md-4 mb-4">
				<div class="icon-card">
					<img
						src="pair-programming.svg"
						alt="Hackathons"
						class="mb-3"
						style="width: 140px; height: 140px;"
					/>
					<p>Hackathons</p>
				</div>
			</div>
		</div>
	</div>
</section>

<UpcomingEvents />

<section id="events" class="py-5 bg-dark"></section>

<section class="bg-dark py-5">
	<div class="container text-center">
		<h1 class="mb-4 display-4 fw-bold">Tech <span class="highlight">Blogs</span></h1>
		<h2 class="mb-4 display-4 fw-bold">Coming Soon! 😲</h2>
	</div>
</section>

<footer class="py-5 bg-dark text-center">
	<div class="container">
		<div class="mb-4"></div>
		<form class="d-flex justify-content-center">
			<input
				type="email"
				class="form-control me-2"
				placeholder="Enter your email"
				style="max-width: 300px;"
			/>
			<button type="submit" class="btn cta-button">Subscribe</button>
		</form>
	</div>
	<br />
	<p>&#169;2025 KUCSA | All Rights Are Reserved</p>
</footer>

<style>
	.hero-background {
		position: absolute;

		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle, rgba(123, 255, 0, 0.1), rgba(13, 13, 13, 1));
		z-index: -1;
		animation: glow 5s infinite alternate;
	}

	#events {
		background-color: none;
	}

	@keyframes glow {
		0% {
			opacity: 0.3;
		}
		100% {
			opacity: 0.7;
		}
	}
</style>
