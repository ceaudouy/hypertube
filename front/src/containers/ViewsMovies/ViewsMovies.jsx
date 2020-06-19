import React, { useState, useEffect } from 'react';
import '../../css/listFilm.css';
import PutFilm from '../../components/Display/PutFilm';
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

export default function ViewsMovies() {
	const [favorites, setFavorites] = useState([]);
	const [views, setViews] = useState([]);
	const [film, setFilm] = useState([]);

	useEffect(() => {
		setFilm([]);
		// recup film depuis le bac + film via yts + fav;

		// fetch(`http://localhost:3300/list/getViews`, {
		// 	method: 'POST',
		// 	credentials: 'include',
		// 	headers: new Headers({
		// 		'Content-Type': 'application/json',
		// 		'Authorization': token
		// 	}),
		// 	body: JSON.stringify({
		// 		type: type,
		// 	})
		// }).then((response) => {
		// 	return response.json();
		// }).then((parsedData) => {
		// 	res = parsedData.views;
		// 	setViews(parsedData.views);
		// 	var tab = [];
		// 	res.forEach(element => {
		// 		const url = 'https://api.themoviedb.org/3/' + type + '/' + element + '?api_key=c618784bdd2787da4972dd45f397869b&language=' + localStorage.getItem('langue');
		// 		fetch(url, {
		// 			headers: new Headers({
		// 				'Content-Type': 'application/json',
		// 			}),
		// 		}).then((response) => {
		// 			if (response.ok) {
		// 				return response.json();
		// 			}
		// 		}).then((parsedData) => {
		// 			if (parsedData !== undefined) {
		// 				tab[0] = parsedData;
		// 				setFilm(prevFilm => {
		// 					return [...new Set([...prevFilm, ...tab])]
		// 				});
		// 			}
		// 		});
		// 	})
		// });

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
	// 	});
	}, []);

	if (views.length === 0) {
		return (
			<div>
				<Text>You don't have viewed movie!</Text>
			</div>
		)
	} else {
		return (
			<div>
				<Homepage>
					{PutFilm(film, favorites)}
				</Homepage>
			</div>
		)
	}
}