import React, { useState } from 'react';
import { Avatar, TextField, Button, makeStyles, Snackbar } from '@material-ui/core';
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
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		marginBottom: "10px",
	},
	alert: {
		top: "400px",
	}
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Register() {
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
		const url = "http://localhost:3300/home/register";
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
				<Button type="submit" variant="contained" color="secondary" className={classes.button} onClick={handleClick}>
					Register
				</Button>
				<Snackbar className={classes.alert} open={open} autoHideDuration={6000} onClose={handleClose}>
					 <Alert onClose={handleClose} severity={requete.error === undefined ? "success" : "error"}>
						{requete.success}
						{requete.error}
					</Alert>
				</Snackbar>
			</div>
		</form>
	)
}

export default Register;
