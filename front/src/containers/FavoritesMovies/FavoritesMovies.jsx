import React, { useState, useEffect } from 'react';
import PutFilm from '../../components/Display/PutFilm';
import '../../css/listFilm.css';
import styled from 'styled-components'
import { COLORS } from '../../config/style';
import api from '../../api/api'
import Axios from 'axios';

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
	const [favorites, setFavorites] = useState([]);
	const [film, setFilm] = useState([]);

	useEffect(() => {
		setFilm([]);
		var tab = [];
		api.get('/movie/favorites')
		.then((res) => {
			console.log(res.data);
			setFavorites(res.data);

			res.data.forEach(element => {
				
				var id = element.movie;
				var info = 'https://yts.mx/api/v2/movie_details.json?movie_id=' + id;

				Axios(info)
				.then(res => {
					tab[0] = res.data.data.movie
					setFilm(prevFilm => {
						return [...new Set([...prevFilm, ...tab])]
					});
				})
				.catch( err => {
					console.log(err);
				})
			})
		})
	}, []);

	if (favorites.length === 0) {
		return (
			<div>
				<Text>You don't have favorite movie!</Text>
			</div>
		)
	} else {
		return (
			<div>
				<Homepage>
					{ PutFilm(film, favorites) }
				</Homepage>
			</div>
		)
	}
}