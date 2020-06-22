import React, { useState, useEffect } from 'react';
import '../../css/listFilm.css';
import PutFilm from '../../components/Display/PutFilm';
import styled from 'styled-components'
import { COLORS } from '../../config/style';
import api from '../../api/api';

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

		api.get('/movie/views')
		.then(res => {
			// console.log("elem")
			// res.data.forEach(element => {
			// 	const url = 'https://yts.mx/api/v2/movie_details.json?movie_id=' + element.movie
			// 	fetch(url)
			// 	.then((response) => {
			// 		console.log(response)
			// 		if (response.ok){
			// 			return response.json();
			// 		}
			// 	})
				// .then((parsedData) => {
					// console.log(parsedData)
					// if (parsedData !== undefined) {
						// tab[0] = parsedData;
						// setFilm(prevFilm => {
							// return [...new Set([...prevFilm, ...tab])]
						// });
					// }
					// });
				// })
		}).catch( err => {
			console.log(err);
		})
		
		// recup film depuis le bac + film via yts + fav;
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