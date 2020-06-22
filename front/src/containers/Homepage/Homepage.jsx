import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import api from '../../api/api'
import BallPool from './BallPool'

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

const StyledCanvas  = styled.canvas`
	position: absolute;
	z-index: -2;
	height: 100vh;
	width: auto;
`

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 20vh;
	width: 20vw;
	color: white;
	background-color: black;
`

function Homepage() {
	const [user, setUser] = useState(undefined);

	useEffect(() => {
		BallPool();
		if (localStorage.getItem("token") !== null) {
			api.get('/user')
			.then((res) => {setUser(res.data)})
			.catch((err) => {console.log(err)})
		}
	}, [])
		
	return (
		<MainContainer>
			<StyledCanvas id="canv"/>
			<Card>
				<Typography>
					{ user !== undefined && user.firstname }
				</Typography>
			</Card>
		</MainContainer>
	);
}

export default Homepage;
