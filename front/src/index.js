import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import api from './api/api';

import Header from './components/header';
import Home from './containers/homepage/home';
import NotFound from './components/notfound';
import ListPage from './containers/listMovies/list_page';
import FavoritesMovies from './containers/favoritesMovies/favoritesMovies';
import SignOut from './containers/homepage/sign_out';
import ViewsMovies from './containers/viewsMovies/viewsMovies';
import Research from './containers/research/research';
import Watch from './containers/watch/watch';

import './index.css';

const AppContainer = styled.div`
	display: flex;
	flex: 1;
	height: auto;
	justify-content: center;
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
				return (<Redirect to={{pathname: '/login', state: {from: props.location }}} />);
			}}
		/>
	)
}

function Hyperloop() {
	const [user, setUser] = useState(undefined);


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

	return (
		<BrowserRouter>
			<Header />
			<AppContainer>
				<Switch>
					<Route path="/" exact component={ Home } />
					<Route path="/offline" component={ SignOut } />
					<Route path="/watch" exact component={ Watch } />
					<Route path="/search" exact component={ Research } />
					<Route path="/views" exact component={ ViewsMovies } />
					<Route path="/favorites" exact component={ FavoritesMovies } />
					<Route component={NotFound} />
					<AuthenticatedRoute exact path="/" component={ListPage} />
				</Switch>
			</AppContainer>
		</BrowserRouter>
	);
}

ReactDOM.render(<Hyperloop />, document.getElementById('root'));