import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"

import api from "../../api/api"
import { COLORS, BREAK_POINTS, SPACING } from "../../config/style"

import Loader from "../../components/Loader/Loader"

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 50vw;
	}
	@media (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 15vw;
	}
`

const UserCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* align-items: center; */
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		padding: ${SPACING.XXS};
		background-color: ${COLORS.DUSK};
	}
	@media (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		padding: ${SPACING.XS};
		background-color: ${COLORS.DUSK};
	}
	border-radius: ${SPACING.XXS};
	box-shadow: 0px 0px 31px -5px ${COLORS.DUSK};
`

const Typography = styled.span`
	color: white;
	font-size: 1rem;
`

function User() {
	let { id } = useParams();
	const [user, setUser] = useState({});
	const [fetch, setFetch] = useState(false);

	useEffect(() => {
		api.get(`/user/search/${id}`)
		.then((res) => {
			setFetch(true);
			setUser(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}, [setUser])

	return (
		fetch ?
			<MainContainer>
				<UserCard>
					<img src={`${process.env.REACT_APP_API_URL}/${user.picture}`} />
					<Typography>login: {user.login}</Typography>
					<Typography>firstname: {user.firstname}</Typography>
					<Typography>lastname: {user.lastname}</Typography>
			   </UserCard>
			</MainContainer>
		: 
		<Loader/>
	);	
}

export default User;