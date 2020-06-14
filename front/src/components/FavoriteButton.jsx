import React, {useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import api from '../api/api'

export default function ButtonFavorite(props) {

	// console.log(props.favorites[0].movie);
	const [color, setColor] = useState(props.favorites.includes(props.elem.id) === true ? 'red' : 'grey');


	const handleClick = id => {
		const obj = {type: props.type, movie: id};

		api.post('/movie/favorites', obj)
		.then((res) => {
			console.log(res)
		})
		.catch((err) => {
			console.log(err)
		})
		setColor(color == 'red' ? 'grey' : 'red');
	}

	return (
		<div onClick={ e => handleClick(props.elem.id) }>
			<FavoriteIcon className={color == 'red' ? "favorite" : ""} />
		</div>
	)
}