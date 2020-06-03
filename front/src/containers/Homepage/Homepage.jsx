import React, { useEffect } from 'react'
import styled from 'styled-components'

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
	background-color: white;
`

function Homepage() {
	let text = "no token";
	if (localStorage.length !== 0)
		text = localStorage.token;

	useEffect(() => {
		BallPool();
	})
		
	return (
		<MainContainer id="MainContainer - home.js">
			{/* <Typography>{text}</Typography> */}
			<StyledCanvas id="canv"></StyledCanvas>
			<Card></Card>
		</MainContainer>
	);
}

export default Homepage;
