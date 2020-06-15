import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import api from '../../api/api'
import { BREAK_POINTS } from '../../config/style'
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
        
    const handleMail = () => {}
    const handleFirstname = () => {}
    const handleLastname = () => {}
    const handleLogin = () => {}

	return (
		fetch === true ?
		<MainContainer>
			<AccountContainer>
				<Input type='email' name='email' handleChange={handleMail}>{user && user.email}</Input>
				<Input type='text' name='firstname' handleChange={handleFirstname}>{user && user.firstname}</Input>
				<Input type='text' name='lastname' handleChange={handleLastname}>{user && user.lastname}</Input>
				<Input type='text' name='login' handleChange={handleLogin}>{user && user.login}</Input>
			</AccountContainer>
		{console.log("Coucou", user)}
		</MainContainer>
		: <Loader/>
	);
}

export default Profile;