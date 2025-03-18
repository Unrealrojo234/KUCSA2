<script>
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';
	import { error } from '@sveltejs/kit';

	function showSuccessSignupAlert() {
		Swal.fire({
			title: 'Sign Up Successful!',
			text: 'Please verify your email',
			icon: 'success',
			background: '#1a1a1a', // Dark background
			color: '#ffffff', // White text
			timer: 3000,
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

	function showErrorSignupAlert(error) {
		Swal.fire({
			title: 'Sign Up Error!',
			text: error,
			icon: 'error',
			background: '#1a1a1a', // Dark background
			color: '#ffffff', // White text
			timer: 1500,
			showConfirmButton: false,
			confirmButtonColor: 'red',
			iconColor: 'red',
			customClass: {
				popup: 'custom-swal-popup',
				title: 'custom-swal-title',
				content: 'custom-swal-content',
				confirmButton: 'custom-swal-confirm-button'
			}
		});
	}

	let email = $state('');
	let password = $state('');
	let Confirmpassword = $state('');
	let regNumber = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let phoneNumber = $state('');

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
	const signUp = (e) => {
		e.preventDefault();

		if (password != Confirmpassword) {
			showErrorSignupAlert('Passwords do not match!');
		} else if (password.length < 6) {
			alerts('error', 'Password should be at least 6 characters');
		} else {
			let formData = {
				email: email,
				password: password,
				regNumber: regNumber.toUpperCase(),
				firstName: firstName,
				lastName: lastName,
				phoneNumber: phoneNumber
			};

			try {
				fetch('/auth/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						if (data.error) {
							if (data.error.includes('Registration number already exists')) {
								alerts('error', 'This Reg Number already exists');
							} else if (
								data.error.includes('For security purposes, you can only request this after ')
							) {
								alerts(
									'error',
									'For security purposes, you can only request this after 60 seconds.'
								);
							} else if (data.error.includes('Profile creation failed')) {
								alerts('error', 'Profile creation failed');
							} else {
								alerts('error', data.error);
							}
						} else {
							alerts('success', 'Please Confirm Your Email Address');
							setTimeout(() => {
								goto('/');
							}, 1500);
						}
					})
					.catch((error) => {
						alerts('error', error.message);
						console.error('Error', error);
					});
			} catch (error) {
				alerts('error', error.message);
				console.error('Error ', error);
			}
		}
	};
</script>

<main class="container-fluid mb-3">
	<form class="form form-control" onsubmit={signUp}>
		<p class="title">Register</p>
		<div class="flex">
			<label>
				<input bind:value={firstName} class="input" type="text" placeholder="" required="" />
				<span>Firstname</span>
			</label>

			<label>
				<input class="input" bind:value={lastName} type="text" placeholder="" required="" />
				<span>Lastname</span>
			</label>
		</div>

		<br />
		<div class="flex">
			<label>
				<input bind:value={phoneNumber} class="input" type="text" placeholder="" required="" />
				<span>Phone</span>
			</label>

			<label>
				<input class="input" bind:value={regNumber} type="text" placeholder="" required="" />
				<span>Reg no.</span>
			</label>
		</div>
		<br />
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
		<label>
			<input
				bind:value={Confirmpassword}
				class="input"
				type="password"
				placeholder=""
				required=""
			/>
			<span>Confirm password</span>
		</label>
		<br />
		<button type="submit" class="submit btn btn-success">Signup</button>
		<p class="signin">Already have an acount ? <a href="/auth/login">Signin</a></p>
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

	.signin {
		font-size: 14.5px;
		color: rgba(255, 255, 255, 0.7);
	}

	.signin {
		text-align: center;
	}
	.flex {
		display: flex;
		width: 100%;
		gap: 6px;
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
