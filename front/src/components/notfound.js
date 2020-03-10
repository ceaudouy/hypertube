import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(theme => ({
	notFound: {
		paddingTop: "100px",
		textAlign: "center",
		color: "white",
		fontSize: "2vw",
	}
}));

function NotFound() {
	const classes = useStyle();

	return (
		<div className={classes.notFound}>
			<h3>Sorry, page not found!</h3>
		</div>
	);
}

export default NotFound;
