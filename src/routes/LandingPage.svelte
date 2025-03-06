<script>
	import { goto } from '$app/navigation';
	// Define any reactive variables or functions here if needed
	let { user } = $props();

	console.log(user);
	import handleLogout from '$lib/logout';

	async function logout() {
		try {
			await handleLogout();
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}
</script>

<header class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
	<div class="container">
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a class="navbar-brand" href="#">KUCSA</a>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav ms-auto">
				<li class="nav-item">
					<a class="nav-link" href="#home">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#about">About</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#events">Events</a>
				</li>
				<li class="nav-item">
					<a
						onclick={() => {
							goto('/profile');
						}}
						class="nav-link"
						href="#contact">Profile</a
					>
				</li>
				<li class="nav-item">
					<a
						onclick={() => {
							logout();
						}}
						class="nav-link"
						href="#contact">Logout</a
					>
				</li>
			</ul>
		</div>
	</div>
</header>

<section
	id="hero"
	class="d-flex align-items-center justify-content-center text-center position-relative"
	style="height: 100vh;"
>
	<div class="hero-background"></div>
	<div class="container">
		{#if user}
			<h1 class="display-4">Welcome back to <span class="highlight">KUCSA</span></h1>
		{:else}
			<h1 class="display-4">Welcome to <span class="highlight">KUCSA</span></h1>
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
		<div class="mb-4">
			<p>Email: kucsa@university.edu</p>
			<p>Follow us: [Social Media Links]</p>
		</div>
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
</footer>

<style>
	/* Custom styles to complement Bootstrap */
	:global(body) {
		background-color: #0d0d0d;
		color: whitesmoke;
		font-family: 'Arial', sans-serif;
	}

	.highlight {
		color: #7bff00;
	}

	.icon-card,
	.event-card {
		background-color: #262626;
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

	@keyframes glow {
		0% {
			opacity: 0.3;
		}
		100% {
			opacity: 0.7;
		}
	}
</style>
