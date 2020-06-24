import { useState, useEffect } from 'react';

export default function FetchAllMovies(query, pageNumber, setPageNumber) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [film, setFilm] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setPageNumber(1);
		setFilm([]);
	}, [query, setPageNumber])

	useEffect(() => {
		setLoading(true);
		setError(false);
		
		const url = '' + query + pageNumber.toString();
		fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		}).then((parsedData) => {
			if (parsedData.data.movie_count === 0) {
				return ;
			} else if (parsedData.data.movie_count !== 0){
				if (parsedData.data.movies !== undefined) {
					setFilm(prevFilm => {
						return [...new Set([...prevFilm, ...parsedData.data.movies.map(elem => elem)])]
					});
					setHasMore(pageNumber < parsedData.data.movie_count);
					setLoading(false);
				}
			}
			if (parsedData.data.movie_count !== 0)
			setFilm(prevFilm => {
				return [...new Set([...prevFilm, ...parsedData.data.movies.map(elem => elem)])]
			});
			setHasMore(pageNumber < parsedData.data.movie_count);
			setLoading(false);
		}).catch (e => {
			setLoading(false);
			setError(true);
			return;
		})
	}, [query, pageNumber])

	return {loading, error, film, hasMore};
}