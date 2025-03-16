<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	let upcomingEvents = $state([]);

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
		// Fetch initial blogs
		const { data, error } = await supabase
			.from('upcomingEvents')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) console.error('Error fetching blogs:', error);
		else upcomingEvents = data;
	});
</script>

<div class="container-fluid px-lg-5 py-5">
	<div class="row justify-content-center mb-5">
		<div class="col-12 text-center">
			<h2 class="display-4 fw-bold mb-3">Upcoming <span class="text-primary">Events</span> 📅</h2>
			<p class="lead text-muted">Discover what's happening next in our community</p>
		</div>
	</div>

	<div class="row g-4 justify-content-center">
		{#await upcomingEvents}
			<div class="col-12 text-center">
				<div class="spinner-border text-primary" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
				<p class="mt-2 text-muted">Loading events...</p>
			</div>
		{:then events}
			{#if events.length > 0}
				{#each events as event}
					<div class="col-xl-3 col-lg-4 col-md-6">
						<div class="card bg-dark h-100 shadow-lg border-0 hover-shadow transition-all">
							{#if event.imageUrl}
								<div class="card-img-top overflow-hidden position-relative" style="height: 200px;">
									<img
										src={event.imageUrl}
										class="img-fluid w-100 h-100 object-fit-cover"
										alt={`${event.name} image`}
										loading="lazy"
									/>
								</div>
							{/if}

							<div class="card-body d-flex flex-column">
								<h3 class="h4 card-title fw-bold mb-3">{event.name}</h3>

								<div class="mb-3">
									<div class="d-flex align-items-center mb-2">
										<i class="bi bi-calendar-event me-2 text-primary"></i>
										<span class="text-muted">Date: {event.date}</span>
									</div>
									{#if event.venue}
										<div class="d-flex align-items-center">
											<i class="bi bi-geo-alt me-2 text-primary"></i>
											<span class="text-muted">Venue: {event.venue}</span>
										</div>
									{/if}
								</div>

								{#if event.link}
									<div class="mt-auto">
										<a
											href={event.link}
											target="_blank"
											class="btn btn-success w-100 d-flex align-items-center justify-content-center"
										>
											<i class="bi bi-link-45deg me-2"></i>
											Event Details
										</a>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="col-12 col-md-8 col-lg-6 text-center">
					<div class="alert alert-info shadow-sm">
						<i class="bi bi-calendar-x me-2"></i>
						No upcoming events scheduled. Check back soon!
					</div>
				</div>
			{/if}
		{/await}
	</div>
</div>

<style>
	.hover-shadow {
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.hover-shadow:hover {
		transform: translateY(-5px);
		box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1) !important;
	}

	.object-fit-cover {
		object-fit: cover;
	}

	.transition-all {
		transition: all 0.2s ease;
	}

	.card {
		border-radius: 1rem;
	}

	.card-img-top {
		border-radius: 1rem 1rem 0 0;
	}

	.alert {
		border-radius: 0.75rem;
	}
</style>
