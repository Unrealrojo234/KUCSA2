<script>
	import { onMount, onDestroy } from 'svelte';
	import EmblaCarousel from 'embla-carousel';

	import { writable } from 'svelte/store';

	let accessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
	let gitHubApi = 'https://api.github.com/users';

	let users = [
		'Unrealrojo234',
		'WritersWeb',
		'batsonnoah58',
		'J-ohnP-aul',
		'OTIENO272',
		'DrewGalowayDev',
		'augustine-awuori'
	];

	let usersDetailsObject = writable([]);
	let fetchError = null;

	const fetchUsers = async () => {
		try {
			const responses = await Promise.all(
				users.map((user) =>
					fetch(`${gitHubApi}/${user}`, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
							Accept: 'application/vnd.github.v3+json'
						}
					})
				)
			);

			const data = await Promise.all(responses.map((res) => res.json()));
			usersDetailsObject.set(data);
		} catch (error) {
			fetchError = error.message;
		}
	};

	let embla;
	let viewport;
	let autoScroll;

	const startAutoScroll = () => {
		autoScroll = setInterval(() => {
			if (embla) embla.scrollNext();
		}, 3000);
	};

	const stopAutoScroll = () => {
		clearInterval(autoScroll);
	};

	onMount(() => {
		fetchUsers();

		if (viewport) {
			embla = EmblaCarousel(viewport, {
				loop: true,
				speed: 5
			});
			startAutoScroll();
		}

		viewport.addEventListener('mouseenter', stopAutoScroll);
		viewport.addEventListener('mouseleave', startAutoScroll);
	});

	onDestroy(() => {
		stopAutoScroll();
	});
</script>

<br />

<div class="embla">
	<div class="embla__viewport" bind:this={viewport}>
		<div class="embla__container">
			{#if fetchError}
				<p>Error: {fetchError}</p>
			{:else if $usersDetailsObject.length}
				{#each $usersDetailsObject as user, i}
					<div class="embla__slide" key={i}>
						<img loading="lazy" src={user.avatar_url} alt={user.login} />
						<h2 style="color:yellowgreen;">{user.login}</h2>
						<p>{user.bio}</p>
						<div id="buttons">
							<a href={user.html_url} target="_blank" rel="noopener noreferrer">
								<button class="btn-github">
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14C6.33325 13.8466 6.33325 13.4266 6.33325 12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733C9.66659 13.0666 9.66659 13.7866 9.66659 14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331V1.33331Z"
											fill="currentcolor"
										></path>
									</svg>
									<span>View on Github</span>
								</button>
							</a>
						</div>
					</div>
				{/each}
			{:else}
				<p>Loading...</p>
			{/if}
		</div>
	</div>
</div>

<style>
	#buttons {
		display: flex;
		justify-content: center;
	}
	a {
		text-decoration: none;
	}
	/* From Uiverse.io by Creatlydev */
	.btn-github {
		cursor: pointer;
		display: flex;
		gap: 0.5rem;
		border: none;

		transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
		border-radius: 100px;
		font-weight: 800;
		place-content: center;

		padding: 0.75rem 1rem;
		font-size: 0.825rem;
		line-height: 1rem;

		background-color: rgba(0, 0, 0, 0.4);
		box-shadow:
			inset 0 1px 0 0 rgba(255, 255, 255, 0.04),
			inset 0 0 0 1px rgba(255, 255, 255, 0.04);
		color: #fff;
	}

	.btn-github:hover {
		box-shadow:
			inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
			inset 0 0 0 1px rgba(252, 232, 3, 0.08);
		color: #fce803;
		transform: translate(0, -0.25rem);
		background-color: rgba(0, 0, 0, 0.5);
	}

	img {
		max-width: 8rem;
		border-radius: 50%;
	}
	.embla {
		overflow: hidden;
	}
	.embla__viewport {
		overflow: hidden;
		max-width: 48rem;
		display: block;
		margin: auto;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		min-width: 100%;
		padding: 1em;
		min-height: 22rem;
		border: 2px solid teal;
		text-align: center;
	}
</style>
