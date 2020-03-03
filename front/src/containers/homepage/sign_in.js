import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
	}
}));

function SignIn() {
	const classes = useStyle();
	const [input, setInput] = useState('');

	// Hooks -> check if value on input change & apply new value (next -> get value for API)
	const handleChange = (e) => setInput({
		...input,
		[e.currentTarget.name]: e.currentTarget.value
	})

	const handleSubmit = () => {
		const url = "http://localhost:3300/home/signIn";
		ReqFetch(input, url);
	}

	return (
		<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
			<div className={classes.formContainer}>
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
				<Button type="submit" variant="contained" color="secondary" className={classes.button}>
					Sign In
				</Button>
			</div>
		</form>
	)
}

export default SignIn;
