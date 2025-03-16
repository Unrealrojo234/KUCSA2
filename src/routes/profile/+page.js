// src/routes/protected/+page.js
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load = async ({ fetch }) => {
	// Fetch the current session
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// If there's no session, redirect to the login page
	if (!session) {
		throw redirect(303, '/auth/login');
	}

	try {
		// Fetch user profile data
		const response = await fetch('/database/fetching/userProfile', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ uid: session.user.id })
		});

		if (!response.ok) {
			throw new Error('Failed to fetch user profile');
		}

		let data = await response.json();

		data = data[0];

		return { data };
	} catch (error) {
		return {
			userProfile: null
		};
	}
};
