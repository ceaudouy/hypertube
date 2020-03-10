import React, { useState, useEffect } from 'react';
import '../../css/listFilm.css';
import { makeStyles } from '@material-ui/styles';
import PutFilm from '../../components/putFilm';

const useStyle = makeStyles(theme => ({
	notFound: {
		paddingTop: "100px",
		textAlign: "center",
		color: "white",
		fontSize: "2vw",
	}
}));

export default function ViewsMovies() {
	const [favorites, setFavorites] = useState([]);
	const [film, setFilm] = useState([]);
	const classes = useStyle();

	useEffect(() => {
		var views;
		var token = localStorage.getItem('token');
		fetch(`http://localhost:3300/list/getViews`, {
			method: 'GET',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': token
			}),
		}).then((response) => {
			return response.json();
		}).then((parsedData) => {
			views = parsedData.views;
			setFavorites(parsedData.views);
			var tab = [];
			views.forEach(element => {
				const url = 'https://api.themoviedb.org/3/movie/' + element + '?api_key=b936c3df071b03229069cfcbe5276410&language=en-US'
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
	}, []);

	useEffect(() => {
		var token = localStorage.getItem('token');
		fetch(`http://localhost:3300/list/getFavorites`, {
			method: 'GET',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': token
			}),
		}).then((response) => {
			return response.json();
		}).then((parsedData) => {
			setFavorites(parsedData.favorites);
		})
	}, [])

	console.log(film);
	if (film.length === 0) {
		return (
			<div className={classes.notFound}>You don't have favorite movie!</div>
		)
	} else {
		return (
			<div className="home-page">
				{PutFilm(film, favorites)}
			</div>
		)
	}
}