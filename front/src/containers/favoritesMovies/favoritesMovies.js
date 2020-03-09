import React, { useState, useEffect } from 'react';
import '../../css/listFilm.css'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Rating from '@material-ui/lab/Rating';

class ButtonFavorite extends React.Component {
	constructor(props) {
		super (props);
		this.state = {
			color: this.props.favorites.includes(this.props.elem.id) === true ? 'red' : 'grey',
		}
	}

	addFavorite = (id) => {
		fetch(`http://localhost:8080/list/addFavorites`, {
			method: 'POST',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'}, //include token;
			body: JSON.stringify(
				{
					id: id,
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

function PutFilm(film, favorites) {
	return (
		<div className="display-film">
			{ film.map((elem, index) => {
				if (elem === null) {
					return ('');
				}
				var overview = '';
				if (elem.overview === '' || elem.overview === undefined || elem.overview === null) {
					overview = '';
				} else {
					overview = elem.overview.substr(0, 100);
					overview[overview.length - 1] !== '.' ? overview = overview + " ..." : overview = overview + '';
				}
				if (elem.poster_path === null) {
					return ('');
				} else {
					return (
							<Card key={ index } className="root">
							<CardHeader
							avatar={
								<Avatar aria-label="recipe" className="avatar"> {/* a modifier */}
								Vu
								</Avatar>
							}
							title={ elem.title }
							subheader= { elem.release_date }
							/>
							<img className="media" src={"http://image.tmdb.org/t/p/w185/" + elem.poster_path} alt="" />
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									{ overview }
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<ButtonFavorite elem={elem} favorites={ favorites } />
								{/* <IconButton aria-label="play/pause">
									<section className="portfolio-experiment">
										<a href="#`">
											<span className="text"><PlayArrowIcon className="play-icon" /></span>
											<span className="line -right"></span>
											<span className="line -top"></span>
											<span className="line -left"></span>
											<span className="line -bottom"></span>
										</a>
									</section>
								</IconButton> */}
								<Rating name="read-only" precision={0.5} value={elem.vote_average / 2 } size="small" readOnly />
							</CardActions>
						</Card>
					)
				}
			})}
		</div>
	)
}

export default function FavoritesMovies() {
	const [favorites, setFavorites] = useState([]);
	const [film, setFilm] = useState([]);
	const [loading, setLoading] = (false);

	useEffect(() => {
		setLoading(true);
		var fav;
		console.log("fetch")
		fetch(`http://localhost:8080/list/getFavorites`, {
			method: 'GET',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'}, //include token;
		}).then((response) => {
			return response.json();
		}).then((parsedData) => {
			fav = parsedData.favorites;
			setFavorites(parsedData.favorites);

		var tab = [];

		fav.forEach(element => {
			const url = 'https://api.themoviedb.org/3/movie/' + element + '?api_key=b936c3df071b03229069cfcbe5276410&language=en-US'
			fetch(url, {
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
			}).then((response) => {
				if (response.ok) {
					return response.json();
				}
			}).then((parsedData) => {
			// console.log(parsedData)
				if (parsedData !== undefined) {
					tab[0] = parsedData;
					setFilm(prevFilm => {
						return [...new Set([...prevFilm, ...tab])]
					});
				}
				// console.log(film);
			});
		})
	})
	setLoading(false);
}, []);

	// const {
	// 	film
	// } = GetMovies(favorites);

	console.log(film)
	if (favorites.length === 0) {
		return (
			<div className="loading">You don't have favorite movie</div>
		)
	} else {
		return (
			<div>
				<div className="loading">{loading && 'Loading...'}</div>
				{PutFilm(film, favorites)}
			</div>
		)
	}
}
