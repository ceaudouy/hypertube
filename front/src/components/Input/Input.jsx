import React from "react"
import styled from "styled-components"
import { COLORS } from "../../config/style"

const InputName = styled.label`
	color: var(--text-color);
	font-size: 1.2rem;
	z-index: -1;
	position: absolute;
	left: 0;
	transform: translateY(-2rem);
	transform-origin: 0%;
	transition: transform 400ms;
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
`

const InputContainer = styled.div`
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
		transform: scale(0.8) translateY(-5rem);
	}

	&:focus-within::after {
		transform: scaleX(1);
	}
`

const Input = ({type, name, handleChange}) => (
    <InputContainer>
        <InputValue type={type} name={name} placeholder=" " onChange={handleChange} />
        <InputName htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</InputName>
    </InputContainer>
)

export default Input;