import React, { useState } from 'react';
import { Avatar, TextField, Button, makeStyles, Snackbar, List, ListItem } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ReqFetch from './req_fetch';
import logo1 from '../../css/1.png';
import logo2 from '../../css/2.png';
import logo3 from '../../css/3.png';
import logo4 from '../../css/4.png';
import logo5 from '../../css/5.png';
import logo6 from '../../css/6.png';

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
	list: {
		justifyContent: 'center',
		paddingTop: '0%',
	},
	avatar: {
		width: '12%',
		height: '12%',
	},
	choose: {
		fontStyle: "oblique",
		textAlign: "center",
	}
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SimpleDialog(props) {
	const classes = useStyle();
	const { onClose, selectedValue, open } = props;

	const handleCloseIfClick = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = value => {
		onClose(value);
		return (value);
	};

	return (
		<Dialog onClose={handleCloseIfClick} aria-labelledby="simple-dialog-title" open={open}>
		<DialogTitle id="simple-dialog-title" className={classes.choose}>Choose your Avatar</DialogTitle>
		<List>
			<ListItem button onClick={() => handleListItemClick('1')} className={classes.list}>
				<img src={logo1} alt="logo" className={classes.avatar} />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('2')} className={classes.list}>
				<img src={logo2} alt="logo" className={classes.avatar} />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('3')} className={classes.list}>
				<img src={logo3} alt="logo" className={classes.avatar} />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('4')} className={classes.list}>
				<img src={logo4} alt="logo" className={classes.avatar} />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('5')} className={classes.list}>
				<img src={logo5} alt="logo" className={classes.avatar} />
			</ListItem>
			<ListItem button onClick={() => handleListItemClick('6')} className={classes.list}>
				<img src={logo6} alt="logo" className={classes.avatar} />
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
	const [openAvatar, setOpenAvatar] = useState(false);
	const [selectedValue, setSelectedValue] = useState();
	// const value = SimpleDialog('');

	const handleClick = () => {
		setOpen(true);
	};

	const handleClickAvatar = () => {
		setOpenAvatar(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleCloseAvatar = value => {
		setOpenAvatar(false);
		setSelectedValue(value);
	};

	// const handleChooseImg = () => {
	// 	if (value === 1)
	// 		return {logo1};
	// 	else if (value === 2)
	// 		return {logo2};
	// 	else if (value === 3)
	// 		return {logo3};
	// 	else if (value === 4)
	// 		return {logo4};
	// 	else if (value === 5)
	// 		return {logo5};
	// 	else if (value === 6)
	// 		return {logo6};
	// 	else
	// 		return;
	// }

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
				<Avatar
				className={classes.large}
				onClick={handleClickAvatar}
				onChange={handleChange}
				name="avatar"
				/>
				<SimpleDialog selectedValue={selectedValue} open={openAvatar} onClose={handleCloseAvatar} />
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