import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Card, CardHeader, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import ButtonFavorite from './favoriteButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const playmovie = (elem, type) => {
	document.location.href = '/watch?' + type + '&' + elem.id// encodeURI(elem.title !== undefined ? elem.title : elem.original_name); 
}

export default function PutFilm(film, favorites, type, lastFilmElementRef) {
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
						<Card ref={lastFilmElementRef} key={ index } className="root">
							<CardHeader
							title={ elem.title !== undefined ? elem.title : elem.original_name }
							subheader= { elem.release_date }
							/>
							<img className="media" src={"http://image.tmdb.org/t/p/w185/" + elem.poster_path} alt="" />
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									{ overview }
								</Typography>
							</CardContent>
							<CardActions disableSpacing className="button-card">
								<ButtonFavorite elem={ elem } favorites={ favorites } type={ type } />
								{/* <IconButton onClick={ e => playmovie(elem, type) } aria-label="add to favorites">
									<PlayCircleOutlineIcon />
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
