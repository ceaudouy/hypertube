import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Select from 'react-select';

import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'
import Loader from '../../components/Loader/Loader'
import Input from '../../components/Input/Input'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const MainSubContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    @media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		margin-top: 10vh;
		width: 80%;
	}
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 90%;
	}
`

const AccountPicture = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const ProfileImage = styled.img`
	&:hover {
		filter: brightness(1.2);
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		max-height: 50vh;
		max-width: 50vw;
	}
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		max-height: 20vh;
		max-width: 20vw;
	}
`

const StyledInput = styled.input`
	display: none;
`

const AccountInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 5vh;
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 80%;
	}
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 20%;
	}
`

const SubmitButton = styled.button`
	width: 100%;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	border-radius: 4px;
	outline: none;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

const SelectContainer = styled.div`
	margin-top: 2vh;
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 80%;
	}
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 20%;
	}
`

function Profile() {
	const [user, setUser] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const [fetch, setFetch] = useState(false);
	const [language, setLanguage] = useState("en");

	useEffect(() => {
		api.get('/user/')
		.then((res) => {
			setUser(res.data);
			setFetch(true);
		})
		.catch(err => {
			console.log(err);
		});
	}, [])


	const addPictureFile = (e) => {
		if (e.target.files[0].name)
		setSelectedFile({
			file: e.target.files[0],
			loaded: 0,
		});	
	}

	const uploadPicture = () => {
		if (selectedFile && selectedFile.file) {
			const data = new FormData()
			data.append('file', selectedFile.file, {})
			api.post('/user/picture', data)
			.then((res) => {
				api.get('/user/')
				.then((res) => {
					setUser(res.data);
					setFetch(true);
				})
				.catch(err => {
					console.log(err);
				});
			})
			.catch((err) => {console.log(err);})
		}
	}

    const handleEmail = (e) => {setUser({...user, email: e.target.value})}
    const handleFirstname = (e) => {setUser({...user, firstname: e.target.value})}
    const handleLastname = (e) => {setUser({...user, lastname: e.target.value})}
    const handleLogin = (e) => {setUser({...user, login: e.target.value})}

    const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('langue', language)
		api.post('/user/update', user)
		.catch((err) => {
			console.log(err);
		});
		window.location.reload(false);
	}
	
	let inputFile = '';
	
	return (
		fetch === true ?
		<MainContainer>
			<MainSubContainer>
				<AccountPicture>
					<ProfileImage src={`${process.env.REACT_APP_API_URL}/${user.picture}`} alt={user.login} key={user.firstname} onClick={(e) => {inputFile.click();}} />
					<StyledInput type="file" accept="image/*" name="file" label="pic" onChange={addPictureFile} ref={input => inputFile = input}/>
					<SubmitButton type="button" onClick={uploadPicture}>{user.picture === "image/one.jpg" ? "Upload Picture" : "Change Picture"}</SubmitButton>
				</AccountPicture>
				<SelectContainer>
					<Select onChange={(event) => setLanguage(event.label)} options={[{label: 'fr' }, {label: 'en' }]} placeholder="choose language"/>
				</SelectContainer>
				<AccountInfo>
					<Input type='email' name='email' handleChange={handleEmail} value={ user ? user.email : "" }/>
					<Input type='text' name='firstname' handleChange={handleFirstname} value={ user ? user.firstname : "" }/>
					<Input type='text' name='lastname' handleChange={handleLastname} value={ user ? user.lastname : "" }/>
					<Input type='text' name='login' handleChange={handleLogin} value={ user ? user.login : "" }/>
					<SubmitButton type="submit" onClick={handleSubmit}>Update</SubmitButton>
				</AccountInfo>
			</MainSubContainer>
		</MainContainer>
		: <Loader/>
	);
}

export default Profile;