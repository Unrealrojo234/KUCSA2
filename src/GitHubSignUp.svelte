<script>
	import { supabase } from '$lib/supabaseClient';
	import Swal from 'sweetalert2';

	const handleGitHubLogin = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github'
		});

		if (error) {
			console.error('Error logging in with GitHub:', error.message);
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

			console.log('Logged in with GitHub:', data);
		}
	};
</script>

<main>
	<!-- From Uiverse.io by Yaya12085 -->
	<button class="button" onclick={handleGitHubLogin}>
		<svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g
				stroke-linejoin="round"
				stroke-linecap="round"
				id="SVGRepo_tracerCarrier"
			></g><g id="SVGRepo_iconCarrier">
				<title>github</title> <rect fill="none" height="24" width="24"></rect>
				<path
					d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"
				></path>
			</g></svg
		>
		Continue with Github
	</button>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 2rem;
	}
	.button {
		display: flex;
		background-color: rgb(24, 23, 23);
		color: #ffffff;
		padding: 0.5rem 1.4rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 700;
		text-align: center;
		vertical-align: middle;
		align-items: center;
		border-radius: 0.5rem;
		gap: 0.75rem;
		border: none;
		cursor: pointer;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: 0.6s ease;
	}

	.button svg {
		height: 30px;
	}

	.button:hover {
		box-shadow: none;
	}

	button:hover {
		transform: scale(1.02);
	}
</style>
