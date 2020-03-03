import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ReqFetch from './req_fetch';

const useStyle = makeStyles(theme => ({
	root: {
	'& .MuiTextField-root': {
		margin: theme.spacing(1),
		width: 150,
		},
	},
	formContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: "200px",
	},
	input: {
		color: "white",
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		marginBottom: "10px",
	}
}));

function Register() {
	const classes = useStyle();
	const [input, setInput] = useState('');

	// Hooks -> check if value on input change & apply new value (next -> get value for API)
	const handleChange = (e) => setInput({
		...input,
		[e.currentTarget.name]: e.currentTarget.value
	})

	const handleSubmit = () => {
		const url = "http://localhost:3300/home";
		ReqFetch(input, url);
	}

	// const changeSrc = () => {
	// }

	return (
		<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
			<div className={classes.formContainer}>
				<TextField
				InputProps={{
					className: classes.input
				}}
				label="First Name"
				type="text"
				color="secondary"
				name="firstname"
				onChange={handleChange}
				autoComplete="current-firstname"
				/>
				<TextField
				InputProps={{
					className: classes.input
				}}
				label="Last Name"
				type="text"
				color="secondary"
				name="lastname"
				onChange={handleChange}
				autoComplete="current-lastname"
				/>
				<TextField
				InputProps={{
					className: classes.input
				}}
				label="Login"
				type="text"
				color="secondary"
				name="login"
				onChange={handleChange}
				autoComplete="current-login"
				/>
				<TextField
				InputProps={{
					className: classes.input
				}}
				label="Password"
				type="password"
				color="secondary"
				name="password"
				onChange={handleChange}
				autoComplete="current-password"
				/>
				<TextField
				InputProps={{
					className: classes.input
				}}
				label="Email"
				type="email"
				color="secondary"
				name="email"
				onChange={handleChange}
				autoComplete="current-email"
				/>
				<Avatar className={classes.large} />
				{/* onClick={changeSrc} */}
				<Button type="submit" variant="contained" color="secondary" className={classes.button}>
					Register
				</Button>
			</div>
		</form>
	)
}

export default Register;
