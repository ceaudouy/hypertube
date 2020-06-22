import React, { useState } from "react"
import styled, { css } from "styled-components"
import { CSSTransition } from "react-transition-group"

import { COLORS } from "../../config/style"
import "./Dropdown.css"

const GlobalContainer = styled.div`
	display: flex;
	justify-content: center;
`

const SNavCssProperties = css`
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

const Nav = styled.nav`
	${SNavCssProperties};
	position: relative;
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

const Icon = styled.i`
	color: ${COLORS.GREY_LIGHT};
`

const IconCssProperties = css`
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
	&:hover {
		filter: brightness(1.2);
	}
	& > ${Icon} {
		fill: var(--text-color);
		width: 20px;
		height: 20px;
	}
`

const IconButton = styled.a`
	${IconCssProperties};
`

const DropdownMenuGlobalContainer = styled.div`
	position: absolute;
	width: 300px;
	max-height: 30vh;
	position: absolute;
	width: 300px;
	max-height: 30vh;
	transform: translateX(-45%);
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 50vw;
		max-height: 70vh;
		transform: translateX(-25%);
	}
	padding: 1rem;
	top: 58px;
	background-color: var(--bg);
	border: var(--border);
	border-radius: var(--border-radius);
	transition: height var(--speed) ease;
	overflow: scroll;
	&::-webkit-scrollbar {
		width: 0.25rem;
		height: 0.25rem;
	}
	&::-webkit-scrollbar-track {
		background: #1e1e24;
	}

	&::-webkit-scrollbar-thumb {
		background: #1e1e24;
	}
	transition: height var(--speed) ease;
`

const DropdownMenuContainer = styled.div`

`

const DropdownItemLink = styled.a`
	height: 50px;
	display: flex;
	align-items: center;
	border-radius: var(--border-radius);
	transition: background var(--speed);
	text-decoration: none;
	color: ${COLORS.GREY_LIGHT};
	padding: 0.5rem;
	&:hover {
		background-color: #525357;
	}
`

const IconLeft = styled.span`
	${IconCssProperties};
`

const IconRight = styled.span`
	${IconCssProperties};
	margin-left: auto;
`

const NavBar = (props) => {
	return (
		<Nav>
			<NavElem>{ props.children }</NavElem>
		</Nav>
	)
}

const NavItem = (props) => {
	const [open, setOpen] = useState(false);

	return (
		<NavElemItem>
			<IconButton href="#" onClick={() => setOpen(!open)}>
				{ props.icon }
			</IconButton>
			{ open && props.menu } 
		</NavElemItem>
	)
}

const DropdownComponent = () => {

	const [activeMenu, setActiveMenu] = useState("menu");
	const [menuHeight, setMenuHeight] = useState(null);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	const DropdownItem = (props) => {
		return (
			<DropdownItemLink onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)} >
				{ props.activateLeft &&  <IconLeft> { props.leftIcon} </IconLeft> }
				{ props.children }
				{ props.activateRight &&  <IconRight> { props.rightIcon} </IconRight> }
			</DropdownItemLink>
		);
	}

	return (
		<DropdownMenuGlobalContainer style={{height: menuHeight}}>
			<CSSTransition in={activeMenu === "menu"} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
				<DropdownMenuContainer>
					<DropdownItem goToMenu="settings" activateLeft={true} leftIcon={<Icon className="fab fa-freebsd"/>} >
						Menu 1-1 
					</DropdownItem>
					<DropdownItem goToMenu="settings" activateLeft={true} leftIcon={<Icon className="fab fa-freebsd"/>} >
						Menu 1-2 
					</DropdownItem>
					<DropdownItem> Test </DropdownItem>
					<DropdownItem> Test </DropdownItem>
				</DropdownMenuContainer>
			</CSSTransition>

			<CSSTransition in={activeMenu === "settings"} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
				<DropdownMenuContainer>
					<DropdownItem goToMenu="menu" activateLeft={true} leftIcon={<Icon className="fas fa-arrow-circle-left"/>} >
						Menu 2-1 
					</DropdownItem>
					<DropdownItem goToMenu="menu" activateLeft={false} activateRight={true} rightIcon={<Icon className="fab fa-freebsd"/>}>
						Menu 2-2 
					</DropdownItem>
				</DropdownMenuContainer>
			</CSSTransition>
		</DropdownMenuGlobalContainer>
	);
}

function Dropdown() {

	return (
		<GlobalContainer>
			<NavBar>
				<NavItem icon={<Icon className="fas fa-dice"/>} />
				<NavItem icon={<Icon className="fab fa-freebsd"/>} />
				<NavItem icon={<Icon className="fas fa-dragon"/>} />
				<NavItem icon={<Icon className="fas fa-ellipsis-h"/>} menu={<DropdownComponent/>} />
			</NavBar>
		</GlobalContainer>
	);
}

export default Dropdown;


// Doc

// Dropdown main function
// NavBar contain NavItem 
// NavItem contain Icon and DropdownComponent (can be toggle open or close)
// DropdownComponent contains DropdowItem(s) that can alter it's state to switch between levels
// DropdownItem contain optionnal left/right icons (leave fragment or fill with icons)
// DropdownItem need activated(Direction) props to render the Icon

// CSSTransition from react-transition-group package help conditional rendering logic 
// Dropdown.css contain class names and animation instruction for CSSTransition
