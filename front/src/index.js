import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import '@fortawesome/fontawesome-free/js/all'

import api from './api/api';
import { UserContext } from './context/UserContext'
import { BREAK_POINTS } from './config/style';

import Header from './components/Header';
import Homepage from './containers/Homepage/Homepage';
import NotFound from './components/NotFound';
import ListPage from './containers/ListMovies/ListPage';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import FavoritesMovies from './containers/FavoritesMovies/FavoritesMovies';
import ViewsMovies from './containers/ViewsMovies/ViewsMovies';
import GameOfLife from './containers/GameOfLife/GameOfLife';
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
		margin-left: 5rem;
		min-height: 100vh;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		margin-bottom: 5rem;
		min-height: 100vh;
	}
	& > * {
		width: 100%;
	}
`

const AuthenticatedRoute = ({ component: Component, ...rest}) => {
	return (
		<Route 
			{...rest}
			render = { props => {
				if (localStorage.getItem("token"))
				return (<Component {...props} />)
				return (<Redirect to={{pathname: '/signin', state: {from: props.location }}} />);
			}}
		/>
	)
}

function Hyperloop() {
	const [user, setUser] = useState(undefined);

	// let token = localStorage.getItem('token');

	// if ( token === null && window.location.href !== 'http://localhost:3000/') {
	// 	document.location.href='/';
	// }

	if (localStorage.getItem('token') && !api.defaults.headers.common['Authorization']) {
		api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
		api.get('/user/me')
		.then((res) => {
			setUser(res.data);
		})
		.catch(err => {
			delete api.defaults.headers.common['Authorization'];
			console.log(err);
		});
	}

	console.log("index.js => user: ", user);

	return (
		<UserContext.Provider value={[user, setUser]}>
			<BrowserRouter>
				<Header />
				<AppContainer id="AppContainer">
					<Switch>
						<Route path="/" exact component={ Homepage } />
						<Route path="/signup" component={ SignUp } />
						<Route path="/signin" component={ SignIn } />
						<AuthenticatedRoute exact path="/watch" exact component={ Watch } />
						<AuthenticatedRoute exact path="/search" exact component={ Research } />
						<AuthenticatedRoute exact path="/views" exact component={ ViewsMovies } />
						<AuthenticatedRoute exact path="/favorites" exact component={ FavoritesMovies } />
						<AuthenticatedRoute exact path="/listpage" component={ListPage} />
						<AuthenticatedRoute exact path="/gameoflife" component={GameOfLife} />
						<Route path="*" component={NotFound} />
					</Switch>
				</AppContainer>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

ReactDOM.render(<Hyperloop />, document.getElementById('root'));