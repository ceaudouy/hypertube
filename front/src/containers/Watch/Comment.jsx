import React, { useState, useEffect } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../api/api'
import { COLORS } from '../../config/style';
import styled from 'styled-components';

const ContainerComment = styled.div`
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
	height: 3vw;
	margin: 1vw;
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

export default function Comment() {
	const [input, setInput] = useState('');
	const [comment, setComment] = useState([]);
	const [reload, setReload] = useState(1);
	const [login, setLogin] = useState('');
	const handleChange = (e) =>{
		const item = e.currentTarget.value;
		setInput(item); 
	}

	
	useEffect(() => {
		const type = window.location.href.split('?')[1].split('&')[0];
		const movie = window.location.href.split('&')[1];

		api.get('/movie/comment', movie, type)
		.then((res) => {
			setComment(res);
			console.log(res);
		})
		.catch((err) => {
			console.log(err)
		})

		// fetch('http://localhost:3300/movie/getComment', {
		// 	method: 'post',
		// 	headers: new Headers({
		// 		'Content-Type': 'application/json',
		// 	}),
		// 	body: JSON.stringify(
		// 		{
		// 			type: type,
		// 			movie: movie,
		// 		}
		// 	)
		// }).then(response => {
		// 	return response.json();
		// }).then( parsedData => {
		// 	setComment(parsedData.response);
		// 	setLogin(parsedData.login)
		// })
	},[setComment, reload]);

	const handleClick = (e) => {
		e.preventDefault();
		if (input && input !== "") {
			const type = window.location.href.split('?')[1].split('&')[0];
			const movie = window.location.href.split('&')[1];
			const obj = {movie: movie, type: type, comment: input}

			api.post('/movie/comment', obj)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err)
			})
		
		
			// fetch('http://localhost:3300/movie/comment', {
			// 	method: 'POST',
			// 	credentials: 'include',
			// 	headers: new Headers({
			// 		'Content-Type': 'application/json',
			// 		'Authorization': token
			// 	}),
			// 	body: JSON.stringify(
			// 		{
			// 			comment: input,
			// 			movie: movie,
			// 			type: type,
			// 		}
			// 	)
			// }).then(response => {
			// 	return response.json();
			// }).then(parsedData => {
			// 	setInput('');
			// 	setReload(reload + 1);
			// })
		}
	}

	const handleDelete = (e) => {
		const token = localStorage.getItem('token');
		fetch('http://localhost:3300/movie/deleteComment', {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': token
			}),
			body: JSON.stringify(
				{
					comment: e,
				}
			)
		}).then(response => {
			return response.json();
		}).then(parsedData => {
			setReload(reload + 1);
		})
	}

	return (
		<ContainerComment>
			<form onSubmit={handleClick}>
				<CommentText>
					<textarea onChange={handleChange} name="comment" value={ input }type="text" placeholder="Laisser un commentaire ..." className="input-comment" />
					<Button type="submit">
       					Ajouter un commentaire
      				</Button>
				</CommentText>
			</form>
			<CommentSection>
				{comment.map((elem, index) => {
					return (
						<div key={ index }>
							<Display>
								<div>
									{elem.login}:
								</div>
								<Center>
									{elem.comment}
								</Center>
								<div>
									{ elem.login === login ? <DeleteIcon onClick={ e => handleDelete(elem) } /> : '' }
								</div>
							</Display>
							<Barre />
						</div>
					)
				})}
			</CommentSection>
		</ContainerComment>
	)
}