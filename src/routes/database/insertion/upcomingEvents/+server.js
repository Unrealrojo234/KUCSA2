import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

export async function POST({ request }) {
	try {
		const { event } = await request.json();

		console.table(event);

		if (!event) {
			return json({ status: 'error', reason: 'Some fields are missinf' });
		}

		// Insert the events record into the database
		const { data, error: supabaseError } = await supabase
			.from('upcomingEvents')
			.insert(event)
			.select();

		if (supabaseError) {
			throw supabaseError;
		}

		return json({ success: true }, { status: 200 });
	} catch (error) {
		console.log('Error ', error);
		return json({ success: false }, { status: 500 });
	}
}
