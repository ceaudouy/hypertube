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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SelectEpisode from './SelectEpisode';
import Comment from './Comment';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 250,
		margin: theme.spacing(1),
	  }, 
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	  },
	  control: {
		padding: theme.spacing(2),
		margin: theme.spacing(1),
	  },
}));

function PutCasting(casting) {
	const classes = useStyles();

	return (
		<div>
			<Paper className={classes.control}>
				<Typography paragraph>Casting:</Typography>
				<div className="display-casting">
					{ casting.map((elem, index) => {
						if (elem.profile_path === undefined || elem.profile_path === null) {
							return ('');
						}
						return (
							<Card key={ index } className="casting">
								<CardContent>
								<img className="media" src={"http://image.tmdb.org/t/p/w185/" + elem.profile_path} alt="" />
								<Typography gutterBottom variant="h5" component="h2">
									{ elem.name }
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{ elem.character }
								</Typography>
								</CardContent>
							</Card>
						)
					})}
				</div>
        	</Paper>
		</div>
	)
}

function InfoMovie(detail, casting) {
	const classes = useStyles();

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
							{ detail.episode_run_time !== undefined ? detail.episode_run_time === undefined ? "error" : detail.episode_run_time[0] : detail.runtime } min
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
						<Typography paragraph>Genres:</Typography>
						<div className="watch-genre">
							{detail.genres === undefined ? '' : detail.genres.map((elem, index) => {
								return (
									<div className="genres" key={ index } >
										{ elem.name }
									</div>
								)
							})}
						</div>
					</Paper>
					{ PutCasting(casting) }
				</ExpansionPanelDetails>
			</ExpansionPanel>
    	</div>
	)
}

export default function Watch() {
	const type = window.location.href.split('?')[1].split('&')[0];
	const movie = window.location.href.split('&')[1];
	const [detail, setDetail] = useState([]);
	const [casting, setCasting] = useState([]);

	var info = 'https://api.themoviedb.org/3/' + type + '/' + movie + '?api_key=c618784bdd2787da4972dd45f397869b&language=' + localStorage.getItem('langue');
	var cast = 'https://api.themoviedb.org/3/' + type + '/' + movie + '/credits?api_key=c618784bdd2787da4972dd45f397869b';
	
	useEffect(() => {
		fetch(info, {
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		}).then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		}).then((parsedData) => {
			setDetail(parsedData);
		}).catch(error => {
			console.log("Error for movie information !")
		});
		
		fetch(cast, {
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		}).then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		}).then((parsedData) => {
			parsedData === undefined ? setCasting([]): setCasting(parsedData.cast);
		}).catch(error => {
			console.log("Error for the casting !")
		})

	}, [info, cast])

	return (
		<div className="watch-all">
			{ type === "tv" ? SelectEpisode(detail.seasons) : ''}
			<div className="film">
			</div>
			{ casting === [] ? '' : InfoMovie(detail, casting.slice(0, 8)) }
			{ Comment() }
		</div>
	)
}