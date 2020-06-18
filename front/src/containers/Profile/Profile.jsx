import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'
import Loader from '../../components/Loader/Loader'
import Input from '../../components/Input/Input'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    @media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 80%;
	}
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 80%;
	}
`

const AccountContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 80%;
	}
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 20%;
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

function Profile() {
	const [user, setUser] = useState(false);
	const [fetch, setFetch] = useState(false);

	useEffect(() => {
		api.get('/user/')
		.then((res) => {
			setUser(res.data);
			setFetch(true);
		})
		.catch(err => {
			console.log(err);
		});
	}, [])
        
    const handleMail = (e) => {setUser({...user, email: e.target.value})}
    const handleFirstname = (e) => {setUser({...user, firstname: e.target.value})}
    const handleLastname = (e) => {setUser({...user, lastname: e.target.value})}
    const handleLogin = (e) => {setUser({...user, login: e.target.value})}

    const handleSubmit = () => {
		api.post('/user/update', user)
		.catch((err) => {
			console.log(err);
		});
	}
	
	return (
		fetch === true ?
		<MainContainer>
			<AccountContainer>
				<Input type='email' name='email' handleChange={handleMail} value={ user ? user.email : "" }/>
				<Input type='text' name='firstname' handleChange={handleFirstname} value={ user ? user.firstname : "" }/>
				<Input type='text' name='lastname' handleChange={handleLastname} value={ user ? user.lastname : "" }/>
				<Input type='text' name='login' handleChange={handleLogin} value={ user ? user.login : "" }/>
				<SubmitButton type="submit" onClick={handleSubmit}>Update</SubmitButton>
			</AccountContainer>
		</MainContainer>
		: <Loader/>
	);
}

export default Profile;