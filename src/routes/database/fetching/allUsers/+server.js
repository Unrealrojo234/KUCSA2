import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

export async function POST({ request }) {
	try {
		const { data, error } = await supabase.from('profiles').select('*');

		if (error) {
			throw error;
		}

		return json(data);
	} catch (error) {
		return json({ status: failed });
	}
}
