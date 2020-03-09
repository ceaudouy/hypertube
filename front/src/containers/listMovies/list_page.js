import React, { useState, useEffect } from 'react';
import OptionMenu from './option';
import listFilm from './listFilm';

export default function ListPage(query, setQuery) {
	const [favorites, setFavorites] = useState(['empty']);

	useEffect(() => {
		fetch(`http://localhost:8080/list/getFavorites`, {
			method: 'GET',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'}, //include token;
		}).then((response) => {
			return response.json();
		}).then((parsedData) => {
			setFavorites(parsedData.favorites);
		})
	}, [])

	return (
		<div className="home-page">
			{OptionMenu(setQuery)}
			{listFilm(query, setQuery, favorites)}
		</div>
	)
}