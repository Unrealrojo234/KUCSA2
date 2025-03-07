// src/routes/protected/+page.js
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	// Fetch the current session

	try {
		const {
			data: { session }
		} = await supabase.auth.getSession();
		// Return data needed for the page
		return {
			user: session.user
		};
	} catch (error) {
		// console.log('Error ', error);
	}
};
