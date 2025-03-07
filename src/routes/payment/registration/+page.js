// src/routes/protected/+page.js
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	// Fetch the current session
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// If there's no session, redirect to the login page
	if (!session) {
		throw redirect(303, '/auth/login');
	}

	// Return data needed for the page
	return {
		user: session.user
	};
};
