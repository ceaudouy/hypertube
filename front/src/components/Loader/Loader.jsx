import React from 'react';
import styled from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress';

const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
`

function Loader() {

	return (
		<LoaderContainer>
			<CircularProgress style={{color: "#FFF"}}/>
		</LoaderContainer>
	);
}

export default Loader;