import React from 'react';
import ButtonFavorite from './favoriteButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

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
							// avatar={
							// 	<Avatar aria-label="recipe" className="avatar"> {/* a modifier */}
							// 	Vu
							// 	</Avatar>
							// }
							title={ elem.title !== undefined ? elem.title : elem.original_name }
							subheader= { elem.release_date }
							/>
							<img className="media" src={"http://image.tmdb.org/t/p/w185/" + elem.poster_path} alt="" />
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									{ overview }
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<ButtonFavorite elem={ elem } favorites={ favorites } type={ type } />
								<Rating name="read-only" precision={0.5} value={elem.vote_average / 2 } size="small" readOnly />
							</CardActions>
						</Card>
					)
				}
			})}
		</div>
	)
}