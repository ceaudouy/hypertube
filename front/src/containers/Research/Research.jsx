import React, { useState, useEffect } from 'react';
import listFilm from '../ListMovies/ListFilm';
import TypeSearch from '../../components/TypeSearch';
import styled from 'styled-components'

const SearchContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

`

const Result = styled.div`
	display: flex;
	justify-content: center;
`
const Input = styled.input`
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
	border: none;
	outline: none;
	border-radius: 5px;

`



export default function Research() {
	const research = localStorage.getItem('research');
	if (research === '') {
		document.location.href = '/';
	}
	const [query, setQuery] = useState('https://api.themoviedb.org/3/discover/movie?api_key=c618784bdd2787da4972dd45f397869b&language=' + localStorage.getItem('langue') + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=');
	const [type, setType] = useState('movie');
	const [favorites, setFavorites] = useState(['empty']);

	useEffect(() => {
		var token = localStorage.getItem('token');
		fetch(`http://localhost:3300/list/getFavorites`, {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': token
			}),
			body: JSON.stringify({
				type: type,
			})
		}).then((response) => {
			return response.json();
		}).then((parsedData) => {
			setFavorites(parsedData.favorites);
		})
	}, [type])

	const handleChange = e => {
		setQuery('https://api.themoviedb.org/3/search/movie?api_key=c618784bdd2787da4972dd45f397869b&language=' + localStorage.getItem('langue') + '&&include_adult=false&sort_by=popularity.desc&query='+ e.target.value + '&page=')
	}
		return (
			<SearchContainer>
			<Input placeholder="search ..." onChange={ e => handleChange(e) } />
			{ TypeSearch(type, setType, setQuery, query) }
			<Result>
				{listFilm(query, favorites, type)}
			</Result>
		</SearchContainer>
	)
}
