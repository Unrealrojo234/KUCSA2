<script>
	import Attendace from './Attendace.svelte';
	import AllMembers from './AllMembers.svelte';
	import RegistRenewal from './Regist&Renewal.svelte';
	import UpComingEvents from './Events.svelte';
	import Events from './Events.svelte';
	import UpcomingEvents from '../UpcomingEvents.svelte';
	import Landing from './Landing.svelte';
	import OffCanvas from '../OffCanvas.svelte';

	let showAttendance = $state(false);

	let showMembers = $state(false);

	let showRegistrationRenewal = $state(false);

	let showUpcomingEvents = $state(false);

	let showStats = $state(true);

	const { data } = $props();

	const toggleShow = (show) => {
		switch (show) {
			case 'attendance':
				showAttendance = true;
				showMembers = false;
				showRegistrationRenewal = false;
				showUpcomingEvents = false;
				showStats = false;
				break;
			case 'members':
				showMembers = true;
				showAttendance = false;
				showRegistrationRenewal = false;
				showUpcomingEvents = false;
				showStats = false;
				break;
			case 'registationRenewal':
				showMembers = false;
				showAttendance = false;
				showRegistrationRenewal = true;
				showUpcomingEvents = false;
				showStats = false;
				break;
			case 'upcomingEvents':
				showMembers = false;
				showAttendance = false;
				showRegistrationRenewal = false;
				showUpcomingEvents = true;
				showStats = false;
				break;
			case 'stats':
				showMembers = false;
				showAttendance = false;
				showRegistrationRenewal = false;
				showUpcomingEvents = false;
				showStats = true;
				break;
			default:
				break;
		}
	};
</script>

<OffCanvas />
{#await data}
	<p>Loading</p>
{:then}
	{#if data.admin}
		<main>
			<h1 class="text-center">KUCSA &nbsp;Admins Dashboard</h1>
			<div style="padding: 12px" class="mb-3 text-center">
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a
					style="color: {showMembers ? '#09ffd2' : '#00b492'};text-decoration:{showMembers
						? 'underline'
						: 'none'};"
					href="#"
					onclick={() => {
						toggleShow('members');
					}}>Members</a
				>
				&nbsp;&nbsp;
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a
					style="color: {showAttendance ? '#09ffd2' : '#00b492'};text-decoration:{showAttendance
						? 'underline'
						: 'none'};"
					href="#"
					onclick={() => {
						toggleShow('attendance');
					}}>Mark Attendance</a
				>

				&nbsp;&nbsp;
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a
					href="#"
					style="color: {showRegistrationRenewal
						? '#09ffd2'
						: '#00b492'};text-decoration:{showRegistrationRenewal ? 'underline' : 'none'};"
					onclick={() => {
						toggleShow('registationRenewal');
					}}>Registration & Renewal</a
				>

				&nbsp;&nbsp;
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a
					href="#"
					style="color: {showUpcomingEvents
						? '#09ffd2'
						: '#00b492'};text-decoration:{showUpcomingEvents ? 'underline' : 'none'};"
					onclick={() => {
						toggleShow('upcomingEvents');
					}}>Upcoming Events</a
				>

				&nbsp;&nbsp;
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a
					href="#"
					style="color: {showStats ? '#09ffd2' : '#00b492'};text-decoration:{showStats
						? 'underline'
						: 'none'};"
					onclick={() => {
						toggleShow('stats');
					}}>Statistics</a
				>
			</div>

			{#if showAttendance}
				<Attendace />
			{:else if showMembers}
				<AllMembers />
			{:else if showRegistrationRenewal}
				<RegistRenewal />
			{:else if showUpcomingEvents}
				<Events />
			{:else if showStats}
				<Landing />
			{/if}
		</main>
	{:else}
		<div>
			<p>You are not an admin</p>
		</div>
	{/if}
{/await}

<style>
	a {
		text-decoration: none;
		color: #00b492;
		font-size: 1rem;
	}

	a:hover {
		color: #09ffd2;
	}
</style>
