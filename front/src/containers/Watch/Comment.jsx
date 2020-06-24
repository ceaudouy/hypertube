import React, { useState, useEffect } from "react";
import api from '../../api/api'
import { COLORS } from '../../config/style';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { BREAK_POINTS } from '../../config/style';
import { Link } from 'react-router-dom'

const ContainerComment = styled.div`
	width: 100%;
`
const CommentText = styled.div`
	margin: 5px;
	display: flex;
	align-items: center;
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

const Display = styled.div`
	margin: 5px;
	padding: 5px;
`

const Center = styled.div`
 	display: flex;
	justify-content: center;
`

const Barre = styled.div`
	margin-left: auto;
	margin-right: auto;
	border-bottom: 1px solid #272727;
	width: 70%;
`

const CommentSection = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 80%;
	background: #adb5bd;
`
const SLink = styled(Link)`
	text-decoration: none;
`

const Img = styled.img`
	width: 15px;
`

export default function Comment() {
	const [input, setInput] = useState('');
	const [comment, setComment] = useState([]);
	const [reload, setReload] = useState(1);
	const { imdb } = useParams();
	
	const handleChange = (e) =>{
		const item = e.currentTarget.value;
		setInput(item); 
	}

	
	useEffect(() => {
		if (imdb) {
			api.get('/movie/comment', {params: {movie: imdb}})
			.then((res) => {
				setComment(res.data);
				setInput('');
			})
			.catch((err) => {
				console.log(err)
			})
		}
	},[reload, imdb]);
	
	const handleClick = (e) => {
		if (input && input !== "") {
			api.post('/movie/comment', {movie: imdb, comment: input})
			.then((res) => {
				setReload(reload + 1); 
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
	
	return (
		<ContainerComment>
				<CommentText>
					<textarea onChange={ handleChange } name="comment" value={ input } type="text" placeholder="Laisser un commentaire ..." className="input-comment" />
					<Button type="submit" onClick={ e => handleClick(e) } >
       					Send comment
      				</Button>
				</CommentText>
			<CommentSection>
				{comment.map((elem, index) => {
					return (
						<div key={ index }>
							<Display>
								<Img src= {`${process.env.REACT_APP_API_URL}/${elem.user.picture}` } />
								<SLink to={ `/user/${elem.user.id}` }>
									{elem.user.login} :
								</SLink>
								<Center>
									{elem.comment}
								</Center>
							</Display>
							<Barre />
						</div>
					)
				})}
			</CommentSection>
		</ContainerComment>
	)
}