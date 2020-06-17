import React from "react"
import styled from "styled-components"
import { COLORS, BREAK_POINTS } from "../../config/style"

const PasswordStrenghContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    & > * {
		margin-top: 2vh;
	};
`

const PasswordStrenghBarContainer = styled.div`
	display: flex;
	height: 20px;
	width: 100%;
`

const Bar = styled.span`
	margin-right: 5px;
    height: 100%;
    width: 25%;
    transition: box-shadow 500ms;
`

const BarOne = styled(Bar)`
	background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_RED}, ${COLORS.PASSWORD_ORANGE})` : `${COLORS.BLACK}`};
`

const BarTwo = styled(Bar)`
    background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_ORANGE}, ${COLORS.PASSWORD_YELLOW})` : `${COLORS.BLACK}`};
`

const BarThree = styled(Bar)`
    background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_YELLOW}, ${COLORS.PASSWORD_YELLOWGREEN})` : `${COLORS.BLACK}`};
`

const BarFour = styled(Bar)`
    background: ${p => p.active ? `linear-gradient(to right, ${COLORS.PASSWORD_YELLOWGREEN}, ${COLORS.PASSWORD_GREEN})` : `${COLORS.BLACK}`};
`

const PasswordIndicationContainer = styled.div`
	display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > * {
		margin-top: 1vh;
	};
`

const Typography = styled.label`
	color: ${p => p.active ? 'green' : 'grey'};
    @media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
        font-size: 0.8rem;
	}
`

const PasswordStrength = ({strength, password}) => {
    return (
        <PasswordStrenghContainer>
            <PasswordStrenghBarContainer>
                <BarOne active={strength > 0}></BarOne>
                <BarTwo active={strength > 1}></BarTwo>
                <BarThree active={strength > 2}></BarThree>
                <BarFour active={strength > 3}></BarFour>
            </PasswordStrenghBarContainer>
            <PasswordIndicationContainer>
                <Typography active={password.search(/[0-9]/) > -1}>number { password.search(/[0-9]/) > -1 ? <>😄</> : <></>}</Typography>
                <Typography active={password.search(/[A-Z]/) > -1}>capital letter { password.search(/[A-Z]/) > -1 ? <>😄</> : <></>}</Typography>
                <Typography active={password.search(/[^A-Za-z0-9]/) > -1}>special character { password.search(/[^A-Za-z0-9]/) > -1 ? <>😄</> : <></>}</Typography>
                <Typography active={password.length > 5}>number of characters { password.length > 5 ? <>😄</> : <></>}</Typography>
            </PasswordIndicationContainer>
        </PasswordStrenghContainer>
    )
}

export default PasswordStrength;