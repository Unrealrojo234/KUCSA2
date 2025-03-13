<script>
	import { onDestroy } from 'svelte';
	import Swal from 'sweetalert2';
	import Loader from '../Loader.svelte';
	import insertData from '$lib/insertData';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let phone = $state('');
	let amount = $state(50);
	let transStatus = $state('');
	let processing = $state(false);
	let intervalId = $state(null);

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

	const checkStatus = async (reference) => {
		try {
			const response = await fetch('/payment/status', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ reference })
			});

			const data = await response.json();
			console.log(data);

			transStatus = data.data.status;

			if (transStatus !== 'ongoing') {
				processing = false;
				console.table({ status: transStatus, finished: true });
				if (transStatus == 'success') {
					insertData('renewed');
					alerts('success', transStatus);
					setTimeout(() => {
						goto('/profile');
					}, 1500);
				} else {
					alerts('error', transStatus);
				}
				clearInterval(intervalId); // Stop the interval
			}
		} catch (error) {
			console.error('Error:', error);
			processing = false;
			clearInterval(intervalId); // Stop the interval on error
		}
	};

	const startStatusCheck = (reference) => {
		processing = true;
		intervalId = setInterval(() => checkStatus(reference), 1000); // Check every second
	};

	const pay = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('/payment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ phone, amount })
			});

			const data = await response.json();
			console.log(data);

			if (data.data?.reference) {
				startStatusCheck(data.data.reference); // Start checking status
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	// Cleanup interval on component destruction
	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
</script>

<main class="mt-2 container-fluid">
	{#if processing}
		<Loader />
	{/if}
	<h1 class="text-center text-gradient">KUCSA RENEWAL</h1>
	<br /><br />
	<form class="form-control mt-5" onsubmit={pay}>
		<label for="phone" class="form-label"
			>Mobile Number <span style="color: teal;">(M-PESA)</span></label
		>
		<input
			required
			name="phone"
			bind:value={phone}
			type="text"
			placeholder="+2547XXXXXXXXX"
			class="form-control input-glass"
		/>
		<br />
		<label for="amount" class="form-label">Amount (Ksh)</label>
		<input
			type="number"
			name="amount"
			bind:value={amount}
			required
			disabled
			placeholder="100"
			class="form-control input-glass"
		/>
		<br />
		<div class="text-center">
			<button class="btn btn-gradient" type="submit" disabled={processing}>
				{processing ? 'Processing...' : 'Initiate Pay'}
			</button>
		</div>
	</form>

	{#if transStatus}
		<div class="mt-3 text-center">
			<p>Transaction Status: <strong class="status-text">{transStatus}</strong></p>
		</div>
	{/if}
</main>

<style>
	/* :global(body) {
		background-color: #1e1e2f;
		color: #ffffff;
		font-family: 'Arial', sans-serif;
		overflow-x: hidden;
	} */

	form {
		max-width: 32rem;
		display: block;
		margin: auto;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 15px;
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.input-glass {
		background: rgba(255, 255, 255, 0.1);
		border: none;
		color: #ffffff;
		padding: 0.75rem;
		border-radius: 10px;
	}

	.input-glass:focus {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.input-glass::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.btn-gradient {
		background: linear-gradient(45deg, teal, #11cb8d, #04ce47, lime);
		border: none;
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 25px;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.btn-gradient:hover {
		background: linear-gradient(45deg, #11cb8d, #04ce47);
	}

	.text-gradient {
		background: linear-gradient(45deg, #04ce47, #11cb8d);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		font-size: 2.5rem;
		font-weight: bold;
	}

	.status-text {
		color: #4caf50;
		font-weight: bold;
	}

	.form-label {
		color: #ffffff;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
</style>
