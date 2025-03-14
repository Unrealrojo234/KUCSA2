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

		console.log(data);
	});
</script>

<div class="container text-center py-5">
	<h2 class="mb-4 display-4 fw-bold">Upcoming <span class="highlight">Events</span> 🤓</h2>
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
									<a href={event.link} target="_blank" class="btn btn-primary cta-button"> View </a>
								{/if}
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
