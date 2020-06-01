import React, { useEffect } from 'react'
import styled from 'styled-components'
import helper from './Helper'

const StyledCanvas  = styled.canvas`
	height: 100vh;
	width: auto;
`

function GameOfLife() {
	let text = "no token";
	if (localStorage.length !== 0)
		text = localStorage.token;

	useEffect(() => {
		helper();
	})
		
	return (
		<StyledCanvas id="canv"></StyledCanvas>
	);
}

export default GameOfLife;