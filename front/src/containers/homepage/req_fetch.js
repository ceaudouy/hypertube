function ReqFetch(input, url) {
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
		return res.json();
	}).then(parsedData => {
		console.log(parsedData);
	})
}

export default ReqFetch;
