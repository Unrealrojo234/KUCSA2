<script>
	import { goto } from '$app/navigation';
	import 'animate.css';
	export let user;
	import { supabase } from '$lib/supabaseClient';
	import UpcomingEvents from './UpcomingEvents.svelte';
	import GiHubBtn from './GiHubBtn.svelte';
	import GoogleBtn from './GoogleBtn.svelte';
	import TopDevs from './TopDevs.svelte';
</script>

<section
	id="hero"
	class="d-flex align-items-center justify-content-center text-center position-relative"
	style="height: 100vh;"
>
	<div class="hero-background"></div>
	<div class="logo-container"></div>

	<div class="container">
		{#if !user}
			<h1 class="display-4">Welcome to <span class="highlight">KUCSA</span></h1>
		{:else}
			<h1 class="display-4">Welcome back to <span class="highlight">KUCSA</span></h1>
		{/if}
		<p class="lead">Your Gateway to Computing Excellence</p>
		{#if !user}
			<!-- <a href="/auth/login" style="text-decoration: none;border:none;" class="cta-button">login</a> -->
			<GoogleBtn />
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

		<section class="container my-5 py-5">
			<div class="text-center">
				<h2 class="section-heading">Our Mission</h2>
				<p class="section-subheading">
					Empowering our members to connect, innovate, and transform the world through technology.
				</p>
			</div>
			<div class="row g-4">
				<!-- Feature 1 -->
				<div class="col-md-6 col-lg-4">
					<div class="feature-card p-4 shadow text-center">
						<div class="feature-icon">1</div>
						<h4 class="mb-3">Professional Alumni Interaction</h4>
						<p class="text-muted">
							Give our members the chance to interact with alumni groups professionally, fostering
							mentorship and collaboration.
						</p>
					</div>
				</div>
				<!-- Feature 2 -->
				<div class="col-md-6 col-lg-4">
					<div class="feature-card p-4 shadow text-center">
						<div class="feature-icon">2</div>
						<h4 class="mb-3">Global Problem Solving</h4>
						<p class="text-muted">
							Expand territorial thinking by addressing global societal problems through technology
							and cross-country knowledge sharing.
						</p>
					</div>
				</div>
				<!-- Feature 3 -->
				<div class="col-md-6 col-lg-4">
					<div class="feature-card p-4 shadow text-center">
						<div class="feature-icon">3</div>
						<h4 class="mb-3">Engage with Tech Professionals</h4>
						<p class="text-muted">
							Invite diverse tech professionals to engage with our members at various levels,
							providing insights and guidance.
						</p>
					</div>
				</div>
				<!-- Feature 4 -->
				<div class="col-md-6 col-lg-4">
					<div class="feature-card p-4 shadow text-center">
						<div class="feature-icon">4</div>
						<h4 class="mb-3">Transformational Networking</h4>
						<p class="text-muted">
							Provide platforms for members to network, collaborate, and work on common projects
							with people worldwide.
						</p>
					</div>
				</div>
				<!-- Feature 5 -->
				<div class="col-md-6 col-lg-4">
					<div class="feature-card p-4 shadow text-center">
						<div class="feature-icon">5</div>
						<h4 class="mb-3">Innovative Idea Sharing</h4>
						<p class="text-muted">
							Offer a platform to share innovative ideas and assist in their faster implementation
							across the globe.
						</p>
					</div>
				</div>
				<!-- Feature 6 -->
				<div class="col-md-6 col-lg-4">
					<div class="feature-card p-4 shadow text-center">
						<div class="feature-icon">6</div>
						<h4 class="mb-3">Promote Ideas with Experts</h4>
						<p class="text-muted">
							Connect employers, innovators, investors, and mentors to promote ideas and provide
							actionable advice.
						</p>
					</div>
				</div>
			</div>
		</section>

		<h2 class="mb-4 display-4 fw-bold">Perks Of <span class="text-warning">Membership</span></h2>

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

<div class="bg-dark" id="events">
	<UpcomingEvents />
</div>

<section id="events" class="py-5 bg-dark"></section>

<div class="bg-dark">
	<h1 class="mb-4 display-4 fw-bold text-center">
		Kisii <span class="text-danger">Top-Devs 📢</span>
	</h1>
	<TopDevs />
</div>

<section class="bg-dark py-5">
	<div class="container text-center">
		<h1 class="mb-4 display-4 fw-bold">Tech <span class="highlight">Blogs</span></h1>
		<h2 class="mb-4 display-4 fw-bold animate__animated animate__infinite animate__pulse">
			Coming Soon! 😲
		</h2>
	</div>
</section>

<footer class="py-5 bg-dark text-center">
	<div class="container">
		<div class="mb-4 text-center">
			<GiHubBtn />
		</div>
		<form class="d-flex justify-content-center">
			<input
				type="email"
				class="form-control me-2"
				placeholder="Enter your email"
				style="max-width: 300px;"
			/>
			<button disabled type="submit" class="btn cta-button">Subscribe</button>
		</form>
	</div>
	<br />
	<p>&#169;2025 KUCSA | All Rights Are Reserved</p>
</footer>

<style>
	/* .logo-container {
		width: 80px;
		height: 80px;
		position: absolute;
		top: 0%;
		border-radius: 50%;
		background-image: url('https://kucsa.netlify.app/image/logo_k.png');
		background-position: center;
		background-size: contain;
		background-color: #0d6efd;
		box-shadow: 0 0 20px rgba(13, 110, 253, 0.5);
	} */

	.feature-icon {
		width: 60px;
		height: 60px;
		background-color: #0d6efd;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		margin-bottom: 20px;
	}
	.feature-card {
		border: none;
		border-radius: 10px;
		transition: transform 0.3s ease;
	}
	.feature-card:hover {
		transform: translateY(-10px);
	}
	.section-heading {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 40px;
	}
	.section-subheading {
		font-size: 1.2rem;
		color: #6c757d;
		margin-bottom: 60px;
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
