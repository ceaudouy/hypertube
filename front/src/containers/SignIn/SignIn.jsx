import React, { useState, useContext } from 'react';
import styled from "styled-components";

import api from '../../api/api'
import { UserContext } from '../../context/UserContext';
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
	const [user, setUser] = useContext(UserContext);

	const [input, setInput] = useState({
		email: 'nicolas@vergne.com',
		password: 'Test123456!'
	 });

	const handleGithubConnexion = () => {
		
	}

	const handleChange = (e) => setInput({...input, [e.currentTarget.name]: e.currentTarget.value})

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(input);
		api.post('/user/signIn', input)
		.then((res) => {
			setUser(res.data);
			localStorage.setItem('token', res.data.token);
		})
		.catch((err) => {
			console.log(err)
		})
	}

	return (
		<MainContainer>
			<SignupForm noValidate>
				<StyledInput type="text" name="email" placeholder="email" label="Email" onChange={handleChange} />
				<StyledInput type="password" name="password" placeholder="password" label="Password" onChange={handleChange} />
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