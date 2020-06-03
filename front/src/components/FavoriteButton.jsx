import React, {useState} from 'react';
import styled from 'styled-components';
import { COLORS } from '../config/style'

const Icon = styled.i`
	width: 2rem;
	font-size: 2rem;
	min-width: 2rem;
	margin: 0 1.5rem;
`

export default function ButtonFavorite(props) {
	const [color, setColor] = useState(props.favorites.includes(props.elem.id) === true ? 'red' : 'grey');


	const handleClick = id => {
		var token = localStorage.getItem('token');
		// fetch(`http://localhost:3300/movie/addFavorites`, {
		// 	method: 'POST',
		// 	credentials: 'include',
		// 	headers: new Headers({
		// 		'Content-Type': 'application/json',
		// 		'Authorization': token
		// 	}),
		// 	body: JSON.stringify(
		// 		{
		// 			id: id,
		// 			type: props.type
		// 		}
		// 	)
		// })
		setColor(color == 'red' ? 'grey' : 'red');
	}

	return (
		<div onClick={ e => handleClick(props.elem.id) }>
			<FavoriteIcon className={color == 'red' ? "favorite" : ""} />
		</div>
	)
}
