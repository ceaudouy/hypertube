import React, { useState, useEffect } from 'react';

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
		const url = query + pageNumber.toString();
		fetch(url, {
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		}).then((response) => {
			if (response.ok) {
				return response.json();
			}
		}).then((parsedData) => {
			if (parsedData.results !== undefined)
				setFilm(prevFilm => {
					return [...new Set([...prevFilm, ...parsedData.results.map(elem => elem)])]
				});
			setHasMore(pageNumber < parsedData.total_pages);
			setLoading(false);
		}).catch (e => {
			setLoading(false);
			setError(true);
			return;
		})
	}, [query, pageNumber])

	return {loading, error, film, hasMore};
}