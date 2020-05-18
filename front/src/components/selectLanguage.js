import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(0, 0, 0, 5),
			maxWidth: 120,
		},
	},
	button: {
		display: 'block',
		marginTop: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(1),
		maxWidth: 140,
	},
}));


export default function SelectLanguage() {
	const classes = useStyles();
	const [openLangue, setOpenLangue] = React.useState(false);

	const langueChange = event => {
		localStorage.setItem('langue', event.target.value);
		window.location.reload(false);
	};

	const handleCloseLangue = () => {
		setOpenLangue(false);
	};

	const handleOpenLangue = () => {
		setOpenLangue(true);
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={openLangue}
					onClose={handleCloseLangue}
					onOpen={handleOpenLangue}
					value={ localStorage.getItem('langue') }
					onChange={langueChange}
				>
					<MenuItem value={'fr'}>Fr</MenuItem>
					<MenuItem value={'en'}>En</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}