import React, { useState, useRef, useCallback } from 'react';
import '../../css/listFilm.css'
import '../../css/listFilm.scss'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Container from '@material-ui/core/Container';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FetchAllMovies from './fetch';
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


function PutFilm(film, lastFilmElementRef, favorites) {
	return (
		<div className="display-film">
			{ film.map((elem, index) => {
				if (elem === null || elem.genre_ids.length === 0) {
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
							<Card ref={lastFilmElementRef} key={ index } className="root">
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


export default function ListFilm(query, setQuery, favorites) {
	const [ pageNumber, setPageNumber ] = useState(1);

	

	const {
		film,
		hasMore,
		loading,
		error,
	} = FetchAllMovies(query, pageNumber, setPageNumber);

	const observer = useRef();
	const lastFilmElementRef = useCallback(node => {
		if (loading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				setPageNumber(prevPageNumber => prevPageNumber + 1);
			}
		})
		if (node) observer.current.observe(node)
	}, [loading, hasMore])
	
	if (favorites[0] !== "empty") {
		return (
			<div>
				<React.Fragment>
					<Container fixed>
						<Typography component="div" className="list-film" >
							{ PutFilm(film, lastFilmElementRef, favorites) }
							<div className="loading">{loading && 'Loading...'}</div> 
							<div>{error && 'Error'}</div>
						</Typography>
					</Container>
				</React.Fragment>
			</div>
		) 
}
}