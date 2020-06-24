import React, { useEffect } from 'react'
import styled from 'styled-components'

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

	useEffect(() => {
		BallPool();
	}, [])
		
	return (
		<MainContainer>
			<StyledCanvas id="canv"/>
		</MainContainer>
	);
}

export default Homepage;
