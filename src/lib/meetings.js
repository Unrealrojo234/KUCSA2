const Meetings = (count) => {
	try {
		fetch('/database/insertion/meetings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ meetings: count })
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log('Error ', error);

				return false;
			});

		return true;
	} catch (error) {
		console.log('Error ', error);
		return false;
	}
};

export default Meetings;
