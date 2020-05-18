import React from 'react'
import styled from 'styled-components'

const AdCase = (props) => {

    const {
        ad
    } = props

    const renderLogo = () => (
        <CenteredWrapper>
            <Logo src={ad.companyLogo()}/>
        </CenteredWrapper>
    )

    const renderApply = () => (
        <CenteredWrapper>
            <div dangerouslySetInnerHTML={{ __html: ad.applyHTML() }} />
        </CenteredWrapper>
    )

    const renderTop = () => (
        <TopWrapper>
            <TypeWrapper>
                <TypeText>{ad.type()}</TypeText>
            </TypeWrapper>
                <TitleText>{ad.title()}</TitleText>
                <DateText>{ad.formatedCreatedAt()}</DateText>
        </TopWrapper>
    )

    return (
        <Container>
            {renderLogo()}
            {renderTop()}
            {renderApply()}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    border: 1px solid black;
    margin-top: 50px;
`

const TopWrapper = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
`

const TypeWrapper = styled.div`
    border: 1px solid purple;
    padding: 7px;
    border-radius: 3px;
`
const TypeText= styled.span`
    color:purple;
    font-size: 13px;
`

const TitleText = styled.h2`
    font-size: 16px;
    font-style: bold;
`

const DateText = styled.span`
    font-size: 12px;
    color: grey;
`

const Logo = styled.img`
    width: 200px;
`

const CenteredWrapper = styled.div`
    display: flex;
    justify-content: center;
`

export default AdCase