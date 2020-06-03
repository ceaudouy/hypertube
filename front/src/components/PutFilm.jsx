import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Card, CardHeader, CardContent, CardActions, Typography } from '@material-ui/core';
import ButtonFavorite from './FavoriteButton';
import styled from 'styled-components'
import { COLORS, BREAK_POINTS } from '../config/style'
import { Link } from 'react-router-dom';

const ConstainerDisplay = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: stretch;
	margin: 10px;
`


const ContainerCard = styled.div `
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: stretch;
	margin-top: 10px;
	margin-left: 5px;
	width: 270px;
	margin-right: 4px;
	background-color: #adb5bd;
	border-radius: 5px;
`
const ContainerHeader = styled.div`
	margin-bottom: 5px;
`

const Title = styled.div`
	font-size: 100%;
	font-weight: bold;
	margin-left: 7%;
	margin-top: 7%;
	
`

const Date = styled.div`
	font-size: 13px;
	font-weight: 80;
	margin-left: 10%;
	margin-bottom: 10px;
`

const Overview = styled.div`
	margin: 5%;
	height: 40px;
	margin-bottom: 10px;
	height: 70px;
`

const Footer = styled.div`
	display: flex;
	justify-content: space-around;
	flex-direction: row;
	align-items: center;
`
const Play = styled.div`
	color: ${COLORS.BLACK_LIGHT};
	size: 15px;
`

const SLink = styled(Link)`
	display: flex;
	align-items: center;
	height: 5rem;
	text-decoration: none;
	color: ${COLORS.BLACK};
`

const Icon = styled.i`
	color: ${COLORS.BLACK};
	width: 2rem;
	font-size: 2rem;
  	min-width: 2rem;
  	margin: 0 1.5rem;
`

const playmovie = (elem, type) => {
	document.location.href = '/watch?' + type + '&' + elem.id
}

export default function PutFilm(film, favorites, type, lastFilmElementRef) {
	
	return (
		<ConstainerDisplay>
			{ film.map((elem, index) => {
				if (elem === null) {
					return ('');
				}
				var overview = '';
				if (elem.overview === '' || elem.overview === undefined || elem.overview === null) {
					overview = 'No overview !';
				} else {
					overview = elem.overview.substr(0, 100);
					overview[overview.length - 1] !== '.' ? overview = overview + " ..." : overview = overview + '';
				}
				if (elem.poster_path === null) {
					return ('');
				} else {
					return (
						<ContainerCard ref={lastFilmElementRef} key={ index }>
								<Title>{ elem.title !== undefined ? elem.title : elem.original_name }</Title>
								<Date>{ elem.release_date }</Date>
							<img className="media" src={"http://image.tmdb.org/t/p/w185/" + elem.poster_path} alt="" />
							<Overview>
								{ overview }
							</Overview>
							<Footer>
								{ ButtonFavorite(elem, favorites, type) }
								{/* <ButtonFavorite elem={ elem } favorites={ favorites } type={ type } /> */}
								<SLink to={ '/watch?' + type + '&' + elem.id }>
									<Icon className="far fa-play-circle" />
								</SLink>
								<Rating name="read-only" precision={0.5} value={elem.vote_average / 2 } size="small" readOnly />
							</Footer>
						</ContainerCard>
					)
				}
			})}
		</ConstainerDisplay>
	)
}