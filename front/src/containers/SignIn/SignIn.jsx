import React, { useState } from 'react';
import ReqFetch from '../Homepage/ReqFetch';
import styled from "styled-components";
import { COLORS, BREAK_POINTS } from '../../config/style'


const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const SignupForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: auto;
	max-width: 50vw;
	& * {
		margin-top: 2vh;
	};
`

const StyledInput = styled.input`
	display: inline-block;
	width: 100%;
	margin: 8px 0;
	padding: 12px 20px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
`

const SubmitButton = styled.button`
	width: 100%;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

function SignIn() {
	const [input, setInput] = useState('');
	const [request, setRequest] = useState('');
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

	const handleGithubConnexion = () => {
		
	}

	const handleChange = (e) => setInput({...input, [e.currentTarget.name]: e.currentTarget.value})

	const handleSubmit = async (e) => {
		e.preventDefault();
		const url = "http://localhost:3300/user/signIn";
		const req = await ReqFetch(input, url);
		setRequest(req);
		localStorage.setItem('token', req.success);
	}

	return (
		<MainContainer>
			<SignupForm noValidate autoComplete="off" onSubmit={handleSubmit}>
				<StyledInput type="text" placeholder="login" label="Login" name="login" onChange={handleChange} />
				<StyledInput type="password" placeholder="password" label="Password" name="password" onChange={handleChange} />
				<SubmitButton type="submit" onClick={handleSubmit}>Sign In</SubmitButton>
				{/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="warning">
						{request.error}
					</Alert>
				</Snackbar>
				<Button variant="contained" color="secondary" className={classes.fortytwo}>
					Sign In with 42
				</Button>
				<Button onClick={handleGithubConnexion} variant="contained" color="secondary" className={classes.fortytwo2}>
					Sign In with Github
				</Button>
				<Button variant="contained" color="secondary" className={classes.fortytwo2}>
					Sign In with Gmail
				</Button> */}
			</SignupForm>
		</MainContainer>
	)
}

export default SignIn;
