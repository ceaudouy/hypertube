import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { COLORS } from '../../config/style'

const OptionContainer = styled.div `
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
	margin: 10;
	background-color: ${COLORS.GREY_LOVE};
	margin-top: 5vw;
	border-radius: 5px;
`

const OneOption = styled.div `
	position: relative;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: stretch;
	margin-top: 10px;
	margin-bottom: 7px;
	margin-left: 5px;
	margin-right: 4px;
	width: 100px;
`

const Text = styled.div`
	color: white;
	font-size: 0.9em;
	margin-left: 7%;
	margin-bottom: 2px;
`

const Select = styled.select`
	outline: none;
`

export default function SelectEpisode(seasons) {
	const [saison, setSaison] = useState(seasons === undefined ? 0 : seasons[0].episode_count);
	const [episodeNBR, setEpisodeNBR] = useState(0);

	const handleChange = e => {
		let select = e.target.value
		if (select === '') {
			return ;
		}
		setEpisodeNBR(seasons[select - 1].episode_count);
	} 

	const episode = () => {
		var obj = []
		for (let i = 1; i <= episodeNBR; i++) {
			obj[i] = <option key={ i } value={ i }>episode { i } </option>
		}
		return obj;
	}

	return (
		<OptionContainer>
			<OneOption>
				<Text>Seasons :</Text>
				<Select onChange={ e => handleChange(e) }>
					<option value="">Select season</option>
					{ seasons && seasons.map((elem, index) => {
						console.log(elem)
						return (
							<option key={ index } value={ elem.season_number }>season { elem.season_number } </option>
						);
					})}
				</Select>
			</OneOption>
			<OneOption>
				<Text>Episodes :</Text>
				<Select>
					{ episode() }
					
				</Select>
			</OneOption>
		</OptionContainer>
	);
}