import React, { useEffect } from 'react'
import styled from 'styled-components'

import Ballpool from './Ballpool'

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
	height: 100vh;
	width: auto;
`

function Homepage() {
	let text = "no token";
	if (localStorage.length !== 0)
		text = localStorage.token;

	useEffect(() => {
		Ballpool();
	})
		
	// console.log("text", text);

	return (
		<MainContainer id="MainContainer - home.js">
			{/* <Typography>{text}</Typography> */}
			<StyledCanvas id="canv"></StyledCanvas>
		</MainContainer>
	);
}

export default Homepage;
