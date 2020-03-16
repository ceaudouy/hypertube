import React, { useState, useEffect } from 'react';
import OptionMenu from './option';
import listFilm from './listFilm';
import TypeSearch from '../../components/typeSearch';

export default function ListPage() {
	const [query, setQuery] = useState('https://api.themoviedb.org/3/discover/movie?api_key=b936c3df071b03229069cfcbe5276410&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=');
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
			<div className="home-page">
				{OptionMenu(setQuery, type)}
				{listFilm(query, favorites, type)}
			</div>
		</div>
	)
}
