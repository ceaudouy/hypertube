import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
import "bootswatch/dist/darkly/bootstrap.min.css";
import Home from './home.js';
import Header from './header.js';

function App() {
	return (
		<Router>
			<Switch>
				{/* <Header /> */}
			  <Route path="/">
				  <Home />
			  </Route>
			</Switch>
		</Router>
	  );
}

ReactDOM.render(<App />, document.getElementById('root'));