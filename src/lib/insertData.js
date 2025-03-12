const insertData = (type) => {
	try {
		fetch(`/database/insertion/payment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data: {
					type: type
				}
			})
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.error('Error', err));
	} catch (error) {
		console.log('Error ', error);
	}
};

export default insertData;
