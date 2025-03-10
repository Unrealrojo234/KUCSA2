const insertData = (type) => {
	try {
		fetch(`/database/insertion/payment`, {
			method: 'POST',
			body: JSON.stringify({
				data: {
					type: type
				},
				headers: {
					'Content-Type': 'application/json'
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
