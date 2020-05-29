import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

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
		fetch('http://localhost:3300/movie/getComment', {
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(
				{
					type: type,
					movie: movie,
				}
			)
		}).then(response => {
			return response.json();
		}).then( parsedData => {
			setComment(parsedData.response);
			setLogin(parsedData.login)
		})
	},[setComment, reload]);

	const handleClick = (e) => {
		e.preventDefault();
		if (input && input !== "") {
			const type = window.location.href.split('?')[1].split('&')[0];
			const movie = window.location.href.split('&')[1];
		
			const token = localStorage.getItem('token');
			fetch('http://localhost:3300/movie/comment', {
				method: 'POST',
				credentials: 'include',
				headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': token
				}),
				body: JSON.stringify(
					{
						comment: input,
						movie: movie,
						type: type,
					}
				)
			}).then(response => {
				return response.json();
			}).then(parsedData => {
				setInput('');
				setReload(reload + 1);
			})
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
		<div>
			<form onSubmit={handleClick}>
				<div className="comment">
					<textarea onChange={handleChange} name="comment" value={ input }type="text" placeholder="Laisser un commentaire ..." className="input-comment" />
					<Button type="submit" className={classes.button} variant="contained" color="primary">
       					Ajouter un commentaire
      				</Button>
				  </div>
			</form>
			<div className="comment-section">
				{comment.map((elem, index) => {
					return (
						<div key={ index }>
							<div className="comment-display" >
								<div>
									{elem.login}:
								</div>
								<div className="comment-center">
									{elem.comment}
								</div>
								<div>
									{ elem.login === login ? <DeleteIcon onClick={ e => handleDelete(elem) } /> : '' }
								</div>
							</div>
							<div className="trait" />
						</div>
					)
				})}
			</div>
		</div>
	)
}