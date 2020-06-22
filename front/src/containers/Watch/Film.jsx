import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS, BREAK_POINTS } from '../../config/style'
import api from '../../api/api';


const ContainerSource = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`

const Source = styled.div`
    display: flex;
    justify-content: center;
`

const Video = styled.video`
    display: flex;
    justify-content: center;
    margin: 5px;
    width: 80%;
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
	if (props.popCorn !== undefined) {
		var urlLow = props.popCorn['720p'].url.match(/magnet:\?xt=urn:btih:([a-z\d]{40})/im)[1];
		var urlHigh = props.popCorn['1080p'].url.match(/magnet:\?xt=urn:btih:([a-z\d]{40})/im)[1];
	}

    const HandleClick = e => {
		console.log()
		setHash(e)
		api.post('/movie/view', { movie: props.movie })
		.then(res => {
		}).catch(err => { 
			console.log(err);
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
            <Video>
            { hash === '' ? '' :
                <video controls autoPlay crossOrigin="anonymous">
                    <source src={'http://matchapi.guillaumerx.fr:3300/movie/video?hash=' + hash} />
                </video>
            }
            </Video>
        </ContainerSource>
    )
}