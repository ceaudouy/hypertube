import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'
import Loader from '../../components/Loader/Loader'
import Input from '../../components/Input/Input'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    @media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 80%;
	}
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		width: 80%;
	}
`

const AccountPicture = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const ProfileImage = styled.img`
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
	/* display: inline-block;
	width: 100%;
	margin: 8px 0;
	padding: 12px 20px;
	border: 1px solid;
	border-radius: 4px;
	box-sizing: border-box;
	background-color: ${COLORS.PURPLE_LIGHT};
	&::-webkit-file-upload-button {
		visibility: hidden;
	} */

	display: none;

	/* margin: 0;
	padding: 2rem 1.5rem;
	font: 1rem/1.5 "PT Sans", Arial, sans-serif;
	color: #5a5a5a;
	&:before, &:after {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	} */
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

function Profile() {
	const [user, setUser] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const [fetch, setFetch] = useState(false);

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
        
    const handleMail = (e) => {setUser({...user, email: e.target.value})}
    const handleFirstname = (e) => {setUser({...user, firstname: e.target.value})}
    const handleLastname = (e) => {setUser({...user, lastname: e.target.value})}
    const handleLogin = (e) => {setUser({...user, login: e.target.value})}

    const handleSubmit = (e) => {
		e.preventDefault();
		api.post('/user/update', user)
		.catch((err) => {
			console.log(err);
		});
	}
	
	let inputFile = '';
	
	return (
		fetch === true ?
		<MainContainer>
			<AccountPicture>
				<ProfileImage src={`${process.env.REACT_APP_API_URL}${user.picture}`} alt={user.login} key={user.firstname} onClick={(e) => {inputFile.click();}} />
				<StyledInput type="file" accept="image/*" name="file" label="pic" onChange={addPictureFile} ref={input => inputFile = input}/>
				<SubmitButton type="button" onClick={uploadPicture}>{user.picture === "image/one.jpg" ? "Upload Picture" : "Change Picture"}</SubmitButton>
			</AccountPicture>
			<AccountInfo>
				<Input type='email' name='email' handleChange={handleMail} value={ user ? user.email : "" }/>
				<Input type='text' name='firstname' handleChange={handleFirstname} value={ user ? user.firstname : "" }/>
				<Input type='text' name='lastname' handleChange={handleLastname} value={ user ? user.lastname : "" }/>
				<Input type='text' name='login' handleChange={handleLogin} value={ user ? user.login : "" }/>
				<SubmitButton type="submit" onClick={handleSubmit}>Update</SubmitButton>
			</AccountInfo>
		</MainContainer>
		: <Loader/>
	);
}

export default Profile;