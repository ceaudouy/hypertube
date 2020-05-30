import api from '../../api/api';

function SignOut() {
	let token = localStorage.getItem('token');
	api.post('/user/signOut')
	.then(() => {
		localStorage.removeItem('token');
	})
	.catch(err => console.log(err))
	document.location.href = '/';
	// fetch(`http://localhost:3300/home/signOut`, {
	// 	method: 'POST',
	// 	credentials: 'include',
	// 	headers: new Headers({
	// 		'Content-Type': 'application/json',
	// 		'Authorization': token
	// 	}),
	// });
	return null;
}

export default SignOut;
