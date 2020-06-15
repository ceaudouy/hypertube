import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import api from '../../api/api'
import Loader from '../../components/Loader/Loader'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Typography = styled.span`
	color: white;
	font-size: 1rem;
`

function Profile() {
	const [user, setUser] = useState(false);
	const [fetch, setFetch] = useState(false);


	useEffect(() => {
		api.get('/user/')
		.then((res) => {
			console.log(res);
			setUser(res.data);
			setFetch(true);
		})
		.catch(err => {
			console.log(err);
		});
	}, [])
		
	return (
		fetch === true ?
		<MainContainer>
            <Typography>
                Profile
            </Typography>
		</MainContainer>
		: <Loader/>
	);
}

export default Profile;
