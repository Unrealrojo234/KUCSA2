<script>
	import { supabase } from '$lib/supabaseClient';
	import Swal from 'sweetalert2';

	const handleGoogleLogin = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});

		if (error) {
			console.error('Error logging in with Google:', error.message);
			Swal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		} else {
			// Swal.fire({
			// 	title: 'Successs!',
			// 	text: 'Successful login with google',
			// 	icon: 'success',
			// 	confirmButtonText: 'Ok'
			// });

			async () => {
				const session = await supabase.auth.session();
				if (session) {
					try {
						localStorage.setItem('sb-auth-token', JSON.stringify(session));
						console.log('Auth Session Stored in localstorage ');
					} catch (error) {
						console.log(error);
					}
				}
			};

			console.log('Logged in with Google:', data);
		}
	};
</script>

<main>
	<!-- From Uiverse.io by Yaya12085 -->
	<button onclick={handleGoogleLogin} class="button">
		<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
			<path
				fill="#4285F4"
				d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
			></path>
			<path
				fill="#34A853"
				d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
			></path>
			<path
				fill="#FBBC05"
				d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
			></path>
			<path
				fill="#EB4335"
				d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
			></path>
		</svg>
		Continue with Google
	</button>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 2rem;
	}
	button {
		max-width: 320px;
		display: flex;
		padding: 0.5rem 1.4rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
		vertical-align: middle;
		align-items: center;
		border-radius: 0.5rem;
		border: 1px solid rgba(0, 0, 0, 0.25);
		gap: 0.75rem;
		color: rgb(65, 63, 63);
		background-color: #fff;
		cursor: pointer;
		transition: all 0.6s ease;
	}

	.button svg {
		height: 24px;
	}

	button:hover {
		transform: scale(1.02);
	}
</style>
