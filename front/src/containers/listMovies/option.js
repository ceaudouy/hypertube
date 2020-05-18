import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../../css/listFilm.css';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(0, 0, 0, 5),
			maxWidth: 120,
		},
	},
	button: {
		display: 'block',
		marginTop: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(1),
		maxWidth: 140,
	},
}));

export default function OptionMenu(setQuery, type) {
	const classes = useStyles();
	const [genre, setGenre] = React.useState('');
	const [openGenre, setOpenGenre] = React.useState(false);
	const [date, setDate] = React.useState('');
	const [date2, setDate2] = React.useState('');
	const [openDate, setOpenDate] = React.useState(false);
	const [vote, setVote] = React.useState('');
	const [openVote, setOpenVote] = React.useState(false);
	const [order, setOrder] = React.useState('');
	const [openOrder, setOpenOrder] = React.useState(false);

	// setValue //
	const genreChange = event => {
		setGenre(event.target.value);
	};

	const dateChange = event => {
		setDate(event.target.value);
		setDate2(event.target.value + 9);
	};

	const voteChange = event => {
		setVote(event.target.value);
	};

	const orderChange = event => {
		setOrder(event.target.value);
	};

	// Open - Close Menu //
	const handleCloseGenre = () => {
		setOpenGenre(false);
	};

	const handleOpenGenre = () => {
		setOpenGenre(true);
		setOpenDate(false);
		setOpenVote(false);
		setOpenOrder(false);
	};

	const handleCloseDate = () => {
	  	setOpenDate(false);
	};

	const handleOpenDate = () => {
		setOpenDate(true);
		setOpenGenre(false);
		setOpenVote(false);
		setOpenOrder(false);
	};

	const handleCloseVote = () => {
		setOpenVote(false);
  	};

 	 const handleOpenVote = () => {
		setOpenVote(true);
	  	setOpenDate(false);
	 	setOpenGenre(false);
		setOpenOrder(false);
	};

	const handleCloseOrder = () => {
		setOpenOrder(false);
	};

	const handleOpenOrder = () => {
		setOpenOrder(true);
		setOpenVote(false);
	  	setOpenDate(false);
	 	setOpenGenre(false);
	};

	// Set query for the research //
	const submit = () => {
		// setPageNumber(1);
		var queryGenre = '';
		var queryDate = '';
		var queryVote = '';
		var queryOrder = '';
		if (vote !== '') {
			queryVote = '&vote_average.gte=' + (vote * 2) + '&vote_average.lte=' + (vote * 2 + 1) ;
		} if (genre !== '') {
			queryGenre = '&&with_genres=' + genre
		} if (date !== '') {
			queryDate = '&&primary_release_date.gte=' + date + '-01-01&primary_release_date.lte=' + date2 + '-12-31';
		} if (order !== '') {
			if (order === 3 || order === 4) {
				let trie = order === 3 ? 'desc' : 'asc';
				queryOrder = '&sort_by=popularity.' + trie;
			} else if (order === 5 || order === 6) {
				let trie = order === 5 ? 'desc' : 'asc';
				queryOrder = '&sort_by=release_date.' + trie;
			} else if (order === 7 || order === 8) {
				let trie = order === 7 ? 'desc' : 'asc';
				queryOrder = '&sort_by=vote_average.' + trie;
			}
			if (order === 4 || order === 6 || order === 8) {
				// setPageNumber(11);
			}
		}
		setQuery('https://api.themoviedb.org/3/discover/' + type + '?api_key=b936c3df071b03229069cfcbe5276410&language='+ localStorage.getItem('langue') + queryOrder + '&include_adult=false&include_video=false' + queryGenre + queryDate + queryVote + '&&page=');
	}

	return (
		<div className="option-menu">
			<div className="option">
				<FormControl className={classes.formControl}>
					<InputLabel id="demo-controlled-open-select-label">Genre</InputLabel>
					<Select
						labelId="demo-controlled-open-select-label"
						id="demo-controlled-open-select"
						open={openGenre}
						onClose={handleCloseGenre}
						onOpen={handleOpenGenre}
						value={genre}
						onChange={genreChange}
					>
						<MenuItem value="">
						<em>None</em>
						</MenuItem>
						<MenuItem value={28}>Action</MenuItem>
						<MenuItem value={12}>Adventure</MenuItem>
						<MenuItem value={16}>Animation</MenuItem>
						<MenuItem value={35}>Comedy</MenuItem>
						<MenuItem value={80}>Crime</MenuItem>
						<MenuItem value={99}>Documentary</MenuItem>
						<MenuItem value={18}>Drama</MenuItem>
						<MenuItem value={10751}>Family</MenuItem>
						<MenuItem value={14}>Fantasy</MenuItem>
						<MenuItem value={36}>History</MenuItem>
						<MenuItem value={27}>Horror</MenuItem>
						<MenuItem value={10402}>Music</MenuItem>
						<MenuItem value={9648}>Mystery</MenuItem>
						<MenuItem value={10749}>Romance</MenuItem>
						<MenuItem value={878}>Sciense Fiction</MenuItem>
						<MenuItem value={10770}>TV Movie</MenuItem>
						<MenuItem value={53}>Thriller</MenuItem>
						<MenuItem value={10752}>War</MenuItem>
						<MenuItem value={37}>Western</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className="option">
				<FormControl className={classes.formControl}>
					<InputLabel id="demo-controlled-open-select-label">Date</InputLabel>
					<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={openDate}
					onClose={handleCloseDate}
					onOpen={handleOpenDate}
					value={date}
					onChange={dateChange}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={2020}>2020</MenuItem>
						<MenuItem value={2010}>2010 - 2019</MenuItem>
						<MenuItem value={2000}>2000 - 2009</MenuItem>
						<MenuItem value={1990}>1990 - 1999</MenuItem>
						<MenuItem value={1980}>1980 - 1989</MenuItem>
						<MenuItem value={1970}>1970 - 1979</MenuItem>
						<MenuItem value={1960}>1960 - 1969</MenuItem>
						<MenuItem value={1950}>1950 - 1959</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className="option">
				<FormControl className={classes.formControl}>
					<InputLabel id="demo-controlled-open-select-label">Stars</InputLabel>
					<Select
						labelId="demo-controlled-open-select-label"
						id="demo-controlled-open-select"
						open={openVote}
						onClose={handleCloseVote}
						onOpen={handleOpenVote}
						value={vote}
						onChange={voteChange}
					>
						<MenuItem value="">
						<em>None</em>
						</MenuItem>
						<MenuItem value={5}>5 stars</MenuItem>
						<MenuItem value={4}>4 stars</MenuItem>
						<MenuItem value={3}>3 stars</MenuItem>
						<MenuItem value={2}>2 stars</MenuItem>
						<MenuItem value={1}>1 star</MenuItem>
						<MenuItem value={0}>0 star</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className="option">
				<FormControl className={classes.formControl}>
					<InputLabel id="demo-controlled-open-select-label">Order by</InputLabel>
					<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={openOrder}
					onClose={handleCloseOrder}
					onOpen={handleOpenOrder}
					value={order}
					onChange={orderChange}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={3}>Popularity <ArrowUpwardIcon className="option-arrow" /></MenuItem>
						<MenuItem value={4}>Popularity <ArrowDownwardIcon /></MenuItem>
						<MenuItem value={5}>Date <ArrowUpwardIcon /></MenuItem>
						<MenuItem value={6}>Date <ArrowDownwardIcon /></MenuItem>
						<MenuItem value={7}>Stars <ArrowUpwardIcon /></MenuItem>
						<MenuItem value={8}>Stars <ArrowDownwardIcon /></MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className={classes.root}>
				<Button onClick={submit} variant="contained" color="primary">
					Search
				</Button>
			</div>
	  	</div>
	);
}
