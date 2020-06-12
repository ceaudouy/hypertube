import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../api/api'
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
	  '& > *': {
		margin: theme.spacing(1),
	  },
	},
	comment: {
		width: '60%',
	},
	button: {
		widht: '20%',
		margin: theme.spacing(1),
	}
  }));

const CommentSection = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 80%;
	background: #adb5bd;
`

export default function Comment() {
	const classes = useStyles();
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

		api.post('/movie/comment', type, movie)
		.then((res) => {
			setComment(res);
			console.log(res);
		})
		.catch((err) => {
			console.log(err)
		})
	},[setComment, reload]);

	const handleClick = (e) => {
		e.preventDefault();
		if (input && input !== "") {
			const type = window.location.href.split('?')[1].split('&')[0];
			const movie = window.location.href.split('&')[1];
			const obj = {movie: movie, type: type, comment: input}

			console.log(obj);
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
				<div className="comment">
					<textarea onChange={handleChange} name="comment" value={ input }type="text" placeholder="Laisser un commentaire ..." className="input-comment" />
					<Button type="submit" className={classes.button} variant="contained" color="primary">
       					Ajouter un commentaire
      				</Button>
				  </div>
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