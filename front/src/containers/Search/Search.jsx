import React, { useState, useEffect, useContext } from 'react'
import OptionMenu from './OptionMenu'
import ListFilm from './ListFilm'
import styled from 'styled-components'
import { BREAK_POINTS } from '../../config/style'
import api from '../../api/api'
import { COLORS } from '../../config/style'
import { DropdownContext } from "../../context/DropdownContext"
import Dropdown from './Dropdown/Dropdown'

const HomeContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`

const Selection = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	height: 10vh;
`

const Filter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	color: ${COLORS.WHITE};
	/* background-color: ${COLORS.PINK}; */
`

const HomePage = styled.div `
	display: flex;
	justify-content: space-around;
	flex-direction: row;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		flex-direction: column;
		align-items: center;
	}
`

const Input = styled.input`
	/* margin-top: 2vh; */
	height: 2vh;
	width: 20vw;
	border-radius: 5px;
`

export default function ListPage() {
	const [query, setQuery] = useState('https://yts.mx/api/v2/list_movies.json?page_number=');
	const [favorites, setFavorites] = useState(['empty']);

	const [genre, setGenre] = React.useState('');
	// const [date, setDate] = React.useState('');
	// const [date2, setDate2] = React.useState('');
	// const [vote, setVote] = React.useState('');
	// const [order, setOrder] = React.useState('');
	
	const contextMain = {
		genre: genre, 
		setGenre: setGenre
	}

	useEffect(() => {
		api.get('/movie/favorites')
		.then((res) => {
			let fav = []
			for (let i = 0; res.data[i] !== undefined; i++) {
				fav[i] = res.data[i].movie;
			}
			setFavorites(fav);
		})
		.catch((err) => {
			console.log(err)
		})
	}, [])

	const handleChange = e => {
		if (e.target.value === '') {
			setQuery('https://yts.mx/api/v2/list_movies.json?page_number=')
		} else {
			setQuery('https://yts.mx/api/v2/list_movies.json?query_term=' + e.target.value + '&page_number=')
		}
	}

	return (
		<DropdownContext.Provider value={contextMain}>
			<HomeContainer>
				<Selection>
					<Input placeholder="  search ..." onChange={ e => handleChange(e) } />
					<Dropdown>

					</Dropdown>
				</Selection>
				<Filter>{genre}</Filter>
				<HomePage>
					<OptionMenu setQuery={setQuery} type={type} />
					<ListFilm query={query} favorites={favorites} type={type} />
				</HomePage>
			</HomeContainer>
		</DropdownContext.Provider>
	)
}
