import React, { useEffect, useState } from "react";
import '../../css/watch.css';
import { makeStyles } from '@material-ui/core/styles';
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

const TextSecondaire = styled.div`
	font-style: italic;
	margin: 10px;
	font-size: 13px;
`

const Genre = styled.div`
	display: flex;
	align-content: center;
	flex-direction: row;
	justify-content: center;
	padding: 5px;
`

const DisplayCasting = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: stretch;
	margin: 10px;

`

const Casting = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	align-items: stretch;
	margin-top: 10px;
	margin-left: 5px;
	width: 170px;
	margin-right: 5px;
	border-radius: 5px;
	background-color: #adb5bd;
`

const Media = styled.img`
	display: relative;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
	width: 80%;
`

const Title = styled.div`
	display: flex;
	justify-content: center;
	font-size: 5vw;
`

function PutCasting(props) {
	return (
		<ContainerInfo>
				<Text>Casting:</Text>
				<DisplayCasting>
					{ props.casting.map((elem, index) => {
						if (elem.profile_path === undefined || elem.profile_path === null) {
							return ('');
						}
						return (
							<Casting key={ index }>
								<Media src={"http://image.tmdb.org/t/p/w185/" + elem.profile_path} alt="" />
								<Text>
									{ elem.name }
								</Text>
								<TextSecondaire>
									{ elem.character }
								</TextSecondaire>
							</Casting>
						)
					})}
				</DisplayCasting>
		</ContainerInfo>
	)
}

function InfoMovie(detail, casting) {
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
										{ elem.name }
									</Text>
								)
							})}
						</Genre>
					</ContainerInfo>
					<PutCasting casting={casting} />
				</ExpansionPanelDetails>
			</ExpansionPanel>
    	</div>
	)
}

export default function Watch() {
	const [detail, setDetail] = useState([]);
	const [casting, setCasting] = useState([]);
	const [hashPopcorn, setHashPopCorn] = useState('')
	const { id, imdb } = useParams();

	var info = 'https://yts.mx/api/v2/movie_details.json?movie_id=' + id;
	var cast = 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=c618784bdd2787da4972dd45f397869b';
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
		
		fetch(cast, {
			signal: signal,
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		}).then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		}).then((parsedData) => {
			parsedData === undefined ? setCasting([]): setCasting(parsedData.cast);
		}).catch(error => {
			console.log("Error for the casting !")
		})

		api.get(urlPopCorn)
		.then((res) => {
			setHashPopCorn(res.data.torrents.en);
		}).catch((err) => {
			console.log(err);
		})


		return function cleanup() {
			abortController.abort()
		}
	}, [info, cast, urlPopCorn])

	return (
		<ContainerWatch>
			{ hashPopcorn === '' ? '' : <Film yts ={detail.torrents} popCorn={hashPopcorn} /> }
			{ casting === [] ? '' : InfoMovie(detail, casting.slice(0, 8)) }
			<Comment />
		</ContainerWatch>
	)
}