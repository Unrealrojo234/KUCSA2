import { SECRET_KEY } from '$env/static/private';

export async function POST({ request }) {
	const data = await request.json();

	const amount = `${data.amount}00`;
	const phone = data.phone;

	try {
		// Make the request to Paystack
		const response = await fetch('https://api.paystack.co/charge', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${SECRET_KEY}`
			},
			body: JSON.stringify({
				currency: 'KES',
				amount: amount,
				email: 'customer@email.com',
				mobile_money: {
					phone: phone,
					provider: 'mpesa'
				}
			})
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
