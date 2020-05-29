import React, { useState } from 'react';
import styled from "styled-components";
import pinguin from '../media/404.png';

const NotFoundContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: none;
`

const Travolta = styled.img`
	height: 100vh;
	width: 100vw;
`

const NotFound = () => {

	return (
		<NotFoundContainer>
			<Travolta src="https://media.giphy.com/media/sU511xfb7ORqw/giphy.gif" />
		</NotFoundContainer>
	)
}

export default NotFound;
