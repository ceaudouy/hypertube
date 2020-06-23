import React, { useState } from 'react'
import styled from "styled-components"
import { useParams, useHistory } from 'react-router-dom'
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


function Password() {
    let { token } = useParams();
	const history = useHistory();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    const [password, setPassword] = useState("");
    const handlePassword = (e) => {setPassword(e.target.value)}

	const handleSubmit = (e) => {
		api.post(`/user/reset/${token}`, {password: password})
		.then((res) => {
			enqueueSnackbar(`Password has been reset!`, {variant: 'success'});
			setTimeout(closeSnackbar(), 1000);
			setTimeout(history.push('/signup'), 1000);
		})
		.catch((err) => {
			console.log(err)
			enqueueSnackbar(`An error occured`, {variant: 'error'});
			setTimeout(closeSnackbar(), 1000);
		})
	}

	return (
		<MainContainer>
            <MainContainer>
                <Input type='password' name='password' placeholder="" handleChange={handlePassword}/>
                <SubmitButton onClick={handleSubmit}>Save new password</SubmitButton>
		    </MainContainer>
		</MainContainer>
	)
}

export default Password;