<script>
	import Attendace from './Attendace.svelte';
	import AllMembers from './AllMembers.svelte';

	let showAttendance = $state(false);

	let showMembers = $state(false);

	const toggleShow = (show) => {
		switch (show) {
			case 'attendance':
				showAttendance = true;
				showMembers = false;
				break;
			case 'members':
				showMembers = true;
				showAttendance = false;
				break;
			default:
				break;
		}
	};
</script>

<main>
	<h1 class="text-center">KUCSA &nbsp;Admins Dashboard</h1>
	<div style="padding: 12px" class="mb-3">
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
	</div>

	{#if showAttendance}
		<Attendace />
	{:else if showMembers}
		<AllMembers />
	{/if}
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
