import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	try {
		const {
			data: { session }
		} = await supabase.auth.getSession();

		if (session) {
			const uid = session.user.id;
			const { data, error } = await supabase.from('profiles').select('*').eq('id', uid);

			if (error) throw error;

			if (data.length > 0 && !data[0].isAdmin) {
				throw redirect(303, '/');
			} else {
				let profile = await { admin: true, user: data[0] };

				return profile; // Return data to the component
			}
		} else {
			throw redirect(303, '/auth/login');
		}
	} catch (error) {
		console.error('Error:', error);
		throw redirect(303, '/');
	}
};
