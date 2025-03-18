import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const body = await request.json();
		console.log('Received signup request:', body);

		// Validate all required fields
		const requiredFields = [
			'email',
			'password',
			'regNumber',
			'lastName',
			'firstName',
			'phoneNumber'
		];
		const missingFields = requiredFields.filter((field) => !body[field]);
		if (missingFields.length > 0) {
			return json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
		}

		// Destructure with defaults
		const {
			email = '',
			password = '',
			regNumber = '',
			lastName = '',
			firstName = '',
			phoneNumber = ''
		} = body;

		// 1. Create auth user
		const { data: authUser, error: authError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					// Add metadata for potential trigger use
					reg_number: regNumber,
					first_name: firstName,
					last_name: lastName,
					phone_number: phoneNumber
				}
			}
		});

		if (authError) {
			console.error('Auth Error:', {
				code: authError.code,
				message: authError.message,
				details: authError.status
			});
			return json({ error: `Signup failed: ${authError.message}` }, { status: 400 });
		}

		// 2. Verify user creation
		if (!authUser?.user?.id) {
			console.error('User creation verification failed');
			return json({ error: 'User account creation failed' }, { status: 500 });
		}

		// 3. Insert profile with transaction
		const { data: profileData, error: profileError } = await supabase
			.from('profiles')
			.insert([
				{
					id: authUser.user.id,
					reg_number: regNumber,
					first_name: firstName,
					last_name: lastName,
					phone_number: phoneNumber
				}
			])
			.select()
			.single(); // Ensure single record response

		if (profileError) {
			console.error('Profile Insert Error:', {
				code: profileError.code,
				details: profileError.details,
				hint: profileError.hint
			});

			// Attempt to clean up auth user if profile creation fails
			await supabase.auth.admin.deleteUser(authUser.user.id);

			return json(
				{
					error:
						profileError.code === '23505'
							? 'Registration number already exists'
							: 'Profile creation failed'
				},
				{ status: 400 }
			);
		}

		// 4. Final verification
		if (!profileData) {
			await supabase.auth.admin.deleteUser(authUser.user.id);
			return json({ error: 'Profile creation failed' }, { status: 500 });
		}

		console.log('Successful registration for:', authUser.user.id);
		return json(
			{
				message: 'Registration successful',
				userId: authUser.user.id,
				profileId: profileData.id
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Unexpected Error:', {
			errorName: error.name,
			errorMessage: error.message,
			stack: error.stack
		});
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
