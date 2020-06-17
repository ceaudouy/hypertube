import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/all'
import App from './components/App.jsx';
import './index.css';

<<<<<<< HEAD
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

	if (localStorage.getItem('token'))
		api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
			<BrowserRouter>
				<Header />
				<AppContainer id="AppContainer">
					<Switch>
						<Route exact path="/" component={ Homepage } />
						<Route exact path="/signup" component={ SignUp } />
						<Route exact path="/signin" component={ SignIn } />
						<AuthenticatedRoute exact path="/watch/:type/:id" exact component={ Watch } />
						<AuthenticatedRoute exact path="/views" exact component={ ViewsMovies } />
						<AuthenticatedRoute exact path="/favorites" exact component={ FavoritesMovies } />
						<AuthenticatedRoute exact path="/listpage" component={ListPage} />
						<AuthenticatedRoute exact path="/gameoflife" component={GameOfLife} />
						<Route path="*" component={NotFound} />
					</Switch>
				</AppContainer>
			</BrowserRouter>
		</SnackbarProvider>
	);
}

ReactDOM.render(<Hyperloop />, document.getElementById('root'));
=======
ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> origin/nico
