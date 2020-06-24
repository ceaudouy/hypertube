import React, { useState } from 'react'
import styled from "styled-components"
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Link } from "react-router-dom"

import api from '../../api/api'
import Input from '../../components/Input/Input'
import { COLORS, BREAK_POINTS, SPACING } from '../../config/style'

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

const ResetContainer = styled.div`
	position: absolute;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		bottom: ${SPACING.XL};
	}
	@media (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		bottom: ${SPACING.BASE};
	}
`


const Typography = styled.label`
	color: white;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		font-size: 0.8rem;
	}
	@media (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		font-size: 1rem;
	}
`

function SignIn() {
	const history = useHistory();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [input, setInput] = useState({
		// email: "",
		// password: ""
		email: "nicolas@yopmail.com",
		password: "Test123456!"
	 });

	// const handleGithubConnexion = () => {
		
	// }

	const handleMail = (e) => setInput({...input, email: e.target.value});
	const handlePassword = (e) => setInput({...input, password: e.target.value});

	const handleSubmit = async (e) => {
		e.preventDefault();
		api.post('/user/signIn', input)
		.then((res) => {
			localStorage.token = res.data.token;
			api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
			enqueueSnackbar(`You're connected!`, {variant: 'success'});
			setTimeout(closeSnackbar(), 1000);
			setTimeout(history.push('/search'), 1000);
		})
		.catch((err) => {
			console.log(err)
			enqueueSnackbar(`A problem occured`, {variant: 'error'});
			setTimeout(closeSnackbar(), 1000);
		})
	}


	fetch('https://github.com/login/oauth/authorize?client_id=f5aee4b642c3f31d7a83&redirect_uri=http://matchapi.guillaumerx.fr:3300/user/github', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
	}).then((response) => {
		console.log(response)
		if (response.ok) {
			return response.json();
		}
	})

	return (
		<MainContainer>
			<SignupForm noValidate>
				<Input type='email' name='email' placeholder=" " handleChange={handleMail}/>
				<Input type='password' name='password' handleChange={handlePassword}/>
				<SubmitButton type="submit" onClick={handleSubmit}>Sign In</SubmitButton>
			</SignupForm>
			<ResetContainer>
				<Link to={"/reset"}>
					<Typography>Reset password</Typography>
				</Link>
			</ResetContainer>
		</MainContainer>
	)
}

export default SignIn;