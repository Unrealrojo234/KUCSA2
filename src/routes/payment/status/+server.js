import { SECRET_KEY } from '$env/static/private';

export async function POST({ request }) {
	try {
		// Parse the incoming request body
		const data = await request.json();
		const reference = data.reference;

		// Verify the transaction with Paystack
		const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${SECRET_KEY}`
			}
		});

		// Parse the response from Paystack
		const result = await response.json();

		// Return the Paystack response to the client
		return new Response(JSON.stringify(result), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error:', error);

		// Return an error response to the client
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
