import { error, json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

const getUid = async () => {
	const {
		data: { session },
		error: sessionError
	} = await supabase.auth.getSession();

	if (sessionError) {
		console.error('Error fetching session:', sessionError.message);
		throw new Error('Failed to fetch session');
	} else if (session) {
		return session.user.id; // Return the UID
	} else {
		console.log('No active session.');
		throw new Error('No active session');
	}
};

async function registrationRenewal(uid, type) {
	try {
		const updates = {};
		updates[type] = true; // Dynamically set the key based on the type

		const { data, error: updateError } = await supabase
			.from('profiles')
			.update(updates)
			.eq('id', uid) // Correct usage of .eq()
			.select('*');

		if (updateError) {
			console.error('Error updating profile:', updateError.message);
			throw updateError;
		}

		console.log(data);

		return data; // Return the updated data
	} catch (error) {
		console.error('Error in registrationRenewal:', error.message);
		throw error;
	}
}

export async function POST({ request }) {
	try {
		const uid = await getUid(); // Get the UID
		const { data } = await request.json(); // Parse the request body

		if (!data) {
			throw error(400, 'Missing "data" field in request body');
		}

		const type = data.type;

		console.table({ type: type });

		switch (type) {
			case 'registered':
				await registrationRenewal(uid, 'registered');
				break;

			case 'renewed':
				await registrationRenewal(uid, 'renewed'); // Await the function
				break;

			case 'attendance':
				console.log('Attendance Signed Successfully');
				break;

			default:
				throw error(400, 'Invalid type specified');
		}

		// Return a success response
		return json({ success: true }, { status: 200 });
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
