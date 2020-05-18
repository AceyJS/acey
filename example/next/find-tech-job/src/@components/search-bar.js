import React, { useState } from 'react'
import styled from 'styled-components'

const SearchBar = (props) => {
    const {
        onSearch
    } = props

    const [text, setText] = useState('')
    return (
        <Container>
            <Input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => onSearch(text)}>Search</button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Input = styled.input`
    width: 300px;
    height: 30px;
    font-size: 16px;
`

export default SearchBar