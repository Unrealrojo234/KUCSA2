import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

export async function POST({ request }) {
	try {
		const { uid } = await request.json();

		const { data, error } = await supabase.from('profiles').select('*').eq('id', uid);

		if (error) {
			throw error;
		}

		return json(data);
	} catch (error) {
		return json({ status: failed });
	}
}
