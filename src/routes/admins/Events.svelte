<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import Swal from 'sweetalert2';

	let upcomingEvents = $state([]);

	let date = $state(null);
	let name = $state(null);
	let link = $state(null);
	let venue = $state(null);
	let imageUrl = $state(null);

	const alerts = (icon, title) => {
		Swal.fire({
			icon: icon,
			title: title,
			showConfirmButton: false,
			timer: 2000,
			background: '#1e1e2f',
			color: '#ffffff',
			iconColor: icon === 'success' ? '#4caf50' : '#f44336'
		});
	};

	onMount(() => {
		// Subscribe to realtime changes for the 'upcomingEvents' table
		const subscription = supabase
			.channel('public:upcomingEvents') // Channel name
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'upcomingEvents' },
				(payload) => {
					// Handle new upcomingEvents
					upcomingEvents = [...upcomingEvents, payload.new];
				}
			)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'upcomingEvents' },
				(payload) => {
					// Handle update
					upcomingEvents = upcomingEvents.map((comment) =>
						comment.id === payload.new.id ? payload.new : comment
					);
				}
			)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'upcomingEvents' },
				(payload) => {
					// Handle deleted comment
					upcomingEvents = upcomingEvents.filter((comment) => comment.id !== payload.old.id);
				}
			)
			.subscribe();

		// Cleanup subscription on component unmount
		return () => {
			supabase.removeChannel(subscription);
		};
	});

	$effect(async () => {
		const { data, error } = await supabase
			.from('upcomingEvents')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) console.error('Error fetching blogs:', error);
		else upcomingEvents = data;
		console, console.log(data);
	});

	async function Delete(id) {
		const { error } = await supabase.from('upcomingEvents').delete().eq('id', id);

		if (error) alerts('error', error);
		else {
			const { data, error } = await supabase
				.from('upcomingEvents')
				.select('*')
				.order('created_at', { ascending: false });

			if (error) console.error('Error fetching blogs:', error);
			else upcomingEvents = data;
			console, console.log(data);
			alerts('success', 'Post Deleted Successfully');
		}
	}

	async function PostEvent(e) {
		e.preventDefault();

		let event = {
			name: name,
			date: date,
			imageUrl: imageUrl,
			link: link,
			venue: venue
		};

		try {
			fetch('/database/insertion/upcomingEvents', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ event: event })
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.status == 'error') {
						alerts('error', data.reason);
					}
				})
				.catch((error) => {
					console.log('Error ', error);
					alerts('error', 'An error occurred!');
				});
		} catch (error) {
			console.log('Error ', error);
			alerts('error', 'Internal Server Error');
		}
	}
</script>

<main>
	<h2 class="text-center">Upcoming Events</h2>

	<div class="container text-center py-5">
		<div class="row justify-content-center">
			{#await upcomingEvents}
				<p class="mt-2">Loading events...</p>
			{:then events}
				{#if events.length > 0}
					{#each events as event}
						<div class="col-md-4 mb-4" style="max-width: 20rem;">
							<div class=" icon-card card h-100 shadow-sm border-0">
								<div class="card-body">
									<h3 class="card-title fw-bold">{event.name}</h3>
									<img
										src={event.imageUrl}
										class="img-fluid rounded-3 mt-2 mb-3"
										alt={`${event.name} image`}
										loading="lazy"
									/>
									<p class="card-text text-muted">Date: {event.date}</p>
									{#if event.link}
										<a href={event.link} target="_blank" class="btn btn-primary cta-button">
											View
										</a>
									{/if}
									{#if event.venue}
										<p>Venue: {event.venue}</p>
									{/if}
									<button
										class="btn btn-danger p-2 w-100 mt-4"
										onclick={async () => {
											await Delete(event.id);
										}}>Delete</button
									>
								</div>
							</div>
						</div>
					{/each}
				{:else}
					<!-- Fallback for no events -->
					<div class="col-12">
						<p class="text-muted">No upcoming events at the moment. Check back later!</p>
					</div>
				{/if}
			{/await}
		</div>
	</div>

	<div style="display: flex;justify-content:center;">
		<!-- svelte-ignore event_directive_deprecated -->
		<form class="form form-control" onsubmit={PostEvent}>
			<p class="title">Post Events</p>

			<label>
				<input bind:value={name} class="input" type="text" placeholder="" required />
				<span>Name <span class="text-danger">*</span></span>
			</label>
			<br />

			<label>
				<input class="input" bind:value={date} type="date" placeholder="" required />
				<span>Date <span class="text-danger">*</span></span>
			</label>
			<br />

			<label>
				<input class="input" bind:value={venue} type="text" placeholder="" />
				<span>Venue</span>
			</label>
			<br />

			<label>
				<input class="input" type="text" bind:value={imageUrl} placeholder="" />
				<span>ImageUrl</span>
			</label>
			<br />

			<label>
				<input class="input" type="text" bind:value={link} placeholder="" />
				<span>Event Link</span>
			</label>
			<br />

			<button class="submit btn btn-success">Post</button>
		</form>
	</div>
</main>

<style>
	img {
		border-radius: 50% !important;
		width: 8rem !important;
		height: 8rem !important;
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 32rem;
		padding: 1.5rem;
		border-radius: 20px;
		position: relative;
		background-color: #1a1a1a;
		color: #fff;
		border: 1px solid #333;
	}

	.title {
		font-size: 28px;
		font-weight: 600;
		letter-spacing: -1px;
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 30px;
		color: #00b492;
	}

	.title::before {
		width: 18px;
		height: 18px;
	}

	.title::after {
		width: 18px;
		height: 18px;
		animation: pulse 1s linear infinite;
	}

	.title::before,
	.title::after {
		position: absolute;
		content: '';
		height: 16px;
		width: 16px;
		border-radius: 50%;
		left: 0px;
		background-color: #00b492;
	}

	.form label {
		position: relative;
	}

	.form label .input {
		background-color: #333;
		color: #fff;
		width: 100%;
		padding: 20px 05px 05px 10px;
		outline: 0;
		border: 1px solid rgba(105, 105, 105, 0.397);
		border-radius: 10px;
	}

	.form label .input + span {
		color: rgba(255, 255, 255, 0.5);
		position: absolute;
		left: 10px;
		top: 0px;
		font-size: 0.9em;
		cursor: text;
		transition: 0.3s ease;
	}

	.form label .input:placeholder-shown + span {
		top: 12.5px;
		font-size: 0.9em;
	}

	.form label .input:focus + span,
	.form label .input:valid + span {
		color: #00b492;
		top: 0px;
		font-size: 0.7em;
		font-weight: 600;
	}

	.input {
		font-size: medium;
	}

	@keyframes pulse {
		from {
			transform: scale(0.9);
			opacity: 1;
		}

		to {
			transform: scale(1.8);
			opacity: 0;
		}
	}
</style>
