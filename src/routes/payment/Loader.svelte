<main style="overflow-x: hidden">
	<!-- From Uiverse.io by adamgiebl -->
	<section class="dots-container">
		<div class="dot"></div>
		<div class="dot"></div>
		<div class="dot"></div>
		<div class="dot"></div>
		<div class="dot"></div>
	</section>
</main>

<style>
	/* From Uiverse.io by adamgiebl */
	.dots-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}

	.dot {
		height: 20px;
		width: 20px;
		margin-right: 10px;
		border-radius: 50%;
		background: linear-gradient(45deg, #4caf50, #8bc34a); /* Green gradient */
		animation: pulse 1.5s infinite ease-in-out;
		box-shadow: 0 0 10px rgba(76, 175, 80, 0.5); /* Green shadow */
	}

	.dot:last-child {
		margin-right: 0;
	}

	.dot:nth-child(1) {
		animation-delay: -0.3s;
	}

	.dot:nth-child(2) {
		animation-delay: -0.1s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.1s;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.8);
			background: linear-gradient(45deg, #4caf50, #8bc34a); /* Green gradient */
			box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.5); /* Green shadow */
		}

		50% {
			transform: scale(1.2);
			background: linear-gradient(45deg, #8bc34a, #4caf50); /* Green gradient */
			box-shadow: 0 0 20px rgba(76, 175, 80, 0.8); /* Green shadow */
		}

		100% {
			transform: scale(0.8);
			background: linear-gradient(45deg, #4caf50, #8bc34a); /* Green gradient */
			box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.5); /* Green shadow */
		}
	}

	section {
		position: absolute;
		top: -40%;
	}

	@media (max-width: 760px) {
		section {
			position: absolute;
			top: -32%;
		}
	}
</style>
