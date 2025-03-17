<script>
	import Swal from 'sweetalert2';
	let password = $state(null);
	let confirmedPassword = $state(null);
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	async function handleResetPassword(newPassword) {
		const { data, error } = await supabase.auth.updateUser({
			password: newPassword
		});

		if (error) {
			console.error('Error resetting password:', error.message);
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: 'Oops!',
				text: error.message,
				showConfirmButton: false,
				timer: 2000
			});
		} else {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Password has been reset successfully',
				showConfirmButton: false,
				timer: 1500
			});

			setTimeout(() => {
				goto('/auth/login');
			}, 2000);
		}
	}

	const handlePassword = (e) => {
		e.preventDefault();

		if (password != confirmedPassword) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: 'Passwords do not match',
				showConfirmButton: false,
				timer: 2000
			});

			password = '';
			confirmedPassword = '';
		} else {
			if (password.length < 6) {
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: 'Passwords is too short',
					text: 'Password must be at least 6 characters',
					showConfirmButton: false,
					timer: 2000
				});

				password = '';
				confirmedPassword = '';
			} else {
				handleResetPassword(password);
			}
		}
	};
</script>

<main class="bg-dark">
	<div class="container bg-dark shadow">
		<!-- Forgot Password Form -->
		<div id="forgot-password-form">
			<h2>New Password</h2>
			<form action="">
				<input
					type="password"
					bind:value={password}
					class="form-control"
					required
					placeholder="Enter Password"
					min="6"
				/>
				<br />
				<input
					required
					bind:value={confirmedPassword}
					type="password"
					class="form-control"
					placeholder="Confirm Password"
					min="6"
				/>
				<br />
				<button type="submit" onclick={handlePassword} class="btn">Reset</button>
				<div id="forgot-message" class="message"></div>
			</form>
		</div>
	</div>
</main>

<style>
	/* General Styling */
	main {
		font-family: Arial, sans-serif;
		background-color: #f0f8ff; /* Light blue background */
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
	}

	.container {
		background-color: #ffffff; /* White background for forms */
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 400px;
		text-align: center;
	}

	h2 {
		color: #007bff; /* Blue heading */
		margin-bottom: 1.5rem;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		margin-bottom: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;
		box-sizing: border-box;
	}

	input:focus {
		border-color: #007bff; /* Blue border on focus */
		outline: none;
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background-color: #007bff; /* Blue button */
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #0056b3; /* Darker blue on hover */
	}
</style>
