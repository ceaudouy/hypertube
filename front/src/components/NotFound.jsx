import React, { useState } from 'react';
import styled from "styled-components";
import travolta from '../media/lostTravolta.gif';

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
			<Travolta src={travolta} />
		</NotFoundContainer>
	)
}

export default NotFound;
