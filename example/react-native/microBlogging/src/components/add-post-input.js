import React, {useState} from 'react';
import { 
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Dimensions
 } from 'react-native';

import styled from 'styled-components'

const {width} = Dimensions.get('window')

const AddPostInput = (props) => {

    const {
        onSubmit
    } = props

    const [text, setText] = useState('')


    const onLocalSubmit = () => {
        onSubmit(text)
        setText('')
    }

    const renderSubmitTouchable = () => (
        <SubmitTouchable onPress={onLocalSubmit}>
            <SubmitText>CREATE</SubmitText>
        </SubmitTouchable>
    )

    return (
        <Container>
            <Input
                value={text}
                onChangeText={(text) => setText(text)}
                width={width - 42} 
                multiline
            />
            {renderSubmitTouchable()}
        </Container>        
    )
}

const Container  = styled.View`
`

const Input = styled.TextInput`
    width: ${props => props.width}px;
    height: 120px;
    font-size: 15px;
    color: #353535;
    background-color: white;
    box-shadow: 0px 0px 5px rgba(35,35,35,0.15);
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    padding: 10px;
`

const SubmitTouchable = styled.TouchableOpacity`
   height: 50px;
   background-color: #5C257F;
   border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    align-items: center;
    justify-content: center;
`

const SubmitText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 18px;
`

export default AddPostInput