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

		// Handle session errors
		if (sessionError) {
			throw new Error('Failed to fetch session');
		}

		// If no session exists, try refreshing the session
		if (!session) {
			const {
				data: { session: refreshedSession },
				error: refreshError
			} = await supabase.auth.refreshSession();

			if (refreshError) {
				throw new Error('Failed to refresh session');
			}

			if (!refreshedSession) {
				throw new Error('No active session');
			}

			// Use the refreshed session
			return refreshedSession.user.id;
		}

		// Return the user's UID from the original session
		return session.user.id;
	} catch (error) {
		throw error; // Re-throw the error for the caller to handle
	}
};

export default getUid;
