import { error, json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';
import Swal from 'sweetalert2';

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { email, password } = body;

		if (!email || !password) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const { data, error: authError } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (authError) {
			throw authError;
		}

		console.log('User logged in:', data.user);
		return json({ success: true, user: data.user });
	} catch (err) {
		console.error('An error occurred:', err);
		return json({ error: err.message }, { status: 500 });
	}
}
