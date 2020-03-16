import React, { useEffect } from 'react';
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
  
export default function TypeSearch(type, setType, setQuery, query) {
	const classes = useStyles();
	  const [value, setValue] = React.useState(0);
	  var tmp = query.split('/')[5].split('?')[1];
	  var option = query.split('/')[4];

	  
	useEffect(() => {
		setQuery('https://api.themoviedb.org/3/' + option + '/' + type + '?' + tmp);
	}, [type, setQuery, tmp, option])
  
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