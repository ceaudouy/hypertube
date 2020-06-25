import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'
import Input from '../../components/Input/Input'
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		padding-top: 5vh;
		padding-bottom: 5vh;
	}
`

const SignupForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: auto;
	max-width: 50vw;
	margin-top: 5vw;

	& > * {
		margin-top: 4vh;
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
	margin-top: 2vh;
`

function SignUp() {
	const history = useHistory();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [input, setInput] = useState({
	   firstname: '',
	   lastname: '',
	   login: '',
	   email: '',
	   password: '',
	   confirmation: ''
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
		e.preventDefault();
		if (input.password === input.confirmation) {
			api.post('/user/register', input)
			.then(() => {
				enqueueSnackbar(`Your account has been created!`, {variant: 'success'});
				setTimeout(function(){closeSnackbar()}, 1000);
				setTimeout(function(){history.push('/signin')}, 1000);
			})
			.catch((err) => {
				console.log(err);
				enqueueSnackbar(`A problem occured`, {variant: 'error'});
				setTimeout(function(){closeSnackbar()}, 1000);
			})
		}
		else {
			enqueueSnackbar(`password does not match`, {variant: 'error'});
			setTimeout(function(){closeSnackbar()}, 1000);
		}
	}

	return (
		<MainContainer>
			<SignupForm onSubmit={handleSubmit}>
				<Input type="text" value={ input.firstname } name='firstname' handleChange={handleFirstname}/>
				<Input type="text" value={ input.lastname } name='lastname' handleChange={handleLastname}/>
				<Input type="text" value={ input.login } name='login' handleChange={handleLogin}/>
				<Input type="email" value={ input.email } name='email' handleChange={handleEmail}/>
				<Input type="password" value={ input.password } name='password' handleChange={handlePassword}/>
				<Input type="password" value={ input.confirmation } name='confirmation' handleChange={handleConfirmation}/>
				<PasswordStrength strength={strength} password={input.password}/>
				<SubmitButton type="submit" onClick={handleSubmit}>SignUp</SubmitButton>
			</SignupForm> 
		</MainContainer>
	)
}

export default SignUp;