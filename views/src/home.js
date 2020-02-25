import React from 'react';
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

class PutFilm extends React.Component {

	render() {
		return (
			<div className="display-film">
				{ this.props.film.map((elem, index) => {
					var overview = elem.overview.substr(0, 100);
					overview[overview.length - 1] !== '.' ? overview = overview + " ..." : overview = overview + ''; 
					return (
						<Card  key={ index } className="root">
							<CardHeader
							avatar={
								<Avatar aria-label="recipe" className="avatar"> {/* a modifier */}
								Vu
								</Avatar>
							} 
							title={ elem.title }
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
								<section class="portfolio-experiment">
									<a href="#`">
										<span class="text"><PlayArrowIcon className="play-icon" /></span>
										<span class="line -right"></span>
										<span class="line -top"></span>
										<span class="line -left"></span>
										<span class="line -bottom"></span>
									</a>
								</section>
							</IconButton>
		
							</CardActions>
						</Card>
					)
				})}
			</div>
		)
	}
}

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			film: [],
		}
		this.load = 0;
	}

	request() {
		this.load = 1;
		fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`, {
			headers: new Headers({
				'Content-Type': 'application/json',
			})
		}).then((response) => {
			return response.json();
		}).then((parsedData) => {
			this.setState ({
				film: parsedData.results,
			})
			console.log(this.state.film);
		});
	}

	render() {
		if (this.load === 0) {
			this.request();
		}
		return (
			<div>
				<React.Fragment>
      			<Container fixed>
        			<Typography component="div" className="list-film" >
						<PutFilm film={ this.state.film } />
					</Typography>
      			</Container>
    			</React.Fragment>
			</div>
			);
	}
}