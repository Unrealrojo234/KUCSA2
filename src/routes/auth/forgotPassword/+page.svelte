<script>
	let inputEmail = $state('');
	import { supabase } from '$lib/supabaseClient';
	import Swal from 'sweetalert2';

	const rootUrl = window.location.origin;

	async function handleForgotPassword(email) {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `kucsa.vercel.app/auth/forgotPassword/new-pass` // Redirect URL after password reset
		});

		if (error) {
			Swal.fire({
				title: 'Error Sending Reset Link!',
				icon: 'error',
				text: 'Please Try Again Later',
				draggable: true
			});
		} else {
			Swal.fire({
				title: 'Reset Link Sent!',
				icon: 'success',
				text: 'Check your email for the reset link',
				draggable: true
			});
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		handleForgotPassword(inputEmail);
	};
</script>

<main class="bg-dark">
	<div class="container bg-dark shadow">
		<!-- Forgot Password Form -->
		<div id="forgot-password-form">
			<h2>Forgot Password</h2>
			<form action="submit">
				<input
					required
					bind:value={inputEmail}
					type="email"
					id="email"
					placeholder="Enter your email"
				/>
				<button type="submit" onclick={handleSubmit}>Send Reset Link</button>
			</form>
			<div id="forgot-message" class="message"></div>
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
