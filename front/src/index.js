import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import '@fortawesome/fontawesome-free/js/all'

import api from './api/api';
import { BREAK_POINTS } from './config/style';

import Header from './components/Header';
import Home from './containers/Homepage/Home';
import NotFound from './components/NotFound';
import ListPage from './containers/ListMovies/ListPage';
import SignIn from './containers/Homepage/SignIn';
import SignUp from './containers/Homepage/SignUp';
import FavoritesMovies from './containers/FavoritesMovies/FavoritesMovies';
import SignOut from './containers/Homepage/SignOut';
import ViewsMovies from './containers/ViewsMovies/ViewsMovies';
import Research from './containers/Research/Research';
import Watch from './containers/Watch/Watch';

import './index.css';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: auto;
	flex: 1;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		min-height: 100vh;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		min-height: 100vh;
	}
	& > * {
		width: 100%;
	}
`

// const AuthenticatedRoute = ({ component: Component, ...rest}) => {
// 	return (
// 		<Route 
// 			{...rest}
// 			render = { props => {
// 				if (localStorage.getItem("token"))
// 				return (<Component {...props} />)
// 				return (<Redirect to={{pathname: '/login', state: {from: props.location }}} />);
// 			}}
// 		/>
// 	)
// }

function Hyperloop() {
	const [user, setUser] = useState(undefined);

	let token = localStorage.getItem('token');

	if ( token === null && window.location.href !== 'http://localhost:3000/') {
		document.location.href='/';
	}

	// if (localStorage.getItem('token') && !api.defaults.headers.common['Authorization']) {
	// 	api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
	// 	api.get('/user/me')
	// 	.then((res) => {
	// 		setUser(res.data);
	// 	})
	// 	.catch(err => {
	// 		delete api.defaults.headers.common['Authorization'];
	// 		console.log(err);
	// 	});
	// }

	return (
		<BrowserRouter>
			<Header />
			<AppContainer id="AppContainer">
				<Switch>
					<Route path="/" exact component={ Home } />
					<Route path="/signin" component={ SignIn } />
					<Route path="/signup" component={ SignUp } />
					<Route path="/offline" component={ SignOut } />
					<Route path="/watch" exact component={ Watch } />
					<Route path="/search" exact component={ Research } />
					<Route path="/views" exact component={ ViewsMovies } />
					<Route path="/favorites" exact component={ FavoritesMovies } />
					{/* <AuthenticatedRoute exact path="/" component={ListPage} /> */}
					<Route path="*" component={NotFound} />
				</Switch>
			</AppContainer>
		</BrowserRouter>
	);
}

ReactDOM.render(<Hyperloop />, document.getElementById('root'));