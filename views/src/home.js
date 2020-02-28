import React, { useState, useRef, useCallback } from 'react';
import './home.css'
import './home.scss'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Container from '@material-ui/core/Container';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FetchAllMovies from './fetch';



function PutFilm(film, lastFilmElementRef) {
	return (
		<div className="display-film">
			{ film.map((elem, index) => {
				var overview = elem.overview.substr(0, 100);
				overview[overview.length - 1] !== '.' ? overview = overview + " ..." : overview = overview + ''; 
				if (elem.overview === '')
					overview = '';
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
								<IconButton aria-label="add to favorites">
									<FavoriteIcon />
								</IconButton>
								<IconButton aria-label="play/pause">
									<section className="portfolio-experiment">
										<a href="#`">
											<span className="text"><PlayArrowIcon className="play-icon" />Voir le film</span>
											<span className="line -right"></span>
											<span className="line -top"></span>
											<span className="line -left"></span>
											<span className="line -bottom"></span>
										</a>
									</section>
								</IconButton>
							</CardActions>
						</Card>
					)
				}
			})}
		</div>
	)
}




const useStyles = makeStyles(theme => ({
	button: {
	  display: 'block',
	  marginTop: theme.spacing(2),
	},
	formControl: {
	  margin: theme.spacing(1),
	  minWidth: 120,
	},
}));
  
function ControlledOpenSelect(setQuery, setPageNumber) {
	const classes = useStyles();
	const [genre, setGenre] = React.useState('');
	const [open, setOpen] = React.useState(false);
  
	const handleChange = event => {
	  setGenre(event.target.value);
	  setPageNumber(1);
	  setQuery('https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&&with_genres=' + event.target.value + '&page=');
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
  
	const handleOpen = () => {
	  setOpen(true);
	};
  
	return (
	  <div className="option-menu">
		<FormControl className={classes.formControl}>
		  <InputLabel id="demo-controlled-open-select-label">Genre</InputLabel>
		  <Select
			labelId="demo-controlled-open-select-label"
			id="demo-controlled-open-select"
			open={open}
			onClose={handleClose}
			onOpen={handleOpen}
			value={genre}
			onChange={handleChange}
		  >
			<MenuItem value="">
			  <em>None</em>
			</MenuItem>
			<MenuItem value={28}>Action</MenuItem>
			<MenuItem value={12}>Adventure</MenuItem>
			<MenuItem value={16}>Animation</MenuItem>
			<MenuItem value={35}>Comedy</MenuItem>
			<MenuItem value={80}>Crime</MenuItem>
			<MenuItem value={99}>Documentary</MenuItem>
			<MenuItem value={18}>Drama</MenuItem>
			<MenuItem value={10751}>Family</MenuItem>
			<MenuItem value={14}>Fantasy</MenuItem>
			<MenuItem value={36}>History</MenuItem>
			<MenuItem value={27}>Horror</MenuItem>
			<MenuItem value={10402}>Music</MenuItem>
			<MenuItem value={9648}>Mystery</MenuItem>
			<MenuItem value={10749}>Romance</MenuItem>
			<MenuItem value={878}>Sciense Fiction</MenuItem>
			<MenuItem value={10770}>TV Movie</MenuItem>
			<MenuItem value={53}>Thriller</MenuItem>
			<MenuItem value={10752}>War</MenuItem>
			<MenuItem value={37}>Western</MenuItem>
		  </Select>
		</FormControl>
	  </div>
	);
  }



export default function Home() {
	const [ query, setQuery ] = useState('https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=');
	const [ pageNumber, SetPageNumber ] = useState(1);
	
	const {
		film,
		hasMore,
		loading,
		error
	} = FetchAllMovies(query, pageNumber);

	const observer = useRef();
	const lastFilmElementRef = useCallback(node => {
		if (loading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				SetPageNumber(prevPageNumber => prevPageNumber + 1);
			}
		})
		if (node) observer.current.observe(node)
	}, [loading, hasMore])


	return (
		<div className="home-page">
			{ ControlledOpenSelect(setQuery, SetPageNumber) }
			<React.Fragment>
				<Container fixed>
					<Typography component="div" className="list-film" >
						{ PutFilm(film, lastFilmElementRef) }
						<div>{loading && 'Loading...'}</div> 
						<div>{error && 'Error'}</div>
					</Typography>
				</Container>
			</React.Fragment>
		</div>
	) 
}



















