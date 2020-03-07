import React, { useState } from 'react';
import { TextField, Button, makeStyles, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
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

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignIn() {
	const classes = useStyle();
	const [input, setInput] = useState('');
	const [requete, setRequete] = useState('');
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	// Hooks -> check if value on input change & apply new value (next -> get value for API)
	const handleChange = (e) => setInput({
		...input,
		[e.currentTarget.name]: e.currentTarget.value
	})

	const handleSubmit = async (e) => {
		e.preventDefault();
		const url = "http://localhost:3300/home/signIn";
		const req = await ReqFetch(input, url);
		setRequete(req);
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
				<Button type="submit" variant="contained" color="secondary" className={classes.button} onClick={handleClick}>
					Sign In
				</Button>
				<Snackbar className={classes.alert} open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="success">
						{requete.error}
						{requete.success}
						{/* Succes a modifier car directement log */}
					</Alert>
				</Snackbar>
			</div>
		</form>
	)
}

export default SignIn;
