import React, { useState } from 'react';
import styled from 'styled-components'
import ReqFetch from '../Homepage/ReqFetch';
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
	const [input, setInput] = useState('');
	const [request, setRequest] = useState('');
	const [open, setOpen] = useState(false);
	const [openAvatar, setOpenAvatar] = useState(false);
	const [selectedValue, setSelectedValue] = useState();

	const handleClick = () => {
		setOpen(true);
	};

	const handleClickAvatar = () => {
		setOpenAvatar(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleCloseAvatar = value => {
		setOpenAvatar(false);
		setSelectedValue(value);
	};

	const handleChange = (e) => setInput({...input, [e.currentTarget.name]: e.currentTarget.value})

	const handleSubmit = async (e) => {
		e.preventDefault();
		api.post('/user/register', input)
		// .then()
		// .catch()
		// const url = "http://localhost:3300/user/register";
		// const req = await ReqFetch(input, url);
		// setRequest(req);
	}

	return (
		<MainContainer>
			<SignupForm onSubmit={handleSubmit}>
				<StyledInput onChange={handleChange} placeholder="first name" label="First Name" type="text" name="firstname" />
				<StyledInput onChange={handleChange} placeholder="last name" label="Last Name" type="text" name="lastname" />
				<StyledInput onChange={handleChange} placeholder="login" label="Login" type="text" name="login" />
				<StyledInput onChange={handleChange} placeholder="email" label="Email" type="email" name="email" />
				<StyledInput onChange={handleChange} placeholder="password" label="Password" type="password" name="password" />
				<StyledInput onChange={handleChange} placeholder="confirm password" label="confirm password" type="password" name="confirm password" />
				<SubmitButton type="submit" onClick={handleClick}>SignUp</SubmitButton>
			</SignupForm> 
		</MainContainer>
	)
}

export default SignUp;