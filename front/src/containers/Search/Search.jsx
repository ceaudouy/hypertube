import React, { useState, useEffect } from 'react';
import OptionMenu from './Option';
import ListFilm from './ListFilm';
import styled from 'styled-components'
import { BREAK_POINTS } from '../../config/style';
import api from '../../api/api'

const HomeContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`

const HomePage = styled.div `
	display: flex;
	justify-content: space-around;
	flex-direction: row;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
			flex-direction: column;
			align-items: center;
	}
`
const Input = styled.input`
	margin-left: auto;
	margin-right: auto;
	margin-top: 13px;
	border: none;
	outline: none;
	border-radius: 5px;

`

export default function ListPage() {
	const [query, setQuery] = useState('https://yts.mx/api/v2/list_movies.json?page_number=');
	const [favorites, setFavorites] = useState(['empty']);

	useEffect(() => {
		api.get('/movie/favorites')
		.then((res) => {
			let fav = []
			for(let i = 0; res.data[i] !== undefined; i++) {
				fav[i] = res.data[i].movie;
			} 
			setFavorites(fav);
		})
		.catch((err) => {
			console.log(err)
		})
	}, [])

	const handleChange = e => {
		if (e.target.value === '') {
			setQuery('https://yts.mx/api/v2/list_movies.json?page_number=')
		} else {
			setQuery('https://yts.mx/api/v2/list_movies.json?query_term=' + e.target.value + '&page_number=')
		}
	}

	return (
		<HomeContainer>
			<Input placeholder="search ..." onChange={ e => handleChange(e) } />
			<HomePage>
				{OptionMenu(setQuery)}
				{ListFilm(query, favorites)}
			</HomePage>
		</HomeContainer>
	)
}
