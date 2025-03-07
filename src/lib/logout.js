import { goto } from '$app/navigation'; // For redirecting after logout
import Swal from 'sweetalert2';
import { supabase } from './supabaseClient';

const handleLogout = async () => {
	// Function to perform the logout
	const logout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			//console.error('Error logging out:', error.message);
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
			return false; // Return false if logout fails
		} else {
			//console.log('User logged out successfully');
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

			try {
				// Clear the session explicitly
				await supabase.auth.setSession(null);
				// Clear local and session storage
				sessionStorage.clear();
				localStorage.clear();
			} catch (error) {
				//console.log('Already logged out');
			}

			// Redirect to the home page
			await goto('/');

			return true; // Return true if logout succeeds
		}
	};

	// Show the confirmation dialog
	const result = await Swal.fire({
		title: 'Are you sure you want to log out? 🤔',
		html: ``,
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
	});

	// Handle the result of the confirmation dialog
	if (result.isConfirmed) {
		return await logout(); // Return the result of the logout function
	} else if (result.isDenied) {
		return false; // Return false if the user cancels the logout
	}
};

export default handleLogout;
