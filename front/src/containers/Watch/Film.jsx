import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config/style'


const ContainerSource = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`

const Source = styled.div`
    display: flex;
    justify-content: center;
`

const Box = styled.div`
    background-color: ${COLORS.GREY_LOVE};
    margin: 10px;


`

const Video = styled.video`
    display: flex;
    justify-content: center;
    margin: 5px;
    width: 80%;
`

export default function Film(props) {
    const [hash, setHash] = useState('');
    const urlLow = props.popCorn['720p'].url.match(/magnet:\?xt=urn:btih:([a-z\d]{40})\&/im)[1];
    const urlHigh = props.popCorn['1080p'].url.match(/magnet:\?xt=urn:btih:([a-z\d]{40})\&/im)[1];

    const HandleClick = e => {
        console.log(e)
       setHash(e)
    }

    
    return (
        <ContainerSource>
            <Source>
                { props.yts[0] &&
                    <Box onClick={ e => HandleClick(props.yts[0].hash)}>
                        YTS 720p
                    </Box>
                }
                { props.yts[1] &&
                    <Box onClick={ e => HandleClick(props.yts[1].hash)}>
                        YTS 1080p
                    </Box>
                }
                { props.popCorn['720p'] &&
                    <Box onClick={ e => HandleClick(urlLow)}>
                       PopCorn 1080p
                    </Box>
                }
                { props.popCorn['1080p'] &&
                    <Box onClick={ e => HandleClick(urlHigh)}>
                       PopCorn 1080p
                    </Box>
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