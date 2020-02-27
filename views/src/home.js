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
import InfiniteScroll from 'react-infinite-scroll-component';

class PutFilm extends React.Component {

	render() {
		return (
			<div className="display-film">
				{ this.props.film.map((elem, index) => {
					var overview = elem.overview.substr(0, 100);
					overview[overview.length - 1] !== '.' ? overview = overview + " ..." : overview = overview + ''; 
					if (elem.overview === '')
						overview = '';
					if (elem.poster_path === null) {
						return ('');
					} else {
						return (
							<Card  key={ index } className="root">
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
}

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			film: [],
			pageNumber: 499,
			hasMore: true,
			genre: '',
		}
		this.load = 0;
		this.hasMore = true;
	}

	componentDidMount() {
		this.requestMovie();
	}	

	
	requestMovie = () => {
		const { film, pageNumber } = this.state;
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
		if (pageNumber >= 1000) {
			this.hasMore = false;
			return;
		} else {
			fetch(url, {
				headers: new Headers({
					'Content-Type': 'application/json',
				})
			})
			.then(async (response) => {
				if (response.ok) {
					return await response.json();
				}
			}).then((parsedData) => {
				if (!parsedData.ok !== false) {
					console.log("nooppe");
					this.setState({
						film: [...film, ...parsedData.results],
						pageNumber: this.state.pageNumber + 1,
					});
				}	
			}).catch((err) => { 
				console.log("error");
			})
		}
	}

	render() {
		return (
			<div>
				<React.Fragment>
      				<Container fixed>
						<Typography component="div" className="list-film" >
							<InfiniteScroll
								dataLength={this.state.film.length}
								next={this.requestMovie}
								hasMore={this.state.hasMore}
							>
								<PutFilm film={ this.state.film } />
							</InfiniteScroll>
						</Typography>
					</Container>
				</React.Fragment>
			</div>
		);
	}
}