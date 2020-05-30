import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import api from '../../api/api'
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

function SignUp() {
	const history = useHistory();

	const [input, setInput] = useState({
	   firstname: 'Nicolas',
	   lastname: 'Vergne',
	   login: 'nivergne',
	   email: 'nicolas@vergne.com',
	   password: 'Test123456!'
	});

	const handleChange = (e) => setInput({...input, [e.currentTarget.name]: e.currentTarget.value})

	const handleSubmit = async (e) => {
		e.preventDefault();
		api.post('/user/register', input)
		.then(() => {
			history.push('/signin')
		})
		.catch()
		// const url = "http://localhost:3300/user/register";
		// const req = await ReqFetch(input, url);
		// setRequest(req);
	}

	return (
		<MainContainer>
			<SignupForm onSubmit={handleSubmit}>
				<StyledInput onChange={handleChange} name="firstname" placeholder="first name" label="First Name" type="text" />
				<StyledInput onChange={handleChange} name="lastname" placeholder="last name" label="Last Name" type="text" />
				<StyledInput onChange={handleChange} name="login" placeholder="login" label="Login" type="text" />
				<StyledInput onChange={handleChange} name="email" placeholder="email" label="Email" type="email" />
				<StyledInput onChange={handleChange} name="password" placeholder="password" label="Password" type="password" />
				
				{/* <StyledInput onChange={handleChange} name="confirm password" placeholder="confirm password" label="confirm password" type="password" /> */}
				
				{/* <StyledInput onChange={handleChange} name="firstname" value="Nicolas" placeholder="first name" label="First Name" type="text" />
				<StyledInput onChange={handleChange} name="lastname" value="Vergne" placeholder="last name" label="Last Name" type="text" />
				<StyledInput onChange={handleChange} name="login" value="nivergne" placeholder="login" label="Login" type="text" />
				<StyledInput onChange={handleChange} name="email" value="nicolas@vergne.fr" placeholder="email" label="Email" type="email" />
				<StyledInput onChange={handleChange} name="password" value="Test123456!" placeholder="password" label="Password" type="password" />
				<StyledInput onChange={handleChange} name="confirm password" value="Test123456!" placeholder="confirm password" label="confirm password" type="password" /> */}
				<SubmitButton type="submit" onClick={handleSubmit}>SignUp</SubmitButton>
			</SignupForm> 
		</MainContainer>
	)
}

export default SignUp;