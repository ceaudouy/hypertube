import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
import Home from './home.js';
import Header from './header.js';

function App() {
	const [ query, setQuery ] = useState('https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=');

	return (
		<Router>
			  { Header(query, setQuery) }
			<Switch>
			  <Route path="/">
				  { Home(query, setQuery) }
			  </Route>
			</Switch>
		</Router>
	  );
}

ReactDOM.render(<App />, document.getElementById('root'));