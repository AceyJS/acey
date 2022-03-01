import React from 'react'
import styled from 'styled-components'

class TodoInput extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            text: ''
        }
    }

    static defaultProps = {
        onClick: null,
    }

    getValue = () => this.state.text
    reset = () => this.setState({text: ''})

    onChangeText = (e) => this.setState({text: e.target.value})

    render = () => {
        return (
            <Container>
                <Input 
                    onChange={this.onChangeText}
                    value={this.getValue()}        
                />
                <button onClick={this.props.onClick}>Add</button>
            </Container>
        )
    }
}



const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
`

const Input = styled.textarea`
    width: 500px;
    height: 100px;
    font-size: 16px;
    color: #353535;
`


export default TodoInput
