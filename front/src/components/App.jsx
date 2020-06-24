import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import styled from 'styled-components'
import { SnackbarProvider } from 'notistack'

import api from '../api/api'
import { BREAK_POINTS } from '../config/style'

import Header from './Header/Header'
import Homepage from '../containers/Homepage/Homepage'
import NotFound from '../containers/NotFound/NotFound'
import Search from '../containers/Search/Search'
import SignIn from '../containers/SignIn/SignIn'
import SignUp from '../containers/SignUp/SignUp'
import FavoritesMovies from '../containers/FavoritesMovies/FavoritesMovies'
import ViewsMovies from '../containers/ViewsMovies/ViewsMovies'
import GameOfLife from '../containers/GameOfLife/GameOfLife'
import Watch from '../containers/Watch/Watch'
import Profile from '../containers/Profile/Profile'
import User from '../containers/User/User'
import Reset from '../containers/Reset/Reset'
import Password from '../containers/Password/Password'

import { MenuContextProvider } from '../context/MenuContext'

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

// const AuthenticatedRoute = ({ component: Component, ...rest}) => {
// 	return (
// 		<Route 
// 			{...rest}
// 			render = { props => {
// 				api.get('/user')
// 				.then(() => {console.log("succes"); return (<Component {...props} />)})
// 				.catch(() => {console.log("error"); return (<Redirect to={{pathname: '/signin', state: {from: props.location }}} />)})
// 			}}
// 		/>
// 	)
// }

function App() {
	if (localStorage.getItem('token'))
		api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
			<MenuContextProvider>
			<BrowserRouter>
				<Header />
				<AppContainer id="AppContainer">
					<Switch>
						<Route exact path="/" component={ Homepage } />
						<Route exact path="/signup" component={ SignUp } />
						<Route exact path="/signin" component={ SignIn } />
						<Route exact path="/reset" component={ Reset } />
						<Route exact path="/password/:token" component={ Password } />
						<AuthenticatedRoute exact path="/profile" component={ Profile } />
						<AuthenticatedRoute exact path="/watch/:id/:imdb" exact component={ Watch } />
						<AuthenticatedRoute exact path="/views" component={ ViewsMovies } />
						<AuthenticatedRoute exact path="/favorites" component={ FavoritesMovies } />
						<AuthenticatedRoute exact path="/search" component={ Search } />
						<AuthenticatedRoute exact path="/user/:id" component={ User } />
						<AuthenticatedRoute exact path="/gameoflife" component={ GameOfLife } />
						<Route path='/porn' component={() => {window.location.href = 'https://pornhub.com'}}/>
						<Route path='/real' component={() => {window.location.href = 'https://netflix.com'}}/>
						<Route path="*" component={NotFound} />
					</Switch>
				</AppContainer>
			</BrowserRouter>
			</MenuContextProvider>
		</SnackbarProvider>
	);
}

export default App;