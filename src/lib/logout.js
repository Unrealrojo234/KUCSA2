import { goto } from '$app/navigation'; // For redirecting after logout
import Swal from 'sweetalert2';
import { supabase } from './supabaseClient';

const handleLogout = async () => {
	const logout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error('Error logging out:', error.message);
			Swal.fire({
				title: 'Logout Failed',
				text: error.message,
				icon: 'error',
				background: '#1a1a1a',
				color: 'whitesmoke',
				confirmButtonText: 'OK',
				customClass: {
					confirmButton: 'neon-confirm-button'
				},
				buttonsStyling: false
			});
			return;
		} else {
			console.log('User logged out successfully');
			Swal.fire({
				title: 'Logged Out',
				text: '',
				timer: 1500,
				icon: 'success',
				background: '#1a1a1a',
				color: 'whitesmoke',
				customClass: {
					confirmButton: 'neon-confirm-button'
				},
				showConfirmButton: false,
				buttonsStyling: false
			});
			// Redirect to the home page
			await goto('/'); // Replace with your desired route

			window.location.reload();
		}
	};

	Swal.fire({
		title: 'Are you sure you want to log out?',
		html: `
			<div style="color: whitesmoke; font-size: 1rem;">
				This action cannot be undone.
			</div>
		`,
		background: '#1a1a1a',
		color: 'whitesmoke',
		showDenyButton: true,
		confirmButtonText: 'Yes',
		denyButtonText: 'No',
		customClass: {
			confirmButton: 'neon-confirm-button',
			denyButton: 'neon-deny-button'
		},
		buttonsStyling: false
	}).then(async (result) => {
		if (result.isConfirmed) {
			await logout(); // Ensure logout is awaited
		} else if (result.isDenied) {
			// Do nothing or add additional logic
		}
	});
};

export default handleLogout;
