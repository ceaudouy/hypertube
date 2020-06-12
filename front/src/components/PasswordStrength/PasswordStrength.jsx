import React from "react"
import styled from "styled-components"
import { COLORS } from "../../config/style"

const PasswordStrenghContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
`

const Typography = styled.p`
	color: ${p => p.active ? 'green' : 'grey'};
`

const PasswordStrength = ({strength, input}) => {
    return (
        <PasswordStrenghContainer>
            <PasswordStrenghBarContainer>
                <BarOne active={strength > 0}></BarOne>
                <BarTwo active={strength > 1}></BarTwo>
                <BarThree active={strength > 2}></BarThree>
                <BarFour active={strength > 3}></BarFour>
            </PasswordStrenghBarContainer>
            <PasswordIndicationContainer>
                <Typography active={input.password.search(/[0-9]/) > -1}>{ input.password.search(/[A-Z]/) > -1 ? <>😄</> : <>😞</>} number </Typography>
                <Typography active={input.password.search(/[A-Z]/) > -1}>{ input.password.search(/[A-Z]/) > -1 ? <>😄</> : <>😞</>} capital letter </Typography>
                <Typography active={input.password.search(/[^A-Za-z0-9]/) > -1}>{ input.password.search(/[^A-Za-z0-9]/) > -1 ? <>😄</> : <>😞</>} special character </Typography>
                <Typography active={input.password.length > 5}>{ input.password.length > 5 ? <>😄</> : <>😞</>} number of characters </Typography>
            </PasswordIndicationContainer>
        </PasswordStrenghContainer>
    )
}

export default PasswordStrength;