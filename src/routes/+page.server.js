import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load() {
	try {
		const {
			data: { session }
		} = await supabase.auth.getSession();
		return {
			user: session.user
		};
	} catch (error) {
		return {
			user: null
		};
	}
}
