import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
import Home from './home.js';
import Header from './header.js';

function App() {
	return (
		<Router>
			  <Header />
			<Switch>
			  <Route path="/">
				  <Home />
			  </Route>
			</Switch>
		</Router>
	  );
}

ReactDOM.render(<App />, document.getElementById('root'));