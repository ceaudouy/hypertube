import React from 'react';
import Select from 'react-select';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import '../../css/listFilm.css';
import styled from 'styled-components'
import { COLORS } from '../../config/style'
import { optionsGenre, optionsDate, optionsStars, optionsOrder } from './allOption';

const OptionContainer = styled.div `
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: stretch;
	margin: 10;
	background-color: ${COLORS.GREY_LOVE};
	height: 400px;
	margin-top: 5vw;
	margin-left: 3vw;
	border-radius: 5px;
	min-width: 180px;
`

const OneOption = styled.div `
	position: relative;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: stretch;
	margin-top: 10px;
	margin-bottom: 7px;
	margin-left: 5px;
	margin-right: 4px;
	max-width: 200px;
`

const Button = styled.button`
	border-radius: 5px;
	width: 50%;
	margin-left: auto;
	margin-right: auto;
	outline: none;
	border: none;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.BLACK_LIGHT};
	box-shadow: 2px 2px 12px #555;
`


const Text = styled.div`
	color: white;
	font-size: 0.9em;
	margin-left: 7%;
	margin-bottom: 2px;
`

export default function OptionMenu(setQuery, type) {
	const [genre, setGenre] = React.useState('');
	const [date, setDate] = React.useState('');
	const [date2, setDate2] = React.useState('');
	const [vote, setVote] = React.useState('');
	const [order, setOrder] = React.useState('');

	// setValue //
	const genreChange = event => {
		setGenre(event.value);
	};

	const dateChange = event => {
<<<<<<< HEAD
<<<<<<< HEAD
		setDate(event.value);
		setDate2(parseInt(event.value) + 9);
=======
		setDate(event.label);
		setDate2(parseInt(event.label) + 9);
>>>>>>> Selection film ou serie listpage
=======
		setDate(event.value);
		setDate2(parseInt(event.value) + 9);
>>>>>>> recherche add dans la page principal
	};

	const voteChange = event => {
		setVote(event.value);
	};

	const orderChange = event => {
		setOrder(event.value);
	};

	// Set query for the research //
	const submit = () => {
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
		}
<<<<<<< HEAD
<<<<<<< HEAD
		setQuery('https://api.themoviedb.org/3/discover/' + type + '?api_key=c618784bdd2787da4972dd45f397869b&language='+ localStorage.getItem('langue') + queryOrder + '&include_adult=false&include_video=false' + queryGenre + queryDate + queryVote + '&&page=');
=======
		props.setQuery('https://api.themoviedb.org/3/discover/' + props.type + '?api_key=b936c3df071b03229069cfcbe5276410&language='+ localStorage.getItem('langue') + queryOrder + '&include_adult=false&include_video=false' + queryGenre + queryDate + queryVote + '&&page=');
>>>>>>> Selection film ou serie listpage
=======
		setQuery('https://api.themoviedb.org/3/discover/' + type + '?api_key=c618784bdd2787da4972dd45f397869b&language='+ localStorage.getItem('langue') + queryOrder + '&include_adult=false&include_video=false' + queryGenre + queryDate + queryVote + '&&page=');
>>>>>>> recherche add dans la page principal
	}

	return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> select episode ok | before rebase from guroux
		<OptionContainer>
			<OneOption>
				<Text>Genre :</Text>
				<Select  onChange={ genreChange } options={ optionsGenre } />
			</OneOption>
			<OneOption>
				<Text>Date :</Text>
				<Select onChange={ dateChange } options={ optionsDate } />
			</OneOption>
			<OneOption>
				<Text>Stars :</Text>
				<Select onChange={ voteChange } options={ optionsStars } />
			</OneOption>
			<OneOption>
				<Text>Order by:</Text>
				<Select onChange={ orderChange } options={ optionsOrder } />
			</OneOption>
			<Button onClick={ submit }>
					Search
			</Button>
		</OptionContainer>
	)	
