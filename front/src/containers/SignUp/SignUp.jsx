import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import api from '../../api/api'
import { COLORS } from '../../config/style'
import Input from '../../components/Input/Input'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'

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
		margin-top: 3vh;
	};
	--text-color: #afafaf;
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

function SignUp() {
	const history = useHistory();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [input, setInput] = useState({
	   firstname: 'Nicolas',
	   lastname: 'Vergne',
	   login: 'nivergne',
	   email: 'nicolas@vergne.com',
	   password: 'Test123456!',
	   confirmation: 'Test123456!'
	});

	const handleFirstname = (e) => setInput({...input, firstname: e.target.value});
	const handleLastname = (e) => setInput({...input, lastname: e.target.value});
	const handleLogin = (e) => setInput({...input, login: e.target.value});
	const handleEmail = (e) => setInput({...input, email: e.target.value});
	const handleConfirmation  = (e) => setInput({...input, confirmation: e.target.value});

	let validations = [];
	const [strength, setStrengh] = useState(0);

	const handlePassword = (e) => {
		e.preventDefault();
		setInput({...input, password: e.target.value});
		
		validations = [
			(e.target.value.length > 5),
			(e.target.value.search(/[A-Z]/) > -1),
			(e.target.value.search(/[A-Z]/) > -1),
			(e.target.value.search(/[^A-Za-z0-9]/) > -1),
		]
		setStrengh(validations.reduce((acc, cur) => acc + cur));
	}


	const handleSubmit = async (e) => {
		if (input.password === input.confirmation) {
			e.preventDefault();
			api.post('/user/register', input)
			.then(() => {
				enqueueSnackbar(`Your account has been created!`, {variant: 'success'});
				setTimeout(closeSnackbar(), 1000);
				setTimeout(history.push('/signin'), 1000);
			})
			.catch((err) => {
				console.log(err);
				enqueueSnackbar(`A problem occured`, {variant: 'error'});
				setTimeout(closeSnackbar(), 1000);
			})
		}
		else {
			enqueueSnackbar(`password does not match`, {variant: 'error'});
			setTimeout(closeSnackbar(), 1000);
		}
	}

	return (
		<MainContainer>
			<SignupForm onSubmit={handleSubmit}>
				<Input type="text" name='firstname' handleChange={handleFirstname}/>
				<Input type="text" name='lastname' handleChange={handleLastname}/>
				<Input type="text" name='login' handleChange={handleLogin}/>
				<Input type="email" name='email' handleChange={handleEmail}/>
				<Input type="password" name='password' handleChange={handlePassword}/>
				<Input type="password" name='confirmation' handleChange={handleConfirmation}/>
				<PasswordStrength strength={strength} password={input.password}/>
				<SubmitButton type="submit" onClick={handleSubmit}>SignUp</SubmitButton>
			</SignupForm> 
		</MainContainer>
	)
}

export default SignUp;