function SignOut() {
	let token = localStorage.getItem('token');
	fetch(`http://localhost:3300/home/signOut`, {
		method: 'POST',
		credentials: 'include',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		}),
	});
	// localStorage.removeItem('token');
	// document.location.href = '/';
	return null;
}

export default SignOut;
