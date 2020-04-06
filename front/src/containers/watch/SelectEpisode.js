import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(0, 0, 0, 5),
			maxWidth: 120,
		},
	},
	formControl: {
		margin: theme.spacing(1),
		maxWidth: 140,
		minWidth: 100,
		// colo : '#adb5bd',
	},
	button: {
		color: '#adb5bd',
	  }
}));

export default function SelectEpisode(seasons) {
	const classes = useStyles();
	const [saison, setSaison] = useState(1);
	const [openSaison, setOpenSaison] = useState(false);
	const [episode, setEpisode] = useState('');
	const [episodeNBR, setEpisodeNBR] = useState(seasons === undefined ? '' : seasons[saison].episode_count);
	const [openEpisode, setOpenEpisode] = useState(false);
	// console.log(seasons);

	// setValue //
	const saisonChange = event => {
		setSaison(event.target.value);
		console.log(saison);
		if (seasons[saison] !== undefined ) {
			setEpisodeNBR(seasons[saison].episode_count)
		}
	};

	const episodeChange = event => {
		setEpisode(event.target.value);
	};

	// Open - Close Menu //
	const handleCloseSaison = () => {
		setOpenSaison(false);
	};

	const handleOpenSaison = () => {
		setOpenSaison(true);
	};

	const handleCloseEpisode = () => {
		setOpenEpisode(false);
	};

	const handleOpenEpisode = () => {
		setOpenEpisode(true);
	};
	if (seasons === undefined) {
		return ('');
	}
	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel className={classes.button} id="demo-controlled-open-select-label">Seasons</InputLabel>
				<Select className={classes.button}
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={openSaison}
					onClose={handleCloseSaison}
					onOpen={handleOpenSaison}
					value={saison}
					onChange={saisonChange}
				>
					<MenuItem value="">
					<em>None</em>
					</MenuItem>
					{	seasons.map((elem, index) => {
						if (elem.season_number === 0) {
							return ('')
						}
						return (
							<MenuItem key={ index } value={ elem.season_number }>season { elem.season_number } </MenuItem>
						);
					})

					}
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel className={classes.button} id="demo-controlled-open-select-label">Episodes</InputLabel>
				<Select className={classes.button}
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={openEpisode}
					onClose={handleCloseEpisode}
					onOpen={handleOpenEpisode}
					value={episode}
					onChange={episodeChange}
				>
					<MenuItem value="">
					<em>None</em>
					</MenuItem>
					{[...Array(episodeNBR)].map((elem, index) =>
						<MenuItem key={ index } value={ index + 1 }>episode { index + 1 } </MenuItem>
					)}
				</Select>
			</FormControl>
		</div>
	);
}