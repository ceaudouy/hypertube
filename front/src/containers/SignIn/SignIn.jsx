import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useSnackbar } from 'notistack'

import api from '../../api/api'
import Input from '../../components/Input'
import { COLORS, BREAK_POINTS } from '../../config/style'
// import './SignIn.css'

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
	--text-color: #afafaf;
	& * {
		margin-top: 2vh;
	};
`

const InputName = styled.label`
	color: var(--text-color);
	font-size: 1.2rem;
	z-index: -1;
	position: absolute;
	left: 0;
	transform: translateY(-2rem);
	transform-origin: 0%;
	transition: transform 400ms;
`

const InputValue = styled.input`
	outline: none;
	border: none;
	overflow: hidden;
	margin: 0;
	width: 100%;
	padding: 0.25rem 0;
	background: none;
	color: white;
	font-size: 1.2rem;
	font-weight: bold;
	&:valid {
		color: ${COLORS.GREEN};
	}
	&:invalid {
		color: ${COLORS.PINK_FLASHY};
	}
`


const InputContainer = styled.div`
	position: relative;
	width: 100%;
	border-bottom: 2px solid var(--text-color);
	margin: 4rem auto 1rem;
	&::after {
		content: "";
		position: relative;
		display: block;
		height: 4px;
		width: 100%;
		background: ${COLORS.PINK_FLASHY};
		transform: scaleX(0);
		transform-origin: 0%;
		transition: transform 500ms ease;
		top: 2px;
	}
	&:focus-within {
		border-color: transparent; 
	}
	&:focus-within ${InputName}, ${InputValue}:not(:placeholder-shown) + ${InputName} {
		transform: scale(0.8) translateY(-5rem);
	}

	&:focus-within::after {
		transform: scaleX(1);
	}
`

const PasswordStrenghContainer = styled.div`
	display: flex;
	height: 20px;
	width: 100%;
`

const Bar = styled.span`
	margin-right: 5px;
    height: 100%;
    width: 25%;
    transition: box-shadow 500ms;
`

const BarOne = styled(Bar)`
	background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_RED}, ${COLORS.PASSWORD_ORANGE})` : 'inset 0px 20px #1F1F1F'};
`

const BarTwo = styled(Bar)`
    background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_ORANGE}, ${COLORS.PASSWORD_YELLOW})` : 'inset 0px 20px #1F1F1F'};
`

const BarThree = styled(Bar)`
    background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_YELLOW}, ${COLORS.PASSWORD_YELLOWGREEN})` : 'inset 0px 20px #1F1F1F'};
`

const BarFour = styled(Bar)`
    background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_YELLOWGREEN}, ${COLORS.PASSWORD_GREEN})` : 'inset 0px 20px #1F1F1F'};
`

const Sli = styled.li`
	color: ${p => p.active ? 'green' : 'red'};
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

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [input, setInput] = useState({
		email: "",
		password: ""
	 });
	const [strengh, setStrengh] = useState(0);

	let validations = [];

	// const handleGithubConnexion = () => {
		
	// }

	// const handleChange = (e) => setInput({...input, [e.currentTarget.name]: e.currentTarget.value})

	const handleMail = (e) => {
		setInput({...input, email: e.target.value}
	)}
	
	const handlePassword = (e) => {
		e.preventDefault();
		setInput({...input, password: e.target.value});
		
		validations = [
			(e.target.value.length > 5),
			(e.target.value.search(/[A-Z]/) > -1),
			(e.target.value.search(/[0-9]/) > -1),
			(e.target.value.search(/[^A-Za-z0-9]/) > -1),
		]
		setStrengh(validations.reduce((acc, cur) => acc + cur));
	}

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
				<Input name='email' handleChange={handleMail}/>
				<Input name='password' handleChange={handlePassword}/>
				<PasswordStrenghContainer>
					<BarOne active={strengh > 0}></BarOne>
					<BarTwo active={strengh > 1}></BarTwo>
					<BarThree active={strengh > 2}></BarThree>
					<BarFour active={strengh > 3}></BarFour>
				</PasswordStrenghContainer>
				<ul>
					<Sli active={input.password.length > 5}>{ input.password.length > 5 ?<>😄</> : <>😞</>} number of characters </Sli>
					<Sli active={input.password.search(/[A-Z]/) > -1}> capital letter </Sli>
					<Sli active={input.password.search(/[0-9]/) > -1}> number </Sli>
					<Sli active={input.password.search(/[^A-Za-z0-9]/) > -1}> special character </Sli>
				</ul>
				<SubmitButton type="submit" onClick={handleSubmit}>Sign In</SubmitButton>
			</SignupForm>
		</MainContainer>
	)
}

export default SignIn;