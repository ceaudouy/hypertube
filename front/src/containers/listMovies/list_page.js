import React, { useState, useEffect } from 'react';
import OptionMenu from './option';
import listFilm from './listFilm';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
  root: {
	  width: 500,
	  backgroundColor: '#333',
},
button: {
	color: '#f50057',
	variant: 'outlined',
  }
});

function TypeSearch(type, setType, setQuery) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
	  setQuery('https://api.themoviedb.org/3/discover/' + type +'?api_key=b936c3df071b03229069cfcbe5276410&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=')
	//   console.log("oui");
  }, [type])

  return (
    <BottomNavigation
	  value={value}
      onChange={(event, newValue) => {
		  	setValue(newValue);
		  	setType(newValue === 0 ? 'movie' : 'tv');
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={classes.button} label="Movies" />
      <BottomNavigationAction className={classes.button} label="Series" />
    </BottomNavigation>
  );
}

export default function ListPage(query, setQuery) {
	const [favorites, setFavorites] = useState(['empty']);
	const [type, setType] = useState('movie');

	useEffect(() => {
		var token = localStorage.getItem('token');
		fetch(`http://localhost:3300/list/getFavorites`, {
			method: 'GET',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': token
			}),
		}).then((response) => {
			return response.json();
		}).then((parsedData) => {
			setFavorites(parsedData.favorites);
		})
	}, [])

	return (
		<div>
			{ TypeSearch(type, setType, setQuery) }
			<div className="home-page">
				{OptionMenu(setQuery)}
				{listFilm(query, favorites, type)}
			</div>
		</div>
	)
}
