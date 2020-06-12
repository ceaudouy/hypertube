import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useSnackbar } from 'notistack'

import api from '../../api/api'
import Input from '../../components/Input/Input'
import { COLORS } from '../../config/style'

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

const PasswordStrenghContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const PasswordStrenghBarContainer = styled.div`
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
	background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_RED}, ${COLORS.PASSWORD_ORANGE})` : `${COLORS.BLACK}`};
`

const BarTwo = styled(Bar)`
    background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_ORANGE}, ${COLORS.PASSWORD_YELLOW})` : `${COLORS.BLACK}`};
`

const BarThree = styled(Bar)`
    background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_YELLOW}, ${COLORS.PASSWORD_YELLOWGREEN})` : `${COLORS.BLACK}`};
`

const BarFour = styled(Bar)`
    background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_YELLOWGREEN}, ${COLORS.PASSWORD_GREEN})` : `${COLORS.BLACK}`};
`

const PasswordIndicationContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const Typography = styled.p`
	color: ${p => p.active ? 'green' : 'grey'};
`

const SubmitButton = styled.button`
	width: 100%;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	border-radius: 4px;
	outline: none;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

function SignIn() {

	let validations = [];
	const [strength, setStrengh] = useState(0);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [input, setInput] = useState({
		email: "",
		password: ""
	 });


	// const handleGithubConnexion = () => {
		
	// }

	const handleMail = (e) => {
		setInput({...input, email: e.target.value}
	)}
	
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
				<Input type='email' name='email' handleChange={handleMail}/>
				<Input type='password' name='password' handleChange={handlePassword}/>
				<PasswordStrenghContainer>
					<PasswordStrenghBarContainer>
						<BarOne active={strength > 0}></BarOne>
						<BarTwo active={strength > 1}></BarTwo>
						<BarThree active={strength > 2}></BarThree>
						<BarFour active={strength > 3}></BarFour>
					</PasswordStrenghBarContainer>
					<PasswordIndicationContainer>
						<Typography active={input.password.search(/[0-9]/) > -1}>{ input.password.search(/[A-Z]/) > -1 ? <>😄</> : <>😞</>} number </Typography>
						<Typography active={input.password.search(/[A-Z]/) > -1}>{ input.password.search(/[A-Z]/) > -1 ? <>😄</> : <>😞</>} capital letter </Typography>
						<Typography active={input.password.search(/[^A-Za-z0-9]/) > -1}>{ input.password.search(/[^A-Za-z0-9]/) > -1 ? <>😄</> : <>😞</>} special character </Typography>
						<Typography active={input.password.length > 5}>{ input.password.length > 5 ? <>😄</> : <>😞</>} number of characters </Typography>
					</PasswordIndicationContainer>
				</PasswordStrenghContainer>
				<SubmitButton type="submit" onClick={handleSubmit}>Sign In</SubmitButton>
			</SignupForm>
		</MainContainer>
	)
}

export default SignIn;