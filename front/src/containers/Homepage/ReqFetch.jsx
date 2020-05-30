function ReqFetch(input, url) {
	return new Promise ((resolve, reject) => {
		fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({
				input: input
			})
		}).then(res => {
			if (res) {
				return res.json();
			}
			return reject(Error('Error'));
		}).then(parsedData => {
			resolve(parsedData);
		})
	})
}

export default ReqFetch;
