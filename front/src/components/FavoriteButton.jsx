import React, {useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
