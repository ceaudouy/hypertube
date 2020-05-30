import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import { AppBar, Tabs , Tab , Typography , Box } from '@material-ui/core'; 

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
`

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography component="div" role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other} >
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

function FullWidthTabs() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = index => {
		setValue(index);
	};

	return (
		<MainContainer id="MainContainer - home.js">
			{/* <AppBar position="static" color="default">
				<Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="secondary" variant="fullWidth" >
					<Tab label="SignUp" {...a11yProps(0)} />
					<Tab label="Sign In" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex} >
				<TabPanel value={value} index={0} dir={theme.direction}>
					<SignUp />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<SignIn />
				</TabPanel>
			</SwipeableViews> */}
		</MainContainer>
	);
}

export default FullWidthTabs;
