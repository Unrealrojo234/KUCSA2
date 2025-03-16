<script>
	let isOpen = $state(false);
	import ToggleButton from './ToggleButton.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import getUid from '$lib/UID';

	// console.log(user);
	import handleLogout from '$lib/logout';
	import { onMount } from 'svelte';

	let isAdmin = $state(false);

	const navigateAndRefresh = async () => {
		await goto('/');
		window.location.reload();
	};

	async function logout() {
		try {
			const logoutSuccess = await handleLogout();
			if (logoutSuccess) {
				navigateAndRefresh();
			} else {
			}
		} catch (error) {
			// console.error('Logout failed:', error);
		}
	}

	// Function to toggle the drawer
	const toggleDrawer = () => {
		isOpen = !isOpen;
	};

	// Function to close the drawer
	const closeDrawer = () => {
		isOpen = false;
	};

	let session = $state(null);

	onMount(async () => {
		session = await getUid();

		if (session) {
			const uid = session;
			const { data, error } = await supabase.from('profiles').select('*').eq('id', uid);

			if (data[0].isAdmin) {
				isAdmin = true;
			}
		}
	});
</script>

<div style="position: absolute;right:1%;top:1%;z-index:100;position:fixed">
	<input onclick={toggleDrawer} checked={isOpen} type="checkbox" id="checkbox" />
	<label for="checkbox" class="toggle">
		<div class="bars" id="bar1"></div>
		<div class="bars" id="bar2"></div>
		<div class="bars" id="bar3"></div>
	</label>
</div>

<!-- Overlay to close the drawer when clicked -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<div class="overlay {isOpen ? 'open' : ''}" onclick={closeDrawer} />
<h1 style="position:fixed">KUCSA</h1>
<!-- Drawer Navigation -->
<div class="drawer {isOpen ? 'open' : ''}">
	<div class="drawer-content">
		<div style="position: absolute;right:4%;top:1%;">
			<input onclick={toggleDrawer} checked={isOpen} type="checkbox" id="checkbox" />
			<label for="checkbox" class="toggle">
				<div class="bars" id="bar1"></div>
				<div class="bars" id="bar2"></div>
				<div class="bars" id="bar3"></div>
			</label>
		</div>

		<h2>Navigation</h2>
		<ul>
			<li><a href="/" style="color:#00b492 ;">Home</a></li>
			<li><a href="/#about" style="color:#00b492 ;">About</a></li>
			{#if session}
				<li><a href="/profile" style="color:#00b492 ;">Profile</a></li>
				{#if isAdmin}
					<li><a href="/admins" style="color:#00b492 ;">Admin Dashboard</a></li>
				{/if}
				<li>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_missing_attribute -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a
						style="color:#00b492 ;"
						href="#"
						onclick={() => {
							logout();
						}}>Logout</a
					>
				</li>
			{:else}
				<li><a style="color:#00b492 ;" href="/auth/login">Login</a></li>
				<li><a style="color:#00b492 ;" href="/contact/auth/signup">Sign Up</a></li>
			{/if}
		</ul>
	</div>
</div>

<style>
	/* From Uiverse.io by vinodjangid07 */
	#checkbox {
		display: none;
	}

	li,
	a {
		color: #00b492;
	}

	.toggle {
		position: relative;
		width: 40px;
		height: 40px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		transition-duration: 0.5s;
	}

	.bars {
		width: 100%;
		height: 4px;
		background-color: #6ae600;
		border-radius: 4px;
	}

	#bar2 {
		transition-duration: 0.8s;
	}

	#bar1,
	#bar3 {
		width: 70%;
	}

	#checkbox:checked + .toggle .bars {
		position: absolute;
		transition-duration: 0.5s;
	}

	#checkbox:checked + .toggle #bar2 {
		transform: scaleX(0);
		transition-duration: 0.5s;
	}

	#checkbox:checked + .toggle #bar1 {
		width: 100%;
		transform: rotate(45deg);
		transition-duration: 0.5s;
	}

	#checkbox:checked + .toggle #bar3 {
		width: 100%;
		transform: rotate(-45deg);
		transition-duration: 0.5s;
	}

	#checkbox:checked + .toggle {
		transition-duration: 0.5s;
		transform: rotate(180deg);
	}

	/* Overlay styles */
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
		display: none;
	}

	.overlay.open {
		display: block;
	}

	/* Drawer styles */
	.drawer {
		position: fixed;
		top: 0;
		right: -300px; /* Start off-screen to the right */
		width: 300px;
		height: 100%;
		background: #222428;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1); /* Shadow on the left side */
		transition: right 0.3s ease; /* Animate the right property */
		z-index: 101;
	}

	.drawer.open {
		right: 0; /* Slide in from the right */
	}

	/* Drawer content styles */
	.drawer-content {
		padding: 20px;
	}

	.drawer-content h2 {
		margin-top: 0;
	}

	.drawer-content ul {
		list-style: none;
		padding: 0;
	}

	.drawer-content ul li {
		margin: 15px 0;
	}

	.drawer-content ul li a {
		text-decoration: none;
		color: #333;
		font-size: 18px;
	}
</style>
