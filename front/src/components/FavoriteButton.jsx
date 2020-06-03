import React, {useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { COLORS, BREAK_POINTS } from '../config/style'

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







// export default class ButtonFavorite extends Component {
// 	constructor(props) {
// 		super (props);
// 		this.state = {
// 			color: this.props.favorites.includes(this.props.elem.id) === true ? 'red' : 'grey',
// 		}
// 	}

// 	addFavorite = (id) => {
// 		var token = localStorage.getItem('token');
// 		fetch(`http://localhost:3300/movie/addFavorites`, {
// 			method: 'POST',
// 			credentials: 'include',
// 			headers: new Headers({
// 				'Content-Type': 'application/json',
// 				'Authorization': token
// 			}),
// 			body: JSON.stringify(
// 				{
// 					id: id,
// 					type: this.props.type
// 				}
// 			)
// 		})
// 		this.setState({color : this.state.color === 'red' ? 'grey' : 'red'})
// 	}

// 	setColor() {
// 		var color = this.state.color;
// 		if (color === 'red') {
// 			return (<FavoriteIcon className="favorite" />)
// 		} else if (color === 'grey') {
// 			return (<FavoriteIcon className="" />)
// 		}
// 	}

// 	render() {
// 		return (
// 			<IconButton onClick={ e => this.addFavorite(this.props.elem.id)} aria-label="add to favorites">
// 				<div>
// 					{this.setColor()}
// 				</div>
// 			</IconButton>
// 		)
// 	}
// }
