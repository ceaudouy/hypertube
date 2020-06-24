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

const StyledCanvas  = styled.canvas`
	position: absolute;
	z-index: -2;
	height: 100vh;
	width: auto;
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
		</MainContainer>
	);
}

export default Homepage;
