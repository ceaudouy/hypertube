import React, { useState, useEffect, useContext } from "react"
import styled, { css } from "styled-components"
import { CSSTransition } from "react-transition-group"

import { MenuContext } from "../../../context/MenuContext"
import { COLORS, BREAK_POINTS } from "../../../config/style"
import { optionsGenre, sortBy, optionsOrder } from '../allOption';
import "./Dropdown.css"

const GlobalContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const SDropCssProperties = css`
	--bg:#242526;
	--bg-accent: #484a4d;
	--text-color: #dadce1;
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

const Drop = styled.div`
	${SDropCssProperties};
	position: relative;
	padding: 0 1rem;
	border-bottom: var(--border);
`

const DropElem = styled.ul`
	max-width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
`

const DropElemItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
`

const Icon = styled.i`
	color: ${COLORS.GREY_LIGHT};
	&:hover{
		color: ${COLORS.GREEN};
	}
`

const IconCssProperties = css`
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
	max-height: 40vh;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 50vw;
		max-height: 70vh;
		transform: translateX(-25%);
	}
	top: 58px;
	background-color: var(--bg);
	border: var(--border);
	border-radius: var(--border-radius);
	padding: 1rem;
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
		background: ${COLORS.GREY_LIGHT};
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

const DropBar = (props) => {
	return (
		<Drop>
			<DropElem>{ props.children }</DropElem>
		</Drop>
	)
}

const DropItem = (props) => {
	const [open, setOpen] = useState(false);

	return (
		<DropElemItem>
			<IconButton href="#" onClick={() => {
				props.click && props.click()
				setOpen(!open)
			}}>
				{ props.icon }
			</IconButton>
			{ props.menu && open && props.menu } 
		</DropElemItem>
	)
}

const DropdownComponent = () => {
	const [menuCtx, setMenuCtx] = useContext(MenuContext);

	const [activeMenu, setActiveMenu] = useState("menu");
	const [menuHeight, setMenuHeight] = useState(null);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	const DropdownItem = ({value, children, activateLeft, activateRight, rightIcon, leftIcon, goToMenu, menu}) => {

		const update = (menu) => {
			console.log("update");
			setActiveMenu(menu);
			if (menu === "genre")
				menuCtx.setGenre(value);
			else if (menu === "sort")
				menuCtx.setSort(value);
			else if (menu === "order")
				menuCtx.setOrder(value);
			console.log(menuCtx.genre);
		}

		return (
			<DropdownItemLink onClick={() => goToMenu && update(goToMenu)}>
				{ activateLeft &&  <IconLeft> { leftIcon} </IconLeft> }
				{ children }
				{ activateRight &&  <IconRight> { rightIcon} </IconRight> }
			</DropdownItemLink>
		);
	}

	return (
		<DropdownMenuGlobalContainer style={{height: menuHeight}}>

			<CSSTransition in={activeMenu === "menu"} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
				<DropdownMenuContainer>
					<DropdownItem goToMenu="genre">Genre</DropdownItem>
					<DropdownItem goToMenu="sort">Sort by</DropdownItem>
					<DropdownItem goToMenu="order">Order</DropdownItem>
				</DropdownMenuContainer>
			</CSSTransition>

			<CSSTransition in={activeMenu === "genre"} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
				<DropdownMenuContainer>
					{
						optionsGenre.map((text, index) => {
							return (
								<DropdownItem goToMenu="menu" value={text.label} key={`genre.${index}`}>
									{text.label}
								</DropdownItem>
							);
						})
					}
				</DropdownMenuContainer>
			</CSSTransition>

			<CSSTransition in={activeMenu === "sort"} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
				<DropdownMenuContainer>
					{
						sortBy.map((text, index) => {
							return (
								<DropdownItem goToMenu="menu" value={text.label} key={`genre.${index}`}>
									{text.label}
								</DropdownItem>
							);
						})
					}
				</DropdownMenuContainer>
			</CSSTransition>


			<CSSTransition in={activeMenu === "order"} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
				<DropdownMenuContainer>
					{
						optionsOrder.map((text, index) => {
							return (
								<DropdownItem goToMenu="menu" key={`order.${index}`}>
									{text.label}
								</DropdownItem>
							);
						})
					}
				</DropdownMenuContainer>
			</CSSTransition>

			{/* <CSSTransition in={activeMenu === "date"} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
				<DropdownMenuContainer>
					{
						optionsDate.map((text, index) => {
							return (
								<DropdownItem goToMenu="menu" key={`date.${index}`}>
									{text.label}
								</DropdownItem>
							);
						})
					}
				</DropdownMenuContainer>
			</CSSTransition> */}

			{/* <CSSTransition in={activeMenu === "stars"} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
				<DropdownMenuContainer>
					{
						optionsStars.map((text, index) => {
							return (
								<DropdownItem goToMenu="menu" key={`stars.${index}`}>
									{text.label}
								</DropdownItem>
							);
						})
					}
				</DropdownMenuContainer>
			</CSSTransition> */}

		</DropdownMenuGlobalContainer>
	);
}

function Dropdown() {
	const [menuCtx, setMenuCtx] = useContext(MenuContext);
	
	// useEffect(() => {
	// 	menuCtx.setGenre("lala");
	//   }, [menuCtx.setGenre])

	// console.log("genre = ", menuCtx.genre);
	
	const handleSubmit = () => {
		console.log("hey bitch")
	}

	return (
		<GlobalContainer>
			<DropBar>
				<DropItem icon={<Icon className="fas fa-ellipsis-h"/>} menu={<DropdownComponent/>}/>
				<DropItem icon={<Icon className="far fa-check-circle"/>} click={handleSubmit} />
			</DropBar>
		</GlobalContainer>
	);
}

export default Dropdown;


// Doc

// Dropdown main function
// DropBar contain DropItem 
// DropItem contain Icon and DropdownComponent (can be toggle open or close)
// DropdownComponent contains DropdowItem(s) that can alter it's state to switch between levels
// DropdownItem contain optionnal left/right icons (leave fragment or fill with icons)
// DropdownItem need activated(Direction) props to render the Icon

// CSSTransition from react-transition-group package help conditional rendering logic 
// Dropdown.css contain class names and animation instruction for CSSTransition
