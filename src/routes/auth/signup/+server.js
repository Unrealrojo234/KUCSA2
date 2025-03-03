import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		// Parse the JSON body from the request
		const body = await request.json();

		// Log the received data (for debugging)
		console.table(body);

		// Destructure and validate required fields
		const { email, password, regNumber, lastName, firstName, phoneNumber } = body;
		if (!email || !password || !regNumber || !lastName || !firstName || !phoneNumber) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Step 1: Sign up the user with Supabase Auth
		const { data: authUser, error: authError } = await supabase.auth.signUp({
			email,
			password
		});

		if (authError) {
			console.error('Auth error:', authError.message);
			return json({ error: 'Authentication failed: ' + authError.message }, { status: 400 });
		}

		// Step 2: Insert user profile into the profiles table
		const { data: profileData, error: profileError } = await supabase.from('profiles').insert([
			{
				id: authUser.user.id, // Link to the auth user
				reg_number: regNumber,
				first_name: firstName,
				last_name: lastName,
				phone_number: phoneNumber
			}
		]);

		if (profileError) {
			console.error('Profile error:', profileError.message);
			return json({ error: 'Profile creation failed: ' + profileError.message }, { status: 400 });
		}

		// Return a success response
		return json({ message: 'Registration successful', user: authUser.user }, { status: 200 });
	} catch (error) {
		// Handle unexpected errors
		console.error('Error processing request:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
