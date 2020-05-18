import React, { useState } from 'react'
import styled from 'styled-components'

const Todo = (props) => {

    const [isUpdateActived, setUpdateActived] = useState(false)
    const [text, setText] = useState('')

    const {
        todo,
        onClickDelete,
    } = props

    const onUpdate = () => {
        setUpdateActived(true)
        setText(todo.content())
    }

    const onDone = () => {
        todo.updateContent(text)
        setUpdateActived(false)
    }

    const renderActions = () => !isUpdateActived && (
        <ActionsWrapper>
            <button onClick={onClickDelete}>Delete</button>
            <button style={{marginLeft: 20}} onClick={onUpdate}>Update</button>
        </ActionsWrapper>
    )

    const renderUpdateMenu = () => isUpdateActived && (
        <UpdateMenu>
            <UpdateInput 
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <button onClick={onDone}>done</button>
        </UpdateMenu>
    )
    

    return (
        <Container>
            {!isUpdateActived && <div>
                <DateWrapper>
                    <DateText>{todo.formatedCreationDate()}</DateText>
                </DateWrapper>
                <ContentText>{todo.content()}</ContentText>
            </div>}
            {renderUpdateMenu()}
            {!isUpdateActived && renderActions()}
        </Container>
    )
}

const Container = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    margin-top: 30px;
`

const DateWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const DateText = styled.span`
    font-size: 12px;
    color: grey;
`

const ContentText = styled.p`
    font-size: 16px;
    color: #353535;
    margin-top: 20px;
`

const ActionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
`

const UpdateMenu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const UpdateInput = styled.textarea`
    width: 60%;
    height: 80px;

`


export default Todo