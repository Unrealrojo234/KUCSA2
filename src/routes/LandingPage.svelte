<script>
	import { goto } from '$app/navigation';
	export let user;
	import { supabase } from '$lib/supabaseClient';
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
			<a href="/auth/login" style="text-decoration: none;" class="cta-button">login</a>
		{/if}
	</div>
</section>

<section id="about" class="py-5 bg-dark">
	<div class="container text-center">
		<h2 class="mb-4">About <span class="highlight">KUCSA</span></h2>
		<p class="mb-5">
			KUCSA is the premier computing club at Kisii University, dedicated to fostering innovation,
			collaboration, and technical growth.
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

<section id="events" class="py-5">
	<div class="container text-center">
		<h2 class="mb-4">Upcoming <span class="highlight">Events</span></h2>
		<div class="row justify-content-center">
			<div class="col-md-4 mb-4">
				<div class="event-card">
					<h3>Hackathon 2023</h3>
					<p>Date: November 15-16</p>
					<a href="#register" class="btn cta-button">Register</a>
				</div>
			</div>
			<div class="col-md-4 mb-4">
				<div class="event-card">
					<h3>AI Workshop</h3>
					<p>Date: December 5</p>
					<a href="#register" class="btn cta-button">Register</a>
				</div>
			</div>
			<div class="col-md-4 mb-4">
				<div class="event-card">
					<h3>Tech Talk: Blockchain</h3>
					<p>Date: January 10</p>
					<a href="#register" class="btn cta-button">Register</a>
				</div>
			</div>
		</div>
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
	/* Custom styles to complement Bootstrap */
	:global(body) {
		background-color: #222428;
		color: rgba(250, 248, 248, 0.836);
		font-family: 'Arial', sans-serif;
	}

	.highlight {
		color: #7bff00;
	}

	.icon-card,
	.event-card {
		background-color: #00b492;
		padding: 20px;
		border-radius: 10px;
		transition:
			transform 0.3s,
			box-shadow 0.3s;
	}

	.icon-card:hover,
	.event-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 10px 20px rgba(123, 255, 0, 0.2);
	}

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
