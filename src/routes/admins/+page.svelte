<script>
	import Attendace from './Attendace.svelte';
	import AllMembers from './AllMembers.svelte';
	import RegistRenewal from './Regist&Renewal.svelte';
	import UpComingEvents from './Events.svelte';
	import Events from './Events.svelte';

	let showAttendance = $state(false);

	let showMembers = $state(false);

	let showRegistrationRenewal = $state(false);

	const toggleShow = (show) => {
		switch (show) {
			case 'attendance':
				showAttendance = true;
				showMembers = false;
				showRegistrationRenewal = false;
				break;
			case 'members':
				showMembers = true;
				showAttendance = false;
				showRegistrationRenewal = false;
				break;
			case 'registationRenewal':
				showMembers = false;
				showAttendance = false;
				showRegistrationRenewal = true;
			default:
				break;
		}
	};
</script>

<main>
	<h1 class="text-center">KUCSA &nbsp;Admins Dashboard</h1>
	<div style="padding: 12px" class="mb-3 text-center">
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			href="#"
			onclick={() => {
				toggleShow('members');
			}}>Members</a
		>
		&nbsp;&nbsp;
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			href="#"
			onclick={() => {
				toggleShow('attendance');
			}}>Mark Attendance</a
		>

		&nbsp;&nbsp;
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			href="#"
			onclick={() => {
				toggleShow('registationRenewal');
			}}>Registration & Renewal</a
		>

		&nbsp;&nbsp;
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			href="#"
			onclick={() => {
				toggleShow('attendance');
			}}>Upcoming Events</a
		>

		&nbsp;&nbsp;
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			href="#"
			onclick={() => {
				toggleShow('attendance');
			}}>Configurations</a
		>
	</div>

	{#if showAttendance}
		<Attendace />
	{:else if showMembers}
		<AllMembers />
	{:else if showRegistrationRenewal}
		<RegistRenewal />
	{/if}
	<Events />
</main>

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
