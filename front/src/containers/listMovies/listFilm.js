import React, { useState, useRef, useCallback } from 'react';
import '../../css/listFilm.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FetchAllMovies from './fetch';
import PutFilm from '../../components/putFilm';

export default function ListFilm(query, favorites, type) {
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

	if (favorites[0] !== "empty") {
		return (
			<div>
				<React.Fragment>
					<Container fixed>
						<Typography component="div" className="list-film" >
							{ PutFilm(film, favorites, type, lastFilmElementRef) }
							<div className="loading">{loading && 'Loading...'}</div>
							<div>{error && 'Error'}</div>
						</Typography>
					</Container>
				</React.Fragment>
			</div>
		)
	}
}
