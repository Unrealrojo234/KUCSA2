import { supabase } from './supabaseClient';

/**
 * Fetches the current user's UID from the Supabase session.
 * @returns {Promise<string>} The user's UID.
 * @throws {Error} If there's an error fetching the session or no active session exists.
 */
const getUid = async () => {
	try {
		// Fetch the current session
		const {
			data: { session },
			error: sessionError
		} = await supabase.auth.getSession();

		// Log session and error for debugging
		console.log('Session:', session);
		console.log('Session Error:', sessionError);

		// Handle session errors
		if (sessionError) {
			console.error('Error fetching session:', sessionError.message);
			throw new Error('Failed to fetch session');
		}

		// If no session exists, try refreshing the session
		if (!session) {
			console.log('No active session found. Attempting to refresh session...');

			const {
				data: { session: refreshedSession },
				error: refreshError
			} = await supabase.auth.refreshSession();

			// Log refreshed session and error for debugging
			console.log('Refreshed Session:', refreshedSession);
			console.log('Refresh Error:', refreshError);

			if (refreshError) {
				console.error('Error refreshing session:', refreshError.message);
				throw new Error('Failed to refresh session');
			}

			if (!refreshedSession) {
				console.log('No session after refresh.');
				throw new Error('No active session');
			}

			// Use the refreshed session
			return refreshedSession.user.id;
		}

		// Return the user's UID from the original session
		return session.user.id;
	} catch (error) {
		console.error('Error in getUid:', error.message);
		throw error; // Re-throw the error for the caller to handle
	}
};

export default getUid;
