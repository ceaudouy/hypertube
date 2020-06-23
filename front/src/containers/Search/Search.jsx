import React, { useState, useEffect, useContext} from 'react'
import { useImmer } from 'use-immer';
import styled from 'styled-components'

import api from '../../api/api'
import { COLORS, BREAK_POINTS, SPACING } from '../../config/style'
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

const Chip = styled.div`
	display: flex;
	align-items: center;
	background-color: ${COLORS.PURPLE};
	color: white;
	padding: ${SPACING.XXS} ${SPACING.XXS};
	border-radius: 32px;
	margin: ${SPACING.XXS};
	font-weight: 600;
`

const ChipsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	margin: ${SPACING.BASE} ${SPACING.BASE};
	/* background-color: ${COLORS.PURPLE}; */
	border-radius: 4px;
	& > ${Chip}:first-child {
		margin-left: 0;
	}
`

const ChipIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 28px;
	width: 28px;
	border-radius: 50%;
	background-color: ${COLORS.PINK_FLASHY};
	opacity: .7;
	box-shadow: 0px 0px 102px -20px rgba(0,0,0,0.75);
	margin-right: ${SPACING.XS};
`

export default function ListPage() {
	const [menuData, setMenuData] = useContext(MenuContext);
	const [favorites, setFavorites] = useState(['empty']);
	const [query, setQuery] = useState('https://yts.mx/api/v2/list_movies.json?page_number=');


	const deleteGenre = (genre) => {
		console.log("here")
		// console.log(typeof(menuData.genre[1]))
		// console.log("genre", genre)
		// console.log("menuData.genre", menuData.genre)
		// console.log("menuData.genre[1]", menuData.genre[1])
		setMenuData((draft) => {
			// console.log("draft", draft);
			return (draft.genre.filter(elem => elem !== genre))
		}) // WHAT THE FUCK ...
		// console.log("=====================")
		// console.log("menuData.genre", menuData.genre)
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

	const handleSubmit = () => {
		var queryGenre = '';
		var queryOrder = '';
		var querySort = ''
		if (menuData.genre !== '') {
			queryGenre = '&genre=' + menuData.genre
		} if (menuData.sort !== '') {
			querySort = '&sort_by='+ menuData.sort;
		} if (menuData.order !== '') {
			queryOrder = '&order_by=' + menuData.order;
		}
		setQuery('https://yts.mx/api/v2/list_movies.json?order_by=' + querySort + queryGenre + queryOrder + '&page_number=')
	}

	return (
		<HomeContainer>
			<Selection>
				<Input placeholder="  search ..." onChange={ e => handleChange(e) } />
				<Dropdown setQuery={setQuery} handleSubmit={handleSubmit} />
			</Selection>
			<Filter>
				{console.log(menuData.genre)}
				{!!menuData.genre.length && 
					<ChipsContainer>
						{
							menuData.genre.length && menuData.genre.map((genre, index) =>
								<Chip onClick={() => deleteGenre(genre)} key={`genre.${index}`}>
									<ChipIcon>
										<i className="fab fa-slack-hash"></i>
									</ChipIcon>
									<span>{genre}</span>
								</Chip>
							)
						}
					</ChipsContainer> 
				}
			</Filter>
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
	