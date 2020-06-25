import React, { useState, useEffect, useContext} from 'react'
import styled from 'styled-components'

import api from '../../api/api'
import { COLORS, BREAK_POINTS, SPACING } from '../../config/style'
import { MenuContext } from "../../context/MenuContext"
import ListFilm from './ListFilm'
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
	padding: ${SPACING.XS} ${SPACING.XS} ${SPACING.XS} ${SPACING.XS};
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
	const [query, setQuery] = useState('https://yts.mx/api/v2/list_movies.json?sort_by=download_count&page=');

	const deleteGenre = (genre) => {setMenuData((draft) => {draft = draft.genre.splice(draft.genre.indexOf(genre))});}
	const deleteSort = (sort) => {setMenuData((draft) => {draft = draft.sort.splice(draft.sort.indexOf(sort))});}
	const deleteOrder = (order) => {setMenuData((draft) => {draft = draft.order.splice(draft.order.indexOf(order))});}

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

	const handleSubmit = () => {
		var queryGenre = '';
		var queryOrder = '';
		var querySort = 'sort_by=download_count'
		if (menuData.genre.length !== 0) {
			queryGenre = '&genre=' + menuData.genre
		} if (menuData.sort.length !== 0) {
			querySort = '&sort_by='+ menuData.sort;
		} if (menuData.order.length !== 0) {
			queryOrder = '&order_by=' + menuData.order;
		}
		setQuery('https://yts.mx/api/v2/list_movies.json?' + querySort + queryGenre + queryOrder + '&page=')
	}

	return (
		<HomeContainer>
			<Selection>
				<Input placeholder="  search ..." onChange={ e => handleChange(e) } />
				<Dropdown setQuery={setQuery} handleSubmit={handleSubmit} />
			</Selection>
			<Filter>
				{!!menuData.genre && !!menuData.genre.length && 
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
				{!!menuData.sort && !!menuData.sort.length && 
					<ChipsContainer>
						{
							menuData.sort.length && menuData.sort.map((sort, index) =>
								<Chip onClick={() => deleteSort(sort)} key={`sort.${index}`}>
									<ChipIcon>
										<i className="fab fa-slack-hash"></i>
									</ChipIcon>
									<span>{sort}</span>
								</Chip>
							)
						}
					</ChipsContainer> 
				}
				{!!menuData.order && !!menuData.order.length && 
					<ChipsContainer>
						{
							menuData.order.length && menuData.order.map((order, index) =>
								<Chip onClick={() => deleteOrder(order)} key={`order.${index}`}>
									<ChipIcon>
										<i className="fab fa-slack-hash"></i>
									</ChipIcon>
									<span>{order}</span>
								</Chip>
							)
						}
					</ChipsContainer> 
				}
			</Filter>
			<HomePage>
				<ListFilm query={query} favorites={favorites} />
			</HomePage>
		</HomeContainer>
	)
}