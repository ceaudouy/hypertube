import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS, BREAK_POINTS } from '../../config/style'
import api from '../../api/api';
import ReactPlayer from 'react-player'

const ContainerSource = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`

const Source = styled.div`
    display: flex;
    justify-content: center;
`

const Display = styled.div`
    display: flex;
    justify-content: center;
`

const Button = styled.button`
	border-radius: 5px;
	background-color: ${COLORS.BLUE};
	width: 20%; 
	color: ${COLORS.WHITE};
	outline: none;
	border: none;
	height: 4vw;
	margin: 1vw;
	font-size: 1vw;
	@media (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		font-size: 3vw;
		height: 7vw;
	}
`

export default function Film(props) {
	const [hash, setHash] = useState('');
	const [subtitleFR, setSubtitleFR] = useState('');
	const [subtitleEN, setSubtitleEN] = useState('');

	if (props.popCorn !== undefined) {
		if (props.popCorn['720p'] !== undefined) {
			var urlLow = props.popCorn['720p'].url.match(/magnet:\?xt=urn:btih:([a-z\d]{40})/im)[1];
		} if (props.popCorn['1080p'] !== undefined) {
			var urlHigh = props.popCorn['1080p'].url.match(/magnet:\?xt=urn:btih:([a-z\d]{40})/im)[1];
		}
	}

    const HandleClick = e => {
		setHash(e)
		api.post('movie/view', { movie: props.id })
		.catch(err => { 
			console.log(err);
		})

		api.get(`movie/subs?imdbid=${props.movie}&lang=fr`)
		.then( res => {
			setSubtitleFR(res.data.url);
		})

		api.get(`movie/subs?imdbid=${props.movie}&lang=en`)
		.then( res => {
			setSubtitleEN(res.data.url);
		})
    }

	return (
        <ContainerSource>
            <Source>
                { props.yts && props.yts[0] &&
				 	<Button onClick={ e => HandleClick(props.yts[0].hash)} >
						 YTS 720P
					</Button> 
                }
				{ props.yts && props.yts[1] &&
					<Button onClick={ e => HandleClick(props.yts[1].hash)} >
						YTS 1080P
		   			</Button> 
                }
                { props.popCorn && props.popCorn['720p'] &&
					<Button onClick={ e => HandleClick(urlLow)} >
						PopCorn 720P
				   	</Button> 
                }
                { props.popCorn && props.popCorn['1080p'] &&
				 	<Button onClick={ e => HandleClick(urlHigh)} >
						PopCorn 1080P
					</Button>  
                }
            </Source>
            <Display>
				<ReactPlayer 
					playing
					controls
					url={ hash && [`${process.env.REACT_APP_API_URL}movie/video?hash=${hash}`]}
				 	config={{ file: {
						 attributes: {
							 crossOrigin: 'true',
							 controlsList: 'nodownload'
						},
						tracks: [
							{kind: "subtitles", src: `${process.env.REACT_APP_API_URL}${subtitleFR}`, srcLang: "fr"},
							{kind: "subtitles", src: `${process.env.REACT_APP_API_URL}${subtitleEN}`, srcLang: "en"}
						]}
					}}
				 />
            </Display>
        </ContainerSource>
    )
}