import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './containers/homepage/home';
import NotFound from './components/notfound';

function Hyperloop() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route path="/" exact component={Home} />
				{/* <Route exact path="/" render={() => (loggedIn ? (
					<Redirect to="/suggests" />
					) : (
					<Redirect to="/account" />
				))} component={Home} /> */}
				{/* <Route path="/account" component={Account} /> */}
				{/* <Route path="/movie" component={Movie} /> */}
				{/* <Route path="/suggests" component={Recommander} /> */}
				<Route component={NotFound} />
			</Switch>
			{/* <Footer> */}
		</Router>
	);
}

ReactDOM.render(<Hyperloop />, document.getElementById('root'));
