import React from 'react';
import './home.css'
class PutFilm extends React.Component {
	render() {
		return (
			<div className="display-film">
				{ this.props.film.map((elem, index) => {
					return (
						<div className="card mb-3 autre" key={index}>
						<img className="miniature" src={"http://image.tmdb.org/t/p/w185/" + elem.poster_path} alt="" />
						<h3 className="card-header">{elem.title}</h3>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
      							<textarea className="overview" readOnly="readonly" value={ elem.overview } />
							</li>
							<li className="list-group-item">{elem.release_date}</li>
							<li className="list-group-item">{elem.vote_average}</li>
						</ul>
						</div>
					)
				}) }
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
				<PutFilm film={ this.state.film } />
			
			</div>
			);
	}
}