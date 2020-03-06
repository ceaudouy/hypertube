import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
import Home from './containers/listFilm';
import Header from './components/header';
import './css/index.css'

function App() {
	const [ query, setQuery ] = useState('https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=');

	return (
		<Router>
			  { Header(query, setQuery) }
			<Switch>
			  <Route path="/list">
				  { Home(query, setQuery) }
			  </Route>
			</Switch>
		</Router>
	  );
}

ReactDOM.render(<App />, document.getElementById('root'));