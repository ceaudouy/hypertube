import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import api from '../../api/api'
import loader from '../../components/Loader/Loader'

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
	// const [fetch, setFetch] = useState(false);

	useEffect(() => {
		BallPool();
		api.get('/user')
		.then((res) => {
			console.log(res);
			console.log("homepage - /user succes");
			setUser(res.data);
			// setFetch(true);
		})
		.catch(err => {
			console.log("homepage - /user failure");
			console.log(err);
		});
	}, [])
		
	return (
		// fetch === true ? 
		<MainContainer id="MainContainer - home.js">
			<StyledCanvas id="canv"></StyledCanvas>
			<Card>
				<Typography>
					{ user !== undefined && user.firstname }
				</Typography>
			</Card>
		</MainContainer>
		// : <Loader/>
	);
}

export default Homepage;