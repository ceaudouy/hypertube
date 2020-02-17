import React from 'react';

class Putfilm extends React.Component {
	constructor(props){
		super(props)
		console.log("pops" + this.props.film);
	};


	render() {
		return ('');
	}
}


export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			film: '',
		}
		this.load = 0;
	}

	request() {
		this.load = 1;
		fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`, {
			headers: new Headers({
				'Content-Type': 'application/json',
			})
		})
			.then((response) => {
			return response.json();
		}).then((parsedData) => {
			this.setState ({
				film: parsedData,
			})
		});
	}

	render() {
		if (this.load === 0) {
			this.request();
		}
		return (
			<div>
				<Putfilm film={ this.state.film } />
			</div>
			);
	}
}