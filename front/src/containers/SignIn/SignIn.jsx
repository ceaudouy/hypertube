import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { useSnackbar } from 'notistack';

import api from '../../api/api'
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
	const [input, setInput] = useState({
		email: 'nicolas@vergne.com',
		password: 'Test123456!'
	 });

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleGithubConnexion = () => {
		
	}

	const handleChange = (e) => setInput({...input, [e.currentTarget.name]: e.currentTarget.value})

	const handleSubmit = async (e) => {
		e.preventDefault();
		api.post('/user/signIn', input)
		.then((res) => {
			localStorage.token = res.data.token;
			api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
			enqueueSnackbar(`You're connected!`, {variant: 'success'});
			setTimeout(closeSnackbar(), 1000);
		})
		.catch((err) => {
			console.log(err)
			enqueueSnackbar(`A problem occured`, {variant: 'error'});
			setTimeout(closeSnackbar(), 1000);
		})
	}

	return (
		<MainContainer>
			<SignupForm noValidate>
				<StyledInput type="text" name="email" placeholder="email" label="Email" onChange={handleChange} />
				<StyledInput type="password" name="password" placeholder="password" label="Password" onChange={handleChange} />
				<SubmitButton type="submit" onClick={handleSubmit}>Sign In</SubmitButton>
			</SignupForm>
		</MainContainer>
	)
}

export default SignIn;