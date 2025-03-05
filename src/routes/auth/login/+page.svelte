<script>
	let email = $state('');
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';

	function showSuccessLoginAlert() {
		Swal.fire({
			title: 'Login Successful!',
			text: 'You have successfully logged in.',
			icon: 'success',
			background: '#1a1a1a', // Dark background
			color: '#ffffff', // White text
			timer: 1500,
			confirmButtonColor: '#39FF14', // Neon green confirm button
			iconColor: '#39FF14', // Neon green icon
			customClass: {
				popup: 'custom-swal-popup', // Optional: Add custom class for further styling
				title: 'custom-swal-title',
				content: 'custom-swal-content',
				confirmButton: 'custom-swal-confirm-button'
			},
			showConfirmButton: false
		});
	}

	function showErrorLoginAlert() {
		Swal.fire({
			title: 'Login Error!',
			text: 'You have entered invalid credentials',
			icon: 'error',
			background: '#1a1a1a', // Dark background
			color: '#ffffff', // White text
			timer: 1500,
			showConfirmButton: false,
			confirmButtonColor: 'red', // Neon green confirm button
			iconColor: 'red', // Neon green icon
			customClass: {
				popup: 'custom-swal-popup', // Optional: Add custom class for further styling
				title: 'custom-swal-title',
				content: 'custom-swal-content',
				confirmButton: 'custom-swal-confirm-button'
			}
		});
	}

	let password = $state('');

	function login(e) {
		e.preventDefault();

		let data = { email: email, password: password };

		fetch('/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then((data) => {
				try {
					if (data.user.role == 'authenticated') {
						showSuccessLoginAlert();

						setTimeout(() => {
							goto('/');
						}, 2500);
					}
				} catch (error) {
					showErrorLoginAlert();
				}

				console.log(data);
			})
			.catch((error) => console.error('Error ', error));
	}
</script>

<main>
	<!-- From Uiverse.io by ammarsaa -->
	<form onsubmit={login} class="form form-control">
		<p class="title">Login</p>

		<label>
			<input bind:value={email} class="input" type="email" placeholder="" required="" />
			<span>Email</span>
		</label>
		<br />

		<label>
			<input bind:value={password} class="input" type="password" placeholder="" required="" />
			<span>Password</span>
		</label>
		<br />

		<button class="submit">Login</button>
		<p class="signin">Don't have an acount ? <a href="/auth/signup">Signup</a></p>
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
		color: #7bff00;
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
		background-color: #6ae600;
	}

	.signin {
		font-size: 14.5px;
		color: rgba(255, 255, 255, 0.7);
	}

	.signin {
		text-align: center;
	}

	.signin a:hover {
		text-decoration: underline #6ae600;
	}

	.signin a {
		color: #6ae600;
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
		color: #6ae600;
		top: 0px;
		font-size: 0.7em;
		font-weight: 600;
	}

	.input {
		font-size: medium;
	}

	.submit {
		border: none;
		outline: none;
		padding: 10px;
		border-radius: 10px;
		color: #fff;
		font-size: 16px;
		transform: 0.3s ease;
		background-color: #88fd21a9;
	}

	.submit:hover {
		background-color: #6ae600;
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
