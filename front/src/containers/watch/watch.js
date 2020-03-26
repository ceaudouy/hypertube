import React, { useEffect, useState } from "react";
import '../../css/watch.css';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
	  heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	  },
	  control: {
		padding: theme.spacing(2),
		margin: theme.spacing(1),
	  },
  }));

function InfoMovie(detail) {
	const classes = useStyles();
	
	// console.log(detail);
	return (
		 <div>
			<ExpansionPanel className="card">
				<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				>
					<Typography className={classes.heading}>More information</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="info">
				<div className="watch-date">
					<div>
						{ detail.release_date !== undefined ? detail.release_date : detail.first_air_date }
					</div>
					<div>
						{ detail.episode_run_time !== undefined ? detail.episode_run_time : detail.runtime } min
					</div>
					<Rating name="read-only" precision={ 0.5 } value={ detail.vote_average / 2 } size="small" readOnly />
				</div>
					<Paper className={classes.control}>
						<Typography paragraph>Overview:</Typography>
						<Typography paragraph>
							{detail.overview}
						</Typography>
        			</Paper>
					<Paper className={classes.control}>
						<Typography paragraph>Overview:</Typography>
						<Typography paragraph>
							{detail.overview}
						</Typography>
        			</Paper>
				</ExpansionPanelDetails>
			</ExpansionPanel>
    	</div>
	)
}


export default function Watch() {
	const type = window.location.href.split('?')[1].split('&')[0];
	const movie = window.location.href.split('&')[1];
	const [detail, setDetail] = useState([]);

	var info = 'https://api.themoviedb.org/3/' + type + '/' + movie + '?api_key=b936c3df071b03229069cfcbe5276410&language=en-US'
	useEffect(() => {
		fetch(info, {
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		}).then((response) => {
			if (response.ok) {
				return response.json();
			}
		}).then((parsedData) => {
			setDetail(parsedData);
		})
	}, [info])

	console.log(detail)
	return (
		<div className="watch-all">
			<div className="film">
			</div>
			{ detail.lenght === 0 ? '' : InfoMovie(detail) }
		</div>
	)
}