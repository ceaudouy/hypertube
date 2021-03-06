import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useHistory, useParams } from 'react-router-dom'
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

const AuthContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 2vh;
`

const Icon = styled.i`
	color: ${COLORS.GREY_LOVE};
	width: 2rem;
	font-size: 2rem;
	min-width: 2rem;
	margin: 0 1.5rem;
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
		email: "",
		password: ""
	 });
	 const { token } = useParams();

	 useEffect(() => {
		if (token) {
			localStorage.token = token;
			api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
			setTimeout(function(){window.location.reload(false);}, 2000);
			history.push('/search');
		}
	 }, [token, history])

	const handleMail = (e) => {
		setInput({...input, email: e.target.value});
	}
		const handlePassword = (e) => setInput({...input, password: e.target.value});

	const handleSubmit = async (e) => {
		e.preventDefault();
		api.post('/user/signIn', input)
		.then((res) => {
			localStorage.token = res.data.token;
			api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
			enqueueSnackbar(`You're connected!`, {variant: 'success'});
			setTimeout(function(){closeSnackbar()}, 1000);
			setTimeout(function(){window.location.reload(false);}, 2000);
			setTimeout(function(){history.push('/search')}, 1000);
		})
		.catch((err) => {
			console.log(err)
			enqueueSnackbar(`A problem occured`, {variant: 'error'});
			setTimeout(function(){closeSnackbar()}, 1000);
		})
	}

	return (
		<MainContainer>
			<SignupForm noValidate>
				<Input type='email' name='email' value={input.email} placeholder=" " handleChange={handleMail}/>
				<Input type='password' name='password' value={input.password} handleChange={handlePassword}/>
				<SubmitButton type="submit" onClick={handleSubmit}>Sign In</SubmitButton>
			</SignupForm>

			<ResetContainer>
				<Link to={"/reset"}>
					<Typography>Reset password</Typography>
				</Link>
			</ResetContainer>
			<AuthContainer>
				<a href="https://api.intra.42.fr/oauth/authorize?client_id=8e001f3beed6c2bc2822bf40de363be697826b51479791faf476545f70cec1f0&redirect_uri=http%3A%2F%2Flocalhost%3A3300%2Fuser%2Ffortytwo&response_type=code">
					<Icon className="fab fa-github-alt"/>
				</a>
				<a href="https://github.com/login/oauth/authorize?client_id=f5aee4b642c3f31d7a83&redirect_uri=http://localhost:3300/user/github">
					<Icon className="fas fa-hippo"/>
				</a>
			</AuthContainer>
		</MainContainer>
	)
}

export default SignIn;