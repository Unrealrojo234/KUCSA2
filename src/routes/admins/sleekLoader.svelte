<main>
	<div class="wrapper">
		<span class="letter letter1">L</span>
		<span class="letter letter2">o</span>
		<span class="letter letter3">a</span>
		<span class="letter letter4">d</span>
		<span class="letter letter5">i</span>
		<span class="letter letter6">n</span>
		<span class="letter letter7">g</span>
		<span class="letter letter8">.</span>
		<span class="letter letter9">.</span>
		<span class="letter letter10">.</span>
	</div>
</main>

<style>
	.wrapper {
		min-height: 3rem;
		min-width: 14rem;
		font-size: 2rem;
		position: relative;
		overflow: hidden;
		mask-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 1) 30%,
			rgba(0, 0, 0, 1) 70%,
			rgba(0, 0, 0, 0)
		);
		font-family: monospace;
	}

	.letter {
		width: 1ch;
		position: absolute;
		top: 50%;
		transform: translate(0px, -50%);
		left: 100%;
		animation:
			scroll 2.5s linear infinite,
			rainbow 2.5s infinite;
	}

	@keyframes scroll {
		to {
			left: -1ch;
		}
	}

	@keyframes rainbow {
		0% {
			color: white;
		}
		10% {
			color: #ff0000;
		}
		20% {
			color: #ff8700;
		}
		30% {
			color: #ffd300;
		}
		40% {
			color: #deff0a;
		}
		50% {
			color: #a1ff0a;
		}
		60% {
			color: #0aff99;
		}
		70% {
			color: #0aefff;
		}
		80% {
			color: #147df5;
		}
		90% {
			color: #580aff;
		}
		100% {
			color: #be0aff;
		}
	}

	.letter1 {
		animation-delay: calc(2.5s / 10 * (10 - 1) * -1);
	}
	.letter2 {
		animation-delay: calc(2.5s / 10 * (10 - 2) * -1);
	}
	.letter3 {
		animation-delay: calc(2.5s / 10 * (10 - 3) * -1);
	}
	.letter4 {
		animation-delay: calc(2.5s / 10 * (10 - 4) * -1);
	}
	.letter5 {
		animation-delay: calc(2.5s / 10 * (10 - 5) * -1);
	}
	.letter6 {
		animation-delay: calc(2.5s / 10 * (10 - 6) * -1);
	}
	.letter7 {
		animation-delay: calc(2.5s / 10 * (10 - 7) * -1);
	}
	.letter8 {
		animation-delay: calc(2.5s / 10 * (10 - 8) * -1);
	}
	.letter9 {
		animation-delay: calc(2.5s / 10 * (10 - 9) * -1);
	}
	.letter10 {
		animation-delay: calc(2.5s / 10 * (10 - 10) * -1);
	}
</style>
