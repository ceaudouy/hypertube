import React, { useState, useEffect, useContext} from 'react'
import { useImmer } from 'use-immer';
import styled from 'styled-components'

import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'
import { MenuContext } from "../../context/MenuContext"
import ListFilm from './ListFilm'
import OptionMenu from './OptionMenu'
import Dropdown from './Dropdown/Dropdown'

const HomeContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
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
	height: 2vh;
	width: 20vw;
	border-radius: 5px;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		height: 3vh;
		width: 40vw;
	}
`

export default function ListPage() {
	const [query, setQuery] = useState('https://yts.mx/api/v2/list_movies.json?sort_by=download_count&page=');
	const [favorites, setFavorites] = useState(['empty']);
	const [menuData, setMenuData] = useContext(MenuContext)

	const updateGenre = (newGenre) => {
		setMenuData(draft => {
			draft.genre = newGenre;
		})
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
			setQuery('https://yts.mx/api/v2/list_movies.json?sort_by=download_count&page=')
		} else {
			setQuery('https://yts.mx/api/v2/list_movies.json?query_term=' + e.target.value + '&page=')
		}
	}

	return (
			<HomeContainer>
				<Selection>
					<Input placeholder="  search ..." onChange={ e => handleChange(e) } />
					<Dropdown setQuery={setQuery} updateGenre={() => updateGenre()} />
				</Selection>
				<Filter>{menuData.genre}</Filter>
				<HomePage>
					{/* <OptionMenu setQuery={setQuery} type={type} /> */}
					<ListFilm query={query} favorites={favorites} />
				</HomePage>
			</HomeContainer>
	)
}

	// const [genre, setGenre] = useImmer("");
	// const [sort, updateSort] = useImmer("");
	// const [order, updateOrder] = useImmer("");

	// const updateGenre = (newGenre) => {(draft => {
	// 		draft.genre = newGenre;
	// 	})
	// }

	// const [menuData, updateMenuData] = useImmer({
	// 	genre: "", 
	// 	sort: "",
	// 	order: "",
	// 	updateGenre: updateGenre,

	// });
	