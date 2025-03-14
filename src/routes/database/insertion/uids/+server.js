import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { uids } = await request.json();
		if (!uids) {
			console.log('Missing required fields');
			return json({ status: 500 }, { success: false });
		}

		console.log(uids);

		const { data, error: supabaseError } = await supabase
			.from('checker')
			.update(uids)
			.eq('id', 1)
			.select('*');

		if (supabaseError) {
			throw supabaseError;
		}

		return json({ status: 200 }, { success: true });
	} catch (error) {
		console.log('Error ', error);
		return json({ status: 500 }, { success: false, error: error });
	}
}
