import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/header';
import Home from './containers/homepage/home';
import NotFound from './components/notfound';
import ListPage from './containers/listMovies/list_page';
import FavoritesMovies from './containers/favoritesMovies/favoritesMovies';
import SignOut from './containers/homepage/sign_out';
import ViewsMovies from './containers/viewsMovies/viewsMovies';
import Research from './containers/research/research';

function Hyperloop() {
	let token = localStorage.getItem('token');

	// Road for FRONT-END
	return (
		<Router>
		 	<Header />
		 	<Switch>
		 		<Route path="/" exact component={ token === null ? Home : ListPage } />
		 		<Route  path="/favorites" exact component={ FavoritesMovies } />
		 		<Route  path="/views" exact component={ ViewsMovies } />
		 		<Route  path="/search" exact component={ Research } />
		 		<Route path="/offline" component={ SignOut }/>
				<Route component={NotFound} />
		 	</Switch>
		 </Router>
	);
}

ReactDOM.render(<Hyperloop />, document.getElementById('root'));
