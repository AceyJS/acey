import React, { useState } from 'react';
import './App.css';
import TodoController from './ascey/controllers/todo'
import { connect } from 'react-ascey'

function App(props: any) {
  const {
    todolist 
  } = props

  const [text, setText] = useState('')
  const [isSortedDesc, setSortDesc] = useState(false)

  const onChangeInput = (e: any) => setText(e.target.value)
  const addTodo = () => TodoController.createTodo(text) && setText('')

  const renderSortButton = () => (
    <button 
      onClick={() => setSortDesc(!isSortedDesc)}
    >Sort {isSortedDesc ? 'asc' : 'desc'}</button>
  )

  const renderInput = () => (
    <div style={{margin: 20}}>
      <input onChange={onChangeInput} style={{width: 300, height: 20}} value={text} />
      <button onClick={addTodo}>Add</button>
    </div>
  )

  const renderTodo = (todo: any, idx: number) => {
    return (
      <div key={idx} style={{margin: 10}}>
        <span>{todo.getContent()}</span>
        <span> - </span>
        <span>{todo.getCreatedAt().getMinutes() + ':' + todo.getCreatedAt().getSeconds() }</span>
        <button onClick={() => TodoController.deleteTodo(todo)}>Remove</button>
      </div>      
    )
  }

  return (
    <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center'}}>
      {renderSortButton()}
      {renderInput()}
      {todolist.sortByCreateDate(isSortedDesc ? 'desc' : 'asc').map(renderTodo)}
    </div>
  );
}

const mapStateToProps = () => {
  return {
    todolist: TodoController.getState().getTodolist()
  }
}

export default connect(mapStateToProps)(App)