import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import styled from "styled-components"

import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'

const Typography = styled.span`
	display: none;
	margin-left: 1rem;
`

const Element = styled.li`
	width: 100%;
`

const Logo = styled(Element)`
	font-weight: bold;
	background-color: ${COLORS.BLACK_LIGHT};
  	text-transform: uppercase;
  	margin-bottom: 1rem;
  	text-align: center;
  	color: ${COLORS.GREY_LIGHT};
  	font-size: 1.5rem;
  	letter-spacing: 0.3ch;
	& > svg {
		transform: rotate(0deg);
		transition: 600ms;
	}
	& > span {
		display: inline;
		position: absolute;
		left: -999px;
		transition: 600ms;
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		display: none;
	}
`

const Navigation = styled.div`
	position: fixed;
	z-index: 999;
	background-color: ${COLORS.BLACK};
	transition: width 600ms ease;
	&:hover ${Logo} > svg {
		transform: rotate(-180deg);
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		bottom: 0;
		width: 100vw;
		height: 5rem;
		overflow: scroll;
		&:hover ${Typography} {
			display: none;
		}
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		top: 0;
		width: 5rem;
		height: 100vh;
		&:hover {
			width: 16rem;
		}
		&:hover ${Typography} {
			display: inline;
		}
		&:hover ${Logo} > span {
			left: 0px;
		}
	}
`

const Container = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	list-style: none;
	margin: 0;
	padding: 0;
	height: 100%;
	& > li:last-child {
		margin-top: auto;
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		flex-direction: row;
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {

	}
`

const SLink = styled(Link)`
	display: flex;
	align-items: center;
	height: 5rem;
	text-decoration: none;
	color: ${COLORS.GREY};
	filter: grayscale(100%) opacity(.7);
	transition: 600ms;
	&:hover {
		filter: grayscale(0%) opacity(1);
		background-color: ${COLORS.BLACK_LIGHT};
		color: ${COLORS.GREY_LIGHT};
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		justify-content: center;
	}
`

const Icon = styled.i`
	color: ${COLORS.PINK};
	width: 2rem;
	font-size: 2rem;
  	min-width: 2rem;
  	margin: 0 1.5rem;
`

function Header() {
	const history = useHistory();
	const [isLog, setIsLog] = useState(false);

	useEffect(() => {
		api.get('/user')
		.then((res) => {
			console.log("header - /user succes");
			setIsLog(true);
		})
		.catch(err => {
			console.log("header - /user failure");
			console.log(err);
		});
	})

	const handleLogout = () => {
		if (localStorage.getItem('token') !== undefined) {
			api.post('/user/signOut')
			.then(() => {
				console.log("handlelogout");
				localStorage.removeItem("token");
				delete api.defaults.headers.common['Authorization'];
				history.push("/");
			})
			.catch((err) => console.log(`${err.response.data.message}`));
		}
	}

	return (
		<Navigation>
			<Container>
				<Logo>
					<SLink to={"/"}>
						<Typography>Hypertube</Typography>
						<Icon className="fas fa-grin-hearts fa-lg"/>
					</SLink>
				</Logo>
				<Element>
					<SLink to="/">
						<Icon className="fas fa-user fa-lg"/>
						<Typography>Profile</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/search">
						<Icon className="fas fa-search"/>
						<Typography>Search</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/signup">
						<Icon className="fas fa-user fa-lg"/>
						<Typography>Sign Up</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/signin">
						<Icon className="fas fa-user fa-lg"/>
						<Typography>Sign In</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/gameoflife">
						<Icon className="fas fa-dice"/>
						<Typography>Game Of Life</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/losttravolta">
						<Icon className="fab fa-freebsd"/>
						<Typography>Lost</Typography>
					</SLink>
				</Element>
				{
					isLog === true && 
					<Element>
						<SLink to="/" onClick={handleLogout}>
							<Icon className="fas fa-sign-out-alt fa-lg"/>
							<Typography>Logout</Typography>
						</SLink>
					</Element>
				}
			</Container>
		</Navigation>
	);

}

export default Header;