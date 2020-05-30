import React, { useState, useEffect } from 'react';
import listFilm from '../ListMovies/ListFilm';
import TypeSearch from '../../components/TypeSearch';

export default function Research() {
	const research = localStorage.getItem('research');
	if (research === '') {
		document.location.href = '/';
	}
	const [query, setQuery] = useState('https://api.themoviedb.org/3/search/movie?api_key=b936c3df071b03229069cfcbe5276410&language=' + localStorage.getItem('langue') + '&&include_adult=false&sort_by=popularity.desc&query='+ research + '&page=');
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

	return (
		<div>
			{ TypeSearch(type, setType, setQuery, query) }
			<div className="research-page">
				{listFilm(query, favorites, type)}
			</div>
		</div>
	)
}
