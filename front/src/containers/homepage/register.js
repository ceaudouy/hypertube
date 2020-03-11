import React, { useState } from 'react';
import { Avatar, TextField, Button, makeStyles, Snackbar, List, ListItem } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
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
		cursor: 'pointer',
	},
	alert: {
		top: "400px",
	},
	avatar: {
		backgroundColor: "#333",
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = value => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
		<DialogTitle id="simple-dialog-title">Choose your Avatar</DialogTitle>
		<List>
			<ListItem button onClick={() => handleListItemClick('')}>
				<img src="../../../public/css/1.png" alt="logo" />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('')}>
				<img src="../../../public/css/2.png" alt="logo" />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('')}>
				<img src="../../../public/css/3.png" alt="logo" />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('')}>
				<img src="../../../public/css/4.png" alt="logo" />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('')}>
				<img src="../../../public/css/5.png" alt="logo" />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('')}>
				<img src="../../../public/css/6.png" alt="logo" />
			</ListItem>
		</List>
		</Dialog>
	);
}

function Register() {
	const classes = useStyle();
	const [input, setInput] = useState('');
	const [requete, setRequete] = useState('');
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState();

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleCloseAvatar = value => {
		setOpen(false);
		setSelectedValue(value);
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
				<Avatar className={classes.large} onClick={handleClick} />
				<SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
				<Button type="submit" variant="contained" color="secondary" className={classes.button} onClick={handleClick}>
					Register
				</Button>
				<Snackbar className={classes.alert} open={open} autoHideDuration={6000} onClose={handleCloseAvatar}>
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
