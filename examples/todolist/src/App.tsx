import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoController from './ascey/controllers/todo'
import { connect } from 'react-ascey'

function App(props: any) {
  const {
    todolist
  } = props

  const [text, setText] = useState('')

  const onChange = (e: any) => {
    setText(e.target.value)
  }
  
  const onSubmit = (e: any) => {
    e.preventDefault()
    TodoController.addTodo(text)
    setText('')
  }

  const renderTodo = (todo: any, index: number) => (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <span>{index}. </span>
      <span style={{marginRight: 10}}>{todo.getContent()}</span>
      <button onClick={() => TodoController.removeTodo(todo)}>Delete</button>
    </div>
  )

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={text} style={{width: 200, height: 25}} />
      </form>
      {todolist.sortByCreateDate('asc').map(renderTodo)}
    </div>
  );
}


const mapStateToProps = () => {
  return {
    todolist: TodoController.getState()
  }
}

export default connect(mapStateToProps)(App)
