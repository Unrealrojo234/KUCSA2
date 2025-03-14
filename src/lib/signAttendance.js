const SignAttendance = async (uid) => {
	try {
		const response = await fetch(`/database/insertion/attendance`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ uid: uid })
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data);
		return data; // Return the response data if needed
	} catch (error) {
		console.error('Error:', error);
		throw error; // Re-throw the error if you want the caller to handle it
	}
};

export default SignAttendance;
