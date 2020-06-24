import React, { useState, useRef, useCallback } from 'react';
import '../../css/listFilm.css';
import FetchAllMovies from './Fetch';
import PutFilm from '../../components/Display/PutFilm';
import styled from 'styled-components'

const ContainerDisplay = styled.div`
`

export default function ListFilm({query, favorites}) {
	const [ pageNumber, setPageNumber ] = useState(1);

	const {
		film,
		hasMore,
		loading,
		error,
	} = FetchAllMovies(query, pageNumber, setPageNumber);

	const observer = useRef();
	const lastFilmElementRef = useCallback(node => {
		if (loading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				setPageNumber(prevPageNumber => prevPageNumber + 1);
			}
		})
		if (node) observer.current.observe(node)
	}, [loading, hasMore])

		// if (favorites[0] !== "empty") {
		return (
				<ContainerDisplay>
					{ PutFilm(film, favorites, lastFilmElementRef) }
					<div className="loading">{loading && 'Loading...'}</div>
					<div>{error && 'Error'}</div>
				</ContainerDisplay>
		)
	// }
}
