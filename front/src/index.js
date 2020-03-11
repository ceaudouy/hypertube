import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header';
import Home from './containers/homepage/home';
import NotFound from './components/notfound';
import ListPage from './containers/listMovies/list_page';
import FavoritesMovies from './containers/favoritesMovies/favoritesMovies';
import SignOut from './containers/homepage/sign_out';

function Hyperloop() {
	const [query, setQuery] = useState('https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=');
	let token = localStorage.getItem('token');

	// Road for FRONT-END
	return (
		<Router>
			{ Header(query, setQuery) }
			<Switch>
				<Route path="/" exact component={ Home } />
				<Route exact path="/" render={() => (token === null ? (
					<Redirect to="/" />
					) : (
					<Redirect to="/suggests" />
				))} component={ Home } />
				<Route path="/suggests">
					{ ListPage(query, setQuery) }
				</Route>
				<Route path="/favorites" component={ FavoritesMovies } />
				{/* <Route path="/account" component={Account} /> */}
				{/* <Route path="/movie" component={Movie} /> */}
				<Route path="/offline" component={ SignOut }/>
				<Route component={ NotFound } />
			</Switch>
			{/* <Footer> */}
		</Router>
	);
}

ReactDOM.render(<Hyperloop />, document.getElementById('root'));
