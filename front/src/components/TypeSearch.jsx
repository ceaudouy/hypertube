import React, { useEffect } from 'react';
import styled from 'styled-components'
import { COLORS } from '../config/style'

const TypeContainer = styled.div`
	display: flex;
	justify-content: flex-start;
`

const TypeButton = styled.button`
	width: 75px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 12px;
	border-radius: 5px;
	background-color: ${COLORS.GREY_LOVE};
	border: none;
	outline: none;

`

export default function TypeSearch(type, setType, setQuery, query) {
	var tmp = query.split('/')[5].split('?')[1];
	var option = query.split('/')[4];
		
	useEffect(() => {
		setQuery('https://api.themoviedb.org/3/' + option + '/' + type + '?' + tmp);
	}, [type, setQuery, tmp, option])
	
	const handleClick = e => {
		setType( type === 'movie' ? 'tv' : 'movie' );
	}

	return (
		<TypeContainer>
			<TypeButton onClick={ e => handleClick(e) }>{ type === 'movie' ? 'Movies' : 'TV Show' }</TypeButton>
		</TypeContainer>
	);
}