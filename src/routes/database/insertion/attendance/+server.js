import { error, json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

// Helper function to get the UID from the session
const getUid = async () => {
	const {
		data: { session },
		error: sessionError
	} = await supabase.auth.getSession();

	if (sessionError) {
		console.error('Error fetching session:', sessionError.message);
		throw new Error('Failed to fetch session');
	}

	if (!session) {
		console.log('No active session.');
		throw new Error('No active session');
	}

	return session.user.id; // Return the UID
};

// Helper function to get the current date in "YYYY-MM-DD" format
const getDate = () => {
	const date = new Date();

	const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
	const year = date.getFullYear();

	// Format as "YYYY-MM-DD"
	return `${year}-${month}-${day}`;
};

export async function POST({ request }) {
	try {
		const uid = await getUid(); // Get the UID
		const date = getDate(); // Get the formatted date

		// Insert the attendance record into the database
		const { data, error: supabaseError } = await supabase
			.from('attendance')
			.insert({ uid: uid, date: date })
			.select();

		if (supabaseError) {
			throw supabaseError;
		}

		// Return a success response with the inserted data
		return json({ success: true, data: data }, { status: 200 });
	} catch (err) {
		console.error('Error in POST:', err.message);

		// Handle specific errors
		if (err instanceof SyntaxError) {
			throw error(400, 'Invalid JSON in request body');
		} else if (err.message === 'No active session') {
			throw error(401, 'Unauthorized: No active session');
		} else {
			throw error(500, 'Internal Server Error');
		}
	}
}