<<<<<<< HEAD
=======
	<OptionContainer>
		<OneOption>
			<Text>Genre :</Text>
			<Select  onChange={ genreChange } options={ optionsGenre } />
		</OneOption>
		<OneOption>
			<Text>Date :</Text>
			<Select onChange={ dateChange } options={ optionsDate } />
		</OneOption>
		<OneOption>
			<Text>Stars :</Text>
			<Select onChange={ voteChange } options={ optionsStars } />
		</OneOption>
		<OneOption>
			<Text>Order by:</Text>
			<Select onChange={ orderChange } options={ optionsOrder } />
		</OneOption>
		<Button onClick={ submit }>
				Search
		 </Button>
	</OptionContainer>
)
>>>>>>> tableau objet option dans un fichier + responsive listpage
}
<<<<<<< HEAD
=======

// export default function OptionMenu(setQuery, type) {
// 	const classes = useStyles();
// 	const [genre, setGenre] = React.useState('');
// 	const [openGenre, setOpenGenre] = React.useState(false);
// 	const [date, setDate] = React.useState('');
// 	const [date2, setDate2] = React.useState('');
// 	const [openDate, setOpenDate] = React.useState(false);
// 	const [vote, setVote] = React.useState('');
// 	const [openVote, setOpenVote] = React.useState(false);
// 	const [order, setOrder] = React.useState('');
// 	const [openOrder, setOpenOrder] = React.useState(false);

// 	// setValue //
// 	const genreChange = event => {
// 		setGenre(event.target.value);
// 	};

// 	const dateChange = event => {
// 		setDate(event.target.value);
// 		setDate2(event.target.value + 9);
// 	};

// 	const voteChange = event => {
// 		setVote(event.target.value);
// 	};

// 	const orderChange = event => {
// 		setOrder(event.target.value);
// 	};

// 	// Open - Close Menu //
// 	const handleCloseGenre = () => {
// 		setOpenGenre(false);
// 	};

// 	const handleOpenGenre = () => {
// 		setOpenGenre(true);
// 		setOpenDate(false);
// 		setOpenVote(false);
// 		setOpenOrder(false);
// 	};

// 	const handleCloseDate = () => {
// 	  	setOpenDate(false);
// 	};

// 	const handleOpenDate = () => {
// 		setOpenDate(true);
// 		setOpenGenre(false);
// 		setOpenVote(false);
// 		setOpenOrder(false);
// 	};

// 	const handleCloseVote = () => {
// 		setOpenVote(false);
//   	};

//  	 const handleOpenVote = () => {
// 		setOpenVote(true);
// 	  	setOpenDate(false);
// 	 	setOpenGenre(false);
// 		setOpenOrder(false);
// 	};

// 	const handleCloseOrder = () => {
// 		setOpenOrder(false);
// 	};

// 	const handleOpenOrder = () => {
// 		setOpenOrder(true);
// 		setOpenVote(false);
// 	  	setOpenDate(false);
// 	 	setOpenGenre(false);
// 	};

// 	// Set query for the research //
// 	const submit = () => {
// 		// setPageNumber(1);
// 		var queryGenre = '';
// 		var queryDate = '';
// 		var queryVote = '';
// 		var queryOrder = '';
// 		if (vote !== '') {
// 			queryVote = '&vote_average.gte=' + (vote * 2) + '&vote_average.lte=' + (vote * 2 + 1) ;
// 		} if (genre !== '') {
// 			queryGenre = '&&with_genres=' + genre
// 		} if (date !== '') {
// 			queryDate = '&&primary_release_date.gte=' + date + '-01-01&primary_release_date.lte=' + date2 + '-12-31';
// 		} if (order !== '') {
// 			if (order === 3 || order === 4) {
// 				let trie = order === 3 ? 'desc' : 'asc';
// 				queryOrder = '&sort_by=popularity.' + trie;
// 			} else if (order === 5 || order === 6) {
// 				let trie = order === 5 ? 'desc' : 'asc';
// 				queryOrder = '&sort_by=release_date.' + trie;
// 			} else if (order === 7 || order === 8) {
// 				let trie = order === 7 ? 'desc' : 'asc';
// 				queryOrder = '&sort_by=vote_average.' + trie;
// 			}
// 			if (order === 4 || order === 6 || order === 8) {
// 				// setPageNumber(11);
// 			}
// 		}
// 		setQuery('https://api.themoviedb.org/3/discover/' + type + '?api_key=c618784bdd2787da4972dd45f397869b&language='+ localStorage.getItem('langue') + queryOrder + '&include_adult=false&include_video=false' + queryGenre + queryDate + queryVote + '&&page=');
// 	}


