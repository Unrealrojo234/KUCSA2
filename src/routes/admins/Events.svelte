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

<main class="container-fluid px-4 py-5">
	<h2 class="text-center mb-5 display-4 fw-bold">Upcoming Events Management</h2>

	<!-- Events Grid -->
	<section class="mb-5">
		<h3 class="mb-4 text-center">Current Events</h3>
		<div class="container">
			<div class="row g-4 justify-content-center">
				{#await upcomingEvents}
					<div class="col-12 text-center">
						<div class="spinner-border text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				{:then events}
					{#if events.length > 0}
						{#each events as event}
							<div class="col-lg-4 col-md-6">
								<div class="card h-100 shadow-lg border-0">
									{#if event.imageUrl}
										<img
											src={event.imageUrl}
											class="card-img-top object-fit-cover"
											alt={event.name}
											style="height: 200px;"
											loading="lazy"
										/>
									{/if}
									<div class="card-body d-flex flex-column">
										<h4 class="card-title mb-3">{event.name}</h4>
										<div class="mb-2">
											<i class="bi bi-calendar me-2"></i>
											{new Date(event.date).toLocaleDateString()}
										</div>
										{#if event.venue}
											<div class="mb-2">
												<i class="bi bi-geo-alt me-2"></i>
												{event.venue}
											</div>
										{/if}
										<div class="mt-auto">
											{#if event.link}
												<a
													href={event.link}
													class="btn btn-outline-primary w-100 mb-2"
													target="_blank"
												>
													Event Details
												</a>
											{/if}
											<button
												class="btn btn-danger w-100"
												onclick={async () => await Delete(event.id)}
											>
												Delete Event
											</button>
										</div>
									</div>
								</div>
							</div>
						{/each}
					{:else}
						<div class="col-12">
							<div class="alert alert-info text-center">
								No upcoming events scheduled. Check back later!
							</div>
						</div>
					{/if}
				{/await}
			</div>
		</div>
	</section>

	<!-- Event Creation Form -->
	<section class="my-5">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<div class="card shadow border-0">
						<div class="card-header bg-dark text-white">
							<h3 class="mb-0">Create New Event</h3>
						</div>
						<div class="card-body">
							<form onsubmit={PostEvent} class="needs-validation" novalidate>
								<div class="row g-3">
									<div class="col-md-12">
										<!-- svelte-ignore a11y_label_has_associated_control -->
										<label class="form-label">Event Name *</label>
										<input bind:value={name} class="form-control" type="text" required />
									</div>

									<div class="col-md-6">
										<!-- svelte-ignore a11y_label_has_associated_control -->
										<label class="form-label">Event Date *</label>
										<input bind:value={date} class="form-control" type="date" required />
									</div>

									<!-- svelte-ignore a11y_label_has_associated_control -->
									<div class="col-md-6">
										<label class="form-label">Venue</label>
										<input bind:value={venue} class="form-control" type="text" />
									</div>

									<div class="col-12">
										<!-- svelte-ignore a11y_label_has_associated_control -->
										<label class="form-label">Image URL</label>
										<input
											bind:value={imageUrl}
											class="form-control"
											type="url"
											placeholder="https://example.com/image.jpg"
										/>
									</div>

									<div class="col-12">
										<!-- svelte-ignore a11y_label_has_associated_control -->
										<label class="form-label">Event Link</label>
										<input
											bind:value={link}
											class="form-control"
											type="url"
											placeholder="https://example.com"
										/>
									</div>

									<div class="col-12 mt-4">
										<button class="btn btn-success w-100 py-2" type="submit">
											Publish Event
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	/* Base styles */
	.card {
		border-radius: 1rem;
		transition: transform 0.2s;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	.form-control {
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
	}

	.btn {
		border-radius: 0.5rem;
		font-weight: 500;
	}

	/* Image handling */
	.object-fit-cover {
		object-fit: cover;
		border-radius: 1rem 1rem 0 0;
	}

	/* Form validation */
	.needs-validation .form-control:invalid {
		border-color: #dc3545;
	}

	.needs-validation .form-control:invalid:focus {
		box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
	}

	/* Dark mode compatibility */
	@media (prefers-color-scheme: dark) {
		.card {
			background-color: #2d2d2d;
			border-color: #404040;
		}

		.form-control {
			background-color: #1a1a1a;
			border-color: #404040;
			color: #ffffff;
		}
	}
</style>
