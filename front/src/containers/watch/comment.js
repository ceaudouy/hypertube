import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
		height: '3em',
		margin: theme.spacing(1),
	}
  }));

export default function Comment() {
	const classes = useStyles();
	const [input, setInput] = useState('');

	const handleChange = (e) => setInput({
		...input,
		[e.currentTarget.name]: e.currentTarget.value
	})

	const handleClick = (e) => {
		e.preventDefault();
		if (input && input.comment !== "") {
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
			})
		}
	}

	return (
		<div className="comment">
				<textarea onChange={handleChange} name="comment" type="text" placeholder="Laisser un commentaire ..." className="input-comment" />
				<Button onClick={handleClick} className={classes.button} variant="contained" color="primary">
       				Ajouter un commentaire
      			</Button>
		</div>
	)
}