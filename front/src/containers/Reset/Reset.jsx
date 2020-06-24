import React, { useState } from 'react'
import styled from "styled-components"
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import api from '../../api/api'
import Input from '../../components/Input/Input'
import { COLORS, BREAK_POINTS } from '../../config/style'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    @media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 50vw;
	}
	@media (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 15vw;
	}
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

function Reset() {
	const history = useHistory();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [email, setEmail] = useState("");
    const handleEmail = (e) => {setEmail(e.target.value)}

	const handleSubmit = async (e) => {
		api.post('/user/request', {email: email})
		.then((res) => {
			enqueueSnackbar(`Email sent!`, {variant: 'success'});
			setTimeout(closeSnackbar(), 1000);
			setTimeout(history.push('/signup'), 1000);
		})
		.catch((err) => {
			console.log(err)
			enqueueSnackbar(`You've already received an email`, {variant: 'error'});
			setTimeout(closeSnackbar(), 1000);
		})
	}

	return (
		<MainContainer>
            <MainContainer>
                <Input type='email' name='email' placeholder=" " handleChange={handleEmail}/>
                <SubmitButton type="submit" onClick={handleSubmit}>Send reset link</SubmitButton>
		    </MainContainer>
		</MainContainer>
	)
}

export default Reset;