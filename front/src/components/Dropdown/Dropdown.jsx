import React, { useState } from "react"
import styled from "styled-components"
import { COLORS, BREAK_POINTS } from "../../config/style"

const SNavCssProperties = styled.nav`
	--bg:#242526;
	--bg-accent: #484a4d;
	--text-color: #dadce1;
	--nav-size: 60px;
	--border: 1px solid #474a4d;
	--border-radius: 8px;
	--speed: 500ms; 
	& > ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	& > a {
		color: var(--text-color);
		text-decoration: none;;
	}
`

const Nav = styled(SNavCssProperties)`
	height: var(--nav-size);
	background-color: var(--bg);
	padding: 0 1rem;
	border-bottom: var(--border);
`

const NavElem = styled.ul`
	max-width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
`

const NavElemItem = styled.li`
	width: calc(var(--nav-size) * 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
`

const IconButton = styled.a`
	--button-size: calc(var(--nav-size) * 0.5);
	width: var(--button-size);
	height: var(--button-size);
	background-color: #484a4d;
	border-radius: 50%;
	padding: 5px;
	margin: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: filter 300ms;
`

const Dropdown = () => {
	return (
		<NavBar>
			<NavItem icon=""/>
		</NavBar>
	);
}

const NavBar = (props) => {
	return (
		<Nav>
			<NavElem>
				{ props.children }
			</NavElem>
		</Nav>
	)
}

const NavItem = (props) => {
	return (
		<NavElemItem>
			<IconButton href="#">
				{ props.icon }
			</IconButton>
		</NavElemItem>
	)
}

export default Dropdown;