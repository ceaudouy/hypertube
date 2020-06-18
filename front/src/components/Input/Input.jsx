import React from "react"
import styled from "styled-components"
import { COLORS, BREAK_POINTS } from "../../config/style"

const InputName = styled.label`
	position: absolute;
	left: 0;
	z-index: -1;
	color: var(--text-color);
	transform-origin: 0%;
	transition: transform 400ms;
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		font-size: 1.2rem;
		transform: translateY(-2rem);
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		font-size: 0.8rem;
		transform: translateY(-0.5rem);
	}
`

const InputValue = styled.input`
	outline: none;
	border: none;
	overflow: hidden;
	margin: 0;
	width: 100%;
	padding: 0.25rem 0;
	background: none;
    color: white;
    && {
      margin-top: 0;
    }
	font-size: 1.2rem;
	font-weight: bold;
	&:valid {
		color: ${COLORS.GREEN};
	}
	&:invalid {
		color: ${COLORS.PINK_FLASHY};
	}
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		font-size: 1.2rem;
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		font-size: 0.8rem;
	}
`

const InputContainer = styled.div`
	--text-color: #afafaf;
	position: relative;
	width: 100%;
	border-bottom: 2px solid var(--text-color);
	margin: 4rem auto 1rem;
	&::after {
		content: "";
		position: relative;
		display: block;
		height: 4px;
		width: 100%;
		background: ${COLORS.PINK_FLASHY};
		transform: scaleX(0);
		transform-origin: 0%;
		transition: transform 500ms ease;
		top: 2px;
	}
	&:focus-within {
		border-color: transparent; 
	}
	&:focus-within ${InputName}, ${InputValue}:not(:placeholder-shown) + ${InputName} {
		transform: scale(0.8) translateY(-4rem);
	}
	&:focus-within::after {
		transform: scaleX(1);
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		&:focus-within ${InputName}, ${InputValue}:not(:placeholder-shown) + ${InputName} {
			transform: scale(0.8) translateY(-2rem);
		}
	}
`

const Input = ({type, name, value, handleChange}) => {
    return (
		<InputContainer>
    	    <InputValue type={type} name={name} placeholder="" value={value} onChange={handleChange} />
    	    <InputName htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</InputName>
    	</InputContainer>
	)
}

export default Input;