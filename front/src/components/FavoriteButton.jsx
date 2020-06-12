import React, {useState} from 'react';
import styled from 'styled-components';
import { COLORS } from '../config/style'

const Icon = styled.i`
	width: 2rem;
	font-size: 2rem;
	min-width: 2rem;
	margin: 0 1.5rem;
`

export default function ButtonFavorite(elem, favorites, type) {
	// const [color, setColor] = useState(COLORS.GREEN);
	var color = COLORS.GREEN


	const handleClick = event => {
		console.log(event)
		color = color == COLORS.BLACK ? COLORS.GREEN : COLORS.BLACK;
	}

	return (
		<div onClick={ e => handleClick(e) }>
			<Icon style={{color: color}} className="fas fa-heart"></Icon>
		</div>
	)
}
