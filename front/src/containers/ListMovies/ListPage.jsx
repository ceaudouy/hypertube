import React, { useState, useEffect } from 'react';
import OptionMenu from './Option';
import ListFilm from './ListFilm';
import TypeSearch from '../../components/TypeSearch';
import styled from 'styled-components'
import { BREAK_POINTS } from '../../config/style';

const HomePage = styled.div `
	display: flex;
	justify-content: space-around;
	flex-direction: row;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
			flex-direction: column;
			align-items: center;
	}
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
			{ TypeSearch(type, setType, setQuery, query) }
			<HomePage>
				{OptionMenu(setQuery, type)}
				{ListFilm(query, favorites, type)}
			</HomePage>
		</div>
	)
}