// 	return (
// 		<OptionContainer>
// 			<OneOption>
// 				<InputLabel id="demo-controlled-open-select-label">Genre :</InputLabel>
// 				<select>
// 					<option value={28}>Action</option>
// 					<option value={12}>Adventure</option>
// 					<option value={16}>Animation</option>
// 					<option value={35}>Comedy</option>
// 					<option value={80}>Crime</option>
// 					<option value={99}>Documentary</option>
// 					<option value={18}>Drama</option>
// 					<option value={10751}>Family</option>
// 					<option value={14}>Fantasy</option>
// 					<option value={36}>History</option>
// 					<option value={27}>Horror</option>
// 					<option value={10402}>Music</option>
// 					<option value={9648}>Mystery</option>
// 					<option value={10749}>Romance</option>
// 					<option value={878}>Sciense Fiction</option>
// 					<option value={10770}>TV Movie</option>
// 					<option value={53}>Thriller</option>
// 					<option value={10752}>War</option>
// 					<option value={37}>Western</option>
// 				</select>


// 					{/* <Select
// 						labelId="demo-controlled-open-select-label"
// 						id="demo-controlled-open-select"
// 						open={openGenre}
// 						onClose={handleCloseGenre}
// 						onOpen={handleOpenGenre}
// 						value={genre}
// 						onChange={genreChange}
// 					>
// 						<MenuItem value="">
// 						<em>None</em>
// 						</MenuItem>
// 						<MenuItem value={28}>Action</MenuItem>
// 						<MenuItem value={12}>Adventure</MenuItem>
// 						<MenuItem value={16}>Animation</MenuItem>
// 						<MenuItem value={35}>Comedy</MenuItem>
// 						<MenuItem value={80}>Crime</MenuItem>
// 						<MenuItem value={99}>Documentary</MenuItem>
// 						<MenuItem value={18}>Drama</MenuItem>
// 						<MenuItem value={10751}>Family</MenuItem>
// 						<MenuItem value={14}>Fantasy</MenuItem>
// 						<MenuItem value={36}>History</MenuItem>
// 						<MenuItem value={27}>Horror</MenuItem>
// 						<MenuItem value={10402}>Music</MenuItem>
// 						<MenuItem value={9648}>Mystery</MenuItem>
// 						<MenuItem value={10749}>Romance</MenuItem>
// 						<MenuItem value={878}>Sciense Fiction</MenuItem>
// 						<MenuItem value={10770}>TV Movie</MenuItem>
// 						<MenuItem value={53}>Thriller</MenuItem>
// 						<MenuItem value={10752}>War</MenuItem>
// 						<MenuItem value={37}>Western</MenuItem>
// 					</Select> */}
// 			</OneOption>
// 			{/* <div className="option">
// 				<FormControl className={classes.formControl}>
// 					<InputLabel id="demo-controlled-open-select-label">Date</InputLabel>
// 					<Select
// 					labelId="demo-controlled-open-select-label"
// 					id="demo-controlled-open-select"
// 					open={openDate}
// 					onClose={handleCloseDate}
// 					onOpen={handleOpenDate}
// 					value={date}
// 					onChange={dateChange}
// 					>
// 						<MenuItem value="">
// 							<em>None</em>
// 						</MenuItem>
// 						<MenuItem value={2020}>2020</MenuItem>
// 						<MenuItem value={2010}>2010 - 2019</MenuItem>
// 						<MenuItem value={2000}>2000 - 2009</MenuItem>
// 						<MenuItem value={1990}>1990 - 1999</MenuItem>
// 						<MenuItem value={1980}>1980 - 1989</MenuItem>
// 						<MenuItem value={1970}>1970 - 1979</MenuItem>
// 						<MenuItem value={1960}>1960 - 1969</MenuItem>
// 						<MenuItem value={1950}>1950 - 1959</MenuItem>
// 					</Select>
// 				</FormControl>
// 			</div>
// 			<div className="option">
// 				<FormControl className={classes.formControl}>
// 					<InputLabel id="demo-controlled-open-select-label">Stars</InputLabel>
// 					<Select
// 						labelId="demo-controlled-open-select-label"
// 						id="demo-controlled-open-select"
// 						open={openVote}
// 						onClose={handleCloseVote}
// 						onOpen={handleOpenVote}
// 						value={vote}
// 						onChange={voteChange}
// 					>
// 						<MenuItem value="">
// 						<em>None</em>
// 						</MenuItem>
// 						<MenuItem value={5}>5 stars</MenuItem>
// 						<MenuItem value={4}>4 stars</MenuItem>
// 						<MenuItem value={3}>3 stars</MenuItem>
// 						<MenuItem value={2}>2 stars</MenuItem>
// 						<MenuItem value={1}>1 star</MenuItem>
// 						<MenuItem value={0}>0 star</MenuItem>
// 					</Select>
// 				</FormControl>
// 			</div>
// 			<div className="option">
// 				<FormControl className={classes.formControl}>
// 					<InputLabel id="demo-controlled-open-select-label">Order by</InputLabel>
// 					<Select
// 					labelId="demo-controlled-open-select-label"
// 					id="demo-controlled-open-select"
// 					open={openOrder}
// 					onClose={handleCloseOrder}
// 					onOpen={handleOpenOrder}
// 					value={order}
// 					onChange={orderChange}
// 					>
// 						<MenuItem value="">
// 							<em>None</em>
// 						</MenuItem>
// 						<MenuItem value={3}>Popularity <ArrowUpwardIcon className="option-arrow" /></MenuItem>
// 						<MenuItem value={4}>Popularity <ArrowDownwardIcon /></MenuItem>
// 						<MenuItem value={5}>Date <ArrowUpwardIcon /></MenuItem>
// 						<MenuItem value={6}>Date <ArrowDownwardIcon /></MenuItem>
// 						<MenuItem value={7}>Stars <ArrowUpwardIcon /></MenuItem>
// 						<MenuItem value={8}>Stars <ArrowDownwardIcon /></MenuItem>
// 					</Select>
// 				</FormControl>
// 			</div>
// 			<div className={classes.root}>
// 				<Button onClick={submit} variant="contained" color="primary">
// 					Search
// 				</Button>
// 			</div> */}
// 	  	</OptionContainer>
// 	);





