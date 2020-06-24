import React, { useEffect } from 'react'
import styled from 'styled-components'
import helper from './Helper'

const StyledCanvas  = styled.canvas`
	height: 100vh;
	width: auto;
`

function GameOfLife() {
	useEffect(() => {
		helper();
	})
		
	return (
		<StyledCanvas id="canv"></StyledCanvas>
	);
}

export default GameOfLife;