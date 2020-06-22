import React from 'react';
import Rating from '@material-ui/lab/Rating';
import ButtonFavorite from './FavoriteButton';
import styled from 'styled-components'
import { COLORS, BREAK_POINTS } from '../../config/style'
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
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		margin-left: auto;
		margin-right: auto;
	}
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

export default function PutFilm(film, favorites, type, lastFilmElementRef) {
	
	return (
		<ConstainerDisplay>
			{ film.map((elem, index) => {
				// console.log(elem)
				if (elem === null) {
					return ('');
				}
				var overview = '';
				if (elem.synopsis === '' || elem.synopsis === undefined || elem.synopsis === null) {
					overview = 'No overview !';
				} else {
					overview = elem.synopsis.substr(0, 100);
					overview[overview.length - 1] !== '.' ? overview = overview + " ..." : overview = overview + '';
				}
				if (elem.medium_cover_image === null) {
					return ('');
				} else {
					return (
						<ContainerCard ref={lastFilmElementRef} key={ index }>
								<Title>{ elem.title }</Title>
								<Date>{ elem.year }</Date>
							<img className="media" src={elem.medium_cover_image} alt="" />
							<Overview>
								{ overview }
							</Overview>
							<Footer>
								<ButtonFavorite elem={elem} favorites={favorites} type={type} />
								<SLink to={ `/watch/${type}/${elem.id}/${elem.imdb_code}` }>
									<Icon className="far fa-play-circle" />
								</SLink>
								<Rating name="read-only" precision={0.5} value={ elem.rating / 2} size="small" readOnly />
							</Footer>
						</ContainerCard>
					)
				}
			})}
		</ConstainerDisplay>
	)
}