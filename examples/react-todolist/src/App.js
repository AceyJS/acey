import React, {createRef, useRef} from 'react';
import styled from 'styled-components'
import { useAcey } from 'react-acey'
import { todolist } from './models'

import Todo from './components/todo'
import Input from './components/input'

function App() {
  const inputRef = useRef()

  useAcey([ todolist ])

  const onAddTodo = () => {
    const content = inputRef.current.getValue()
    if (!content) return

    todolist.create(content)
    inputRef.current.reset()
  }

  const onDeleteTodo = (todo) => todolist.delete(todo).save().store()

  const renderTodo = (todo, index) => (
    <div key={index}>
      <Todo onClickDelete={() => onDeleteTodo(todo)} todo={todo}/>
    </div>
  )

  return (
    <Container>
      <Input onClick={onAddTodo} ref={inputRef} />
      {todolist.sortByCreationDate().map(renderTodo)}
    </Container>
  );
}

const Container = styled.div`
  margin: 100px;
`

export default App;
