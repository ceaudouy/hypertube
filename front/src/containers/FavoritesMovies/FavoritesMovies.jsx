import React, { useState, useEffect } from 'react';
import PutFilm from '../../components/PutFilm';
import TypeSearch from '../../components/TypeSearch';
import '../../css/listFilm.css';
import styled from 'styled-components'
import { COLORS } from '../../config/style';

const Homepage = styled.div`
	display: flex;
	justify-content: space-around;
`
const Text = styled.div`
	display: flex;
	justify-content: center;
	color: ${COLORS.WHITE};
`


export default function FavoritesMovies() {
	const [query, setQuery] = useState('https://api.themoviedb.org/3/discover/movie?api_key=c618784bdd2787da4972dd45f397869b&language=' + localStorage.getItem('langue') + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=');
	const [type, setType] = useState('movie');
	const [favorites, setFavorites] = useState([]);
	const [film, setFilm] = useState([]);

	useEffect(() => {
		setFilm([]);
		var fav;
		var token = localStorage.getItem('token');
		fetch(`http://localhost:3300/movie/getFavorites`, {
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
			fav = parsedData.favorites;
			setFavorites(parsedData.favorites);

		var tab = [];
		fav.forEach(element => {
			const url = 'https://api.themoviedb.org/3/' + type + '/' + element + '?api_key=c618784bdd2787da4972dd45f397869b&language=' + localStorage.getItem('langue')
			fetch(url, {
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
			}).then((response) => {
				if (response.ok) {
					return response.json();
				}
			}).then((parsedData) => {
				if (parsedData !== undefined) {
					tab[0] = parsedData;
					setFilm(prevFilm => {
						return [...new Set([...prevFilm, ...tab])]
					});
				}
			});
		})
	})
}, [type]);

	if (favorites.length === 0) {
		return (
			<div>
				{ TypeSearch(type, setType, setQuery, query) }
				<Text>You don't have favorite movie!</Text>
			</div>
		)
	} else {
		return (
			<div>
				{ TypeSearch(type, setType, setQuery, query) }
				<Homepage>
					{PutFilm(film, favorites, type)}
				</Homepage>
			</div>
		)
	}
}