import React, { useState } from 'react'
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window')

import styled from 'styled-components'

const Post = (props) => {
    const {
        post,
        onDelete
    } = props

    const [updateText, setUpdateText] = useState(post.content())
    const [isUpdating, setUpdatingStatus] = useState(false)

    onSubmitUpdate = () => {
        post.updateContent(updateText)
        setUpdatingStatus(false)
    }

    const renderUpdateContainer = () => (
        <UpdateContainer>
            <UpdateInput multiline={true} value={updateText} onChangeText={(text) => setUpdateText(text)} />
            <UpdateSubmitTouchable onPress={onSubmitUpdate}>
                <UpdateSubmitText>
                    UPDATE
                </UpdateSubmitText>
            </UpdateSubmitTouchable>
        </UpdateContainer>
    )

    const renderAction = (title = '', color = '', onPress = null) => (
        <ActionTouchable onPress={onPress} color={color}>
            <ActionText color={color}>{title}</ActionText>
        </ActionTouchable>
    )

    const renderActions = () => (
        <ActionsWrapper>
            {renderAction('Update', 'blue', () => setUpdatingStatus(true))}
            <View style={{width: 35}}/>
            {renderAction('Delete', 'red', () => onDelete(post))}
        </ActionsWrapper>
    )

    return (
        <Container width={width - 42}>
            {!isUpdating && <View>
                <TopWrapper>
                    <DateText>{post.formatedCreationDate()}</DateText>
                </TopWrapper>
                <ContentText>{post.content()}</ContentText>
                {renderActions()}
            </View>}
            {isUpdating && renderUpdateContainer()}
        </Container>
    )

}

const Container = styled.View`
    width: ${props => props.width}px;
    padding: 21px;
    background-color: white;
    box-shadow: 0px 0px 5px rgba(35,35,35,0.15);
    border-radius: 7px;
    margin-top: 30px;
`

const TopWrapper = styled.View`
    align-items: flex-end;
`

const DateText = styled.Text`
    font-size: 12px;
    color: grey;
    margin-bottom: 21px;
`

const ContentText = styled.Text`
    font-size: 15px;
    text-align: justify;
    color: #353535;
`

const ActionsWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 35px;
    justify-content: center;
`

const ActionTouchable = styled.TouchableOpacity`
    border: ${props => '1px solid '+ props.color}; 
    padding: 7px;
`

const ActionText = styled.Text`
    color: ${props => props.color};
    font-size: 14px;
    font-weight: bold;
`

const UpdateContainer = styled.View`
`

const UpdateInput = styled.TextInput`
    width: 100%;
    height: 90px;
    border: 2px solid cadetblue;
    border-radius: 3px;
    padding: 10px;
`

const UpdateSubmitTouchable = styled.TouchableOpacity`
    margin-top: 10px;
    padding: 7px;
    background-color: cadetblue;
    align-items: center;
    justify-content: center;
    border-radius: 3px;

`

const UpdateSubmitText = styled.Text`
    font-size: 13px;
    color: white;
    font-weight: bold;
`

export default Post