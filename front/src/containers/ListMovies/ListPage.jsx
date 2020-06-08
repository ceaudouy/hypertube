import React, { useState, useEffect } from 'react';
import OptionMenu from './Option';
import ListFilm from './ListFilm';
import TypeSearch from '../../components/TypeSearch';
import styled from 'styled-components'
<<<<<<< HEAD
import { COLORS, BREAK_POINTS } from '../../config/style';
=======
>>>>>>> 6315100e48f801d6eea69e8bac296eb3503eb5d7

const HomePage = styled.div `
	display: flex;
	justify-content: space-around;
<<<<<<< HEAD
	flex-direction: row;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
			flex-direction: column;
			align-items: center;
	}
=======
>>>>>>> 6315100e48f801d6eea69e8bac296eb3503eb5d7
`

export default function ListPage() {
	const [query, setQuery] = useState('https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=' + localStorage.getItem('langue') + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=');
	const [type, setType] = useState('movie');
	const [favorites, setFavorites] = useState(['empty']);

	// useEffect(() => {
	// 	var token = localStorage.getItem('token');
	// 	fetch(`http://localhost:3300/list/getFavorites`, {
	// 		method: 'POST',
	// 		credentials: 'include',
	// 		headers: new Headers({
	// 			'Content-Type': 'application/json',
	// 			'Authorization': token
	// 		}),
	// 		body: JSON.stringify({
	// 			type: type,
	// 		})
	// 	}).then((response) => {
	// 		return response.json();
	// 	}).then((parsedData) => {
	// 		setFavorites(parsedData.favorites);
	// 	})
	// }, [type])

	return (
		<div>
			{/* { TypeSearch(type, setType, setQuery, query) } */}
			<HomePage>
				{OptionMenu(setQuery, type)}
				{ListFilm(query, favorites, type)}
			</HomePage>
		</div>
	)
}
