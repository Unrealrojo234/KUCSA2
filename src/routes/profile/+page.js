// src/routes/protected/+page.js
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import getUid from '$lib/UID.js';
import { get } from 'svelte/store';

export const load = async ({ fetch }) => {
	// Fetch the current session
	let session = await getUid();

	// If there's no session, redirect to the login page
	if (!session) {
		throw redirect(303, '/');
	}

	try {
		// Fetch user profile data
		const response = await fetch('/database/fetching/userProfile', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ uid: session })
		});

		if (!response.ok) {
			throw new Error('Failed to fetch user profile');
		}

		let data = await response.json();

		data = data[0];

		return { data };
	} catch (error) {
		return {
			userProfile: null
		};
	}
};
