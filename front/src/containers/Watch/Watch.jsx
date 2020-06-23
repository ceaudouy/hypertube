import React, { useEffect, useState } from "react";
import '../../css/watch.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import Comment from './Comment';
import styled from 'styled-components';
import { COLORS } from '../../config/style'
import { useParams } from 'react-router-dom';
import Film from './Film';
import api from '../../api/api'

const ContainerWatch = styled.div`
	display: flex;
	flex-direction: column;
`

const Header = styled.div`
	display: flex;
	align-content: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 5px;	
`

const ContainerInfo = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${COLORS.BLACK};
	border-radius: 5px;
	margin: 1vw;
`

const Text = styled.div`
	color: ${COLORS.WHITE};
	margin: 5px;
	padding: 5px;
`

const Genre = styled.div`
	display: flex;
	align-content: center;
	flex-direction: row;
	justify-content: center;
	padding: 5px;
`

const Title = styled.div`
	display: flex;
	justify-content: center;
	font-size: 5vw;
`

function InfoMovie(detail) {
	return (
		<div>
			<ExpansionPanel className="card">
				<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				>
				More information
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="info">
					<Title>{ detail.title }</Title>
					<Header>
						<div>
							{ detail.year }
						</div>
						
						<div>
							{ detail.runtime } min
						</div>
						<Rating name="read-only" precision={ 0.5 } value={ detail.rating / 2 } size="small" readOnly />
					</Header>
					<ContainerInfo>
						<Text>Overview:</Text>
						<Text>{ detail.description_full }</Text>
					</ContainerInfo>
					<ContainerInfo>
						<Text>Genres:</Text>
						<Genre>
							{detail.genres === undefined ? '' : detail.genres.map((elem, index) => {
								return (
									<Text key={ index } >
										{ elem }
									</Text>
								)
							})}
						</Genre>
					</ContainerInfo>
					<img className="media" src={detail.medium_cover_image} alt="" />
				</ExpansionPanelDetails>
			</ExpansionPanel>
    	</div>
	)
}

export default function Watch() {
	const [detail, setDetail] = useState([]);
	const [hashPopcorn, setHashPopCorn] = useState('')
	const { id, imdb } = useParams();

	var info = 'https://yts.mx/api/v2/movie_details.json?movie_id=' + id;
	var urlPopCorn = '/movie/popcorn/' + imdb;


	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		fetch(info, {
			signal: signal,
		}).then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		}).then((parsedData) => {
			setDetail(parsedData.data.movie);
		}).catch(error => {
			console.log("Error for movie information !")
		});
		
		api.get(urlPopCorn)
		.then((res) => {
			setHashPopCorn(res.data.torrents.en);
		}).catch((err) => {
			console.log(err);
		})


		return function cleanup() {
			abortController.abort()
		}
	}, [info, urlPopCorn])

	return (
		<div height="100vh">
			<ContainerWatch>
				{ hashPopcorn === '' ? '' : <Film yts ={detail.torrents} popCorn={hashPopcorn} movie={ imdb } id={ id } /> }
				{ InfoMovie(detail) }
				<Comment />
			</ContainerWatch>
		</div>
	)
}