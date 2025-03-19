<script>
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';
	import { error } from '@sveltejs/kit';
	import { supabase } from '$lib/supabaseClient';
	import getUid from '$lib/UID';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let regNumber = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let phoneNumber = $state('');

	//Redirects user if there is no session
	onMount(async () => {
		try {
			let uid = await getUid();
			if (!uid) {
				goto('/');
			}
		} catch (error) {
			goto('/');
		}
	});

	const alerts = (icon, title) => {
		Swal.fire({
			icon: icon,
			title: title,
			showConfirmButton: false,
			timer: 3500,
			background: '#1e1e2f',
			color: '#ffffff',
			iconColor: icon === 'success' ? '#4caf50' : '#f44336'
		});
	};
	//Posting user data
	const createProfile = async (e) => {
		e.preventDefault();

		const uid = await getUid();

		let formData = {
			regNumber: regNumber.toUpperCase(),
			firstName: firstName,
			lastName: lastName,
			phoneNumber: phoneNumber
		};

		try {
			const { data: profileData, error: profileError } = await supabase
				.from('profiles')
				.insert([
					{
						id: uid,
						reg_number: regNumber,
						first_name: firstName,
						last_name: lastName,
						phone_number: phoneNumber
					}
				])
				.select()
				.single(); // Ensure single record response

			if (profileError) {
				console.error('Profile Insert Error:', {
					code: profileError.code,
					details: profileError.details,
					hint: profileError.hint
				});

				alerts('error', profileError.details);
			} else {
				alerts('success', 'Profile Created Successfully');
				console.log('Profile Created Successfully');

				setTimeout(async () => {
					await goto('/profile');

					window.location.reload();
				}, 2500);
			}
		} catch (error) {
			alerts('error', 'Internal Server Error');
			console.log('Error', error);
		}
	};
</script>

<main class="container-fluid mb-3">
	<form class="form form-control" onsubmit={createProfile}>
		<p class="title">Create Profile</p>
		<label>
			<input bind:value={firstName} class="input" type="text" placeholder="" required="" />
			<span>Firstname</span>
		</label>
		<br />
		<label>
			<input class="input" bind:value={lastName} type="text" placeholder="" required="" />
			<span>Lastname</span>
		</label>

		<br />
		<label>
			<input bind:value={phoneNumber} class="input" type="text" placeholder="" required="" />
			<span>Phone</span>
		</label>
		<br />
		<label>
			<input class="input" bind:value={regNumber} type="text" placeholder="" required="" />
			<span>Reg no.</span>
		</label>
		<br />
		<button type="submit" class="submit btn btn-success">Create</button>
	</form>
</main>

<style>
	/* From Uiverse.io by ammarsaa */

	main {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 8rem;
	}

	@media (max-width: 769px) {
		main {
			padding-top: 1rem;
		}
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