// 	// return (
// 	// 	<div className="option-menu">
// 	// 		<div className="option">
// 	// 			<FormControl className={classes.formControl}>
// 	// 				<InputLabel id="demo-controlled-open-select-label">Genre</InputLabel>
// 	// 				<Select
// 	// 					labelId="demo-controlled-open-select-label"
// 	// 					id="demo-controlled-open-select"
// 	// 					open={openGenre}
// 	// 					onClose={handleCloseGenre}
// 	// 					onOpen={handleOpenGenre}
// 	// 					value={genre}
// 	// 					onChange={genreChange}
// 	// 				>
// 	// 					<MenuItem value="">
// 	// 					<em>None</em>
// 	// 					</MenuItem>
// 	// 					<MenuItem value={28}>Action</MenuItem>
// 	// 					<MenuItem value={12}>Adventure</MenuItem>
// 	// 					<MenuItem value={16}>Animation</MenuItem>
// 	// 					<MenuItem value={35}>Comedy</MenuItem>
// 	// 					<MenuItem value={80}>Crime</MenuItem>
// 	// 					<MenuItem value={99}>Documentary</MenuItem>
// 	// 					<MenuItem value={18}>Drama</MenuItem>
// 	// 					<MenuItem value={10751}>Family</MenuItem>
// 	// 					<MenuItem value={14}>Fantasy</MenuItem>
// 	// 					<MenuItem value={36}>History</MenuItem>
// 	// 					<MenuItem value={27}>Horror</MenuItem>
// 	// 					<MenuItem value={10402}>Music</MenuItem>
// 	// 					<MenuItem value={9648}>Mystery</MenuItem>
// 	// 					<MenuItem value={10749}>Romance</MenuItem>
// 	// 					<MenuItem value={878}>Sciense Fiction</MenuItem>
// 	// 					<MenuItem value={10770}>TV Movie</MenuItem>
// 	// 					<MenuItem value={53}>Thriller</MenuItem>
// 	// 					<MenuItem value={10752}>War</MenuItem>
// 	// 					<MenuItem value={37}>Western</MenuItem>
// 	// 				</Select>
// 	// 			</FormControl>
// 	// 		</div>
// 	// 		<div className="option">
// 	// 			<FormControl className={classes.formControl}>
// 	// 				<InputLabel id="demo-controlled-open-select-label">Date</InputLabel>
// 	// 				<Select
// 	// 				labelId="demo-controlled-open-select-label"
// 	// 				id="demo-controlled-open-select"
// 	// 				open={openDate}
// 	// 				onClose={handleCloseDate}
// 	// 				onOpen={handleOpenDate}
// 	// 				value={date}
// 	// 				onChange={dateChange}
// 	// 				>
// 	// 					<MenuItem value="">
// 	// 						<em>None</em>
// 	// 					</MenuItem>
// 	// 					<MenuItem value={2020}>2020</MenuItem>
// 	// 					<MenuItem value={2010}>2010 - 2019</MenuItem>
// 	// 					<MenuItem value={2000}>2000 - 2009</MenuItem>
// 	// 					<MenuItem value={1990}>1990 - 1999</MenuItem>
// 	// 					<MenuItem value={1980}>1980 - 1989</MenuItem>
// 	// 					<MenuItem value={1970}>1970 - 1979</MenuItem>
// 	// 					<MenuItem value={1960}>1960 - 1969</MenuItem>
// 	// 					<MenuItem value={1950}>1950 - 1959</MenuItem>
// 	// 				</Select>
// 	// 			</FormControl>
// 	// 		</div>
// 	// 		<div className="option">
// 	// 			<FormControl className={classes.formControl}>
// 	// 				<InputLabel id="demo-controlled-open-select-label">Stars</InputLabel>
// 	// 				<Select
// 	// 					labelId="demo-controlled-open-select-label"
// 	// 					id="demo-controlled-open-select"
// 	// 					open={openVote}
// 	// 					onClose={handleCloseVote}
// 	// 					onOpen={handleOpenVote}
// 	// 					value={vote}
// 	// 					onChange={voteChange}
// 	// 				>
// 	// 					<MenuItem value="">
// 	// 					<em>None</em>
// 	// 					</MenuItem>
// 	// 					<MenuItem value={5}>5 stars</MenuItem>
// 	// 					<MenuItem value={4}>4 stars</MenuItem>
// 	// 					<MenuItem value={3}>3 stars</MenuItem>
// 	// 					<MenuItem value={2}>2 stars</MenuItem>
// 	// 					<MenuItem value={1}>1 star</MenuItem>
// 	// 					<MenuItem value={0}>0 star</MenuItem>
// 	// 				</Select>
// 	// 			</FormControl>
// 	// 		</div>
// 	// 		<div className="option">
// 	// 			<FormControl className={classes.formControl}>
// 	// 				<InputLabel id="demo-controlled-open-select-label">Order by</InputLabel>
// 	// 				<Select
// 	// 				labelId="demo-controlled-open-select-label"
// 	// 				id="demo-controlled-open-select"
// 	// 				open={openOrder}
// 	// 				onClose={handleCloseOrder}
// 	// 				onOpen={handleOpenOrder}
// 	// 				value={order}
// 	// 				onChange={orderChange}
// 	// 				>
// 	// 					<MenuItem value="">
// 	// 						<em>None</em>
// 	// 					</MenuItem>
// 	// 					<MenuItem value={3}>Popularity <ArrowUpwardIcon className="option-arrow" /></MenuItem>
// 	// 					<MenuItem value={4}>Popularity <ArrowDownwardIcon /></MenuItem>
// 	// 					<MenuItem value={5}>Date <ArrowUpwardIcon /></MenuItem>
// 	// 					<MenuItem value={6}>Date <ArrowDownwardIcon /></MenuItem>
// 	// 					<MenuItem value={7}>Stars <ArrowUpwardIcon /></MenuItem>
// 	// 					<MenuItem value={8}>Stars <ArrowDownwardIcon /></MenuItem>
// 	// 				</Select>
// 	// 			</FormControl>
// 	// 		</div>
// 	// 		<div className={classes.root}>
// 	// 			<Button onClick={submit} variant="contained" color="primary">
// 	// 				Search
// 	// 			</Button>
// 	// 		</div>
// 	//   	</div>
// 	// );
// }
>>>>>>> recherche add dans la page principal
=======
}
>>>>>>> select episode ok | before rebase from guroux
