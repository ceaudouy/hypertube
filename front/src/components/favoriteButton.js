import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

export default class ButtonFavorite extends Component {
	constructor(props) {
		super (props);
		this.state = {
			color: this.props.favorites.includes(this.props.elem.id) === true ? 'red' : 'grey',
		}
	}

	addFavorite = (id) => {
		var token = localStorage.getItem('token');
		fetch(`http://localhost:3300/list/addFavorites`, {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': token
			}),
			body: JSON.stringify(
				{
					id: id,
					type: this.props.type
				}
			)
		})
		this.setState({color : this.state.color === 'red' ? 'grey' : 'red'})
	}

	setColor() {
		var color = this.state.color;
		if (color === 'red') {
			return (<FavoriteIcon className="favorite" />)
		} else if (color === 'grey') {
			return (<FavoriteIcon className="" />)
		}
	}

	render() {
		return (
			<IconButton onClick={ e => this.addFavorite(this.props.elem.id)} aria-label="add to favorites">
				<div>
					{this.setColor()}
				</div>
			</IconButton>
		)
	}
}
