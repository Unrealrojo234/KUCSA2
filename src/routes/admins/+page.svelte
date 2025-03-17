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
	<div class="loading-spinner">
		<div class="spinner"></div>
	</div>
{:then}
	{#if data.admin}
		<main class="dashboard-container">
			<h1 class="dashboard-title">KUCSA Admins Dashboard</h1>

			<nav class="dashboard-nav">
				<button class="nav-link" class:active={showMembers} onclick={() => toggleShow('members')}>
					Members
				</button>
				<button
					class="nav-link"
					class:active={showAttendance}
					onclick={() => toggleShow('attendance')}
				>
					Mark Attendance
				</button>
				<button
					class="nav-link"
					class:active={showRegistrationRenewal}
					onclick={() => toggleShow('registationRenewal')}
				>
					Registration & Renewal
				</button>
				<button
					class="nav-link"
					class:active={showUpcomingEvents}
					onclick={() => toggleShow('upcomingEvents')}
				>
					Upcoming Events
				</button>
				<button class="nav-link" class:active={showStats} onclick={() => toggleShow('stats')}>
					Statistics
				</button>
			</nav>

			<div class="content-container bg-dark">
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
			</div>
		</main>
	{:else}
		<div class="unauthorized">
			<svg aria-hidden="true" class="icon"><use href="#icon-lock" /></svg>
			<p>You don't have administrator privileges</p>
		</div>
	{/if}
{/await}

<style>
	.dashboard-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 1rem;
	}

	.dashboard-title {
		color: #00b492;
		font-size: clamp(1.5rem, 3vw, 2.5rem);
		margin: 2rem 0;
		text-align: center;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
	}

	.dashboard-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 2rem;
		padding: 1rem 0;
		background: rgba(0, 180, 146, 0.05);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.nav-link {
		padding: 0.75rem 1.5rem;
		border: none;
		background: none;
		color: #00b492;
		font-size: 1rem;
		font-weight: 500;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
	}

	.nav-link:hover {
		color: #09ffd2;
		background: rgba(9, 255, 210, 0.1);
		transform: translateY(-1px);
	}

	.nav-link.active {
		color: #09ffd2;
		background: rgba(9, 255, 210, 0.15);
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 50%;
		transform: translateX(-50%);
		width: 60%;
		height: 2px;
		background: #09ffd2;
		border-radius: 2px;
	}

	.content-container {
		padding: 2rem;
		background: white;
		border-radius: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}

	.loading-spinner {
		display: flex;
		justify-content: center;
		padding: 4rem;
	}

	.spinner {
		width: 3rem;
		height: 3rem;
		border: 4px solid #00b492;
		border-top-color: transparent;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	.unauthorized {
		text-align: center;
		padding: 4rem;
		color: #ff4444;
	}

	.unauthorized .icon {
		width: 4rem;
		height: 4rem;
		margin-bottom: 1rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 768px) {
		.dashboard-nav {
			gap: 0.5rem;
			padding: 0.5rem;
		}

		.nav-link {
			padding: 0.5rem 1rem;
			font-size: 0.9rem;
		}

		.content-container {
			padding: 1rem;
			margin: 0 -1rem;
			border-radius: 0;
			box-shadow: none;
		}
	}
</style>
