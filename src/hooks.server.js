import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js'; // Import your Supabase client

export async function handle({ event, resolve }) {
	// Get the session from Supabase
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// Define protected routes
	const protectedRoutes = ['/payment/registration', '/payment/renewal', '/profile']; // Add your protected routes here

	// Check if the user is trying to access a protected route
	if (protectedRoutes.includes(event.url.pathname)) {
		// If there's no session, redirect to the login page
		if (!session) {
			throw redirect(303, '/auth/login');
		}
	}

	event.locals.session = session;

	// Resolve the request
	return resolve(event);
}
