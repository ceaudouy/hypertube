import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu, Button } from '@material-ui/core';
import { AccountCircle, Search as SearchIcon, FavoriteRounded as FavoriteRoundedIcon, VisibilityRounded as VisibilityRoundedIcon, HighlightOffRounded as HighlightOffRoundedIcon, More as MoreIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
		color: 'white',
		cursor: 'pointer',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200,
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	}
}));

function Header() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const [research, setResearch]= useState('');
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const token = localStorage.getItem('token');

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleSubmit = () => {
		if (research !== '') {
			localStorage.setItem('research', research);
			document.location.href = '/search';
		}
	}

	const handleChange = (event) => {
		setResearch(event.target.value);
	}

	const handleAccueil = () =>{
		document.location.href = "/";
	}

	const handleFavorites = () => {
		document.location.href = "/favorites";
	}

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
		anchorEl={anchorEl}
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		id={menuId}
		keepMounted
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		open={isMenuOpen}
		onClose={handleMenuClose}
		>
			{token === null ? (
				<MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
			) : (
				<div>
					<MenuItem onClick={handleMenuClose}>My Account</MenuItem>
					<MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
				</div>
			)}
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
		anchorEl={mobileMoreAnchorEl}
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		id={mobileMenuId}
		keepMounted
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		open={isMobileMenuOpen}
		onClose={handleMobileMenuClose}
		>
			{token === null ? (
				<MenuItem onClick={handleMobileMenuOpen}>
					<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<p>Sign In</p>
				</MenuItem>
			) : (
				<div>
					{/* { SelectLanguage() } */}
					<MenuItem>
						<IconButton color="inherit">
							<VisibilityRoundedIcon />
						</IconButton>
						<p>Views</p>
					</MenuItem>
					<MenuItem>
						<IconButton color="inherit" onClick={handleFavorites}>
							<FavoriteRoundedIcon />
						</IconButton>
					<p>Favorites</p>
					</MenuItem>
					<MenuItem onClick={handleProfileMenuOpen}>
						<IconButton
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<p>My Account</p>
					</MenuItem>
					<MenuItem onClick={handleProfileMenuOpen}>
						<IconButton
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						color="inherit"
						>
							<HighlightOffRoundedIcon />
						</IconButton>
						<p>Sign Out</p>
					</MenuItem>
				</div>
			)}
		</Menu>
	);

	if (token === null) {
		return (
			<div className={classes.grow}>
			<AppBar position="static" color="secondary">
			<Toolbar>
				<Typography className={classes.title} variant="h6" noWrap onClick={handleAccueil}>
					Hyperloop
				</Typography>
				<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton
						edge="end"
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
				<div className={classes.sectionMobile}>
					<IconButton
					aria-label="show more"
					aria-controls={mobileMenuId}
					aria-haspopup="true"
					onClick={handleMobileMenuOpen}
					color="inherit"
					>
						<MoreIcon />
					</IconButton>
				</div>
				
			</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			</div>
		)
	} else {
		return (
			<div className={classes.grow}>
			<AppBar position="static" color="secondary">
			<Toolbar>

				<Typography className={classes.title} variant="h6" noWrap onClick={handleAccueil}>
					Hyperloop
				</Typography>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
					placeholder="Search…"
					classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
					}}
					inputProps={{ 'aria-label': 'search' }}
					onChange={handleChange}
					/>
					<Button onClick={handleSubmit} variant="contained" color="primary">
						Search
					</Button>
				</div>
				<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
					{/* { SelectLanguage() } */}
					</div>
					<div className={classes.sectionDesktop}>
						<IconButton color="inherit">
							<VisibilityRoundedIcon />
						</IconButton>
						<IconButton color="inherit" onClick={handleFavorites}>
							<FavoriteRoundedIcon />
						</IconButton>
						<IconButton
						edge="end"
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
				<div className={classes.sectionMobile}>
					<IconButton
					aria-label="show more"
					aria-controls={mobileMenuId}
					aria-haspopup="true"
					onClick={handleMobileMenuOpen}
					color="inherit"
					>
						<MoreIcon />
					</IconButton>
				</div>
			</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			</div>
		)
	};
}

export default Header;
