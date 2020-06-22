import React from 'react';
import Select from 'react-select';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import '../../css/listFilm.css';
import styled from 'styled-components'
import { COLORS } from '../../config/style'
import { optionsGenre, optionsOrder, sortBy } from './allOption';

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

export default function OptionMenu(setQuery) {
	const [genre, setGenre] = React.useState('');
	const [sort, setSort] = React.useState('');
	const [order, setOrder] = React.useState('');

	// setValue //
	const genreChange = event => {
		setGenre(event.label);
	};

	const sortChange = event => {
		setSort(event.label);
	};

	const orderChange = event => {
		setOrder(event.value);
	};

	// Set query for the research //
	const submit = () => {
		var queryGenre = '';
		var queryOrder = '';
		var querySort = ''
		if (genre !== '') {
			queryGenre = '&genre=' + genre
		} if (sort !== '') {
			querySort = '&sort_by='+ sort;
		} if (order !== '') {
			queryOrder = '&order_by=' + order;
		}
		setQuery('https://yts.mx/api/v2/list_movies.json?order_by=' + querySort + queryGenre + queryOrder + '&page_number=')
	}

	return (
		<OptionContainer>
			<OneOption>
				<Text>Genre :</Text>
				<Select  onChange={ genreChange } options={ optionsGenre } />
			</OneOption>
			<OneOption>
				<Text>Sort by :</Text>
				<Select onChange={ sortChange } options={ sortBy } />
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
}
