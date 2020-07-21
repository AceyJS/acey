import React from 'react';
import { useAcey } from 'react-acey'
import { Counter, Todolist, User } from '../src/models'

const STORE_TYPE = 'store'

Todolist.watch().store(() => {
  console.log('changed??')
})

const Home = (props) => {
  
  const todolists = [Todolist, User.todolist()]
  const counters = [Counter, User.counter()]

  useAcey([
    Counter,
    Todolist,
    User
  ])

  const method = (list = [], method = '', then = '' | 'cookie' | 'localStore') => {
    list.forEach((v) => {
      const ret = v[method]()
      then && ret[then]()
    })
  }
  
  const increment = (then = '' | 'cookie' | 'localStore') => {
    method(counters, 'increment', then)
    const list = []
    todolists.map((l) => l.map((t) => list.push(t.counter())))
    method(list, 'increment', then)
  }
  const decrement = (then = '' | 'cookie' | 'localStore') => {
    method(counters, 'decrement', then)
    const list = []
    todolists.map((l) => l.map((t) => list.push(t.counter())))
    method(list, 'decrement', then)
  }
  const addTodo = (then = '' | 'cookie' | 'localStore') => method(todolists, 'add', then)
  const deleteFirst = (then = '' | 'cookie' | 'localStore') => method(todolists, 'deleteFirst', then)
  const deleteLast = (then = '' | 'cookie' | 'localStore') => method(todolists, 'deleteLast', then)
  const toZZZLast = (then = '' | 'cookie' | 'localStore') => method(todolists, 'toZZZLast', then)

  const clearAllCookie = () => {
    Todolist.cookie().remove()
    Counter.cookie().remove()
    User.cookie().remove()
    window.location.reload()
  }

  const clearLocalStore = () => {
    Todolist.localStore().remove()
    Counter.localStore().remove()
    User.localStore().remove()
    window.location.reload()
  }

  return (
    <div className="container">
      <h1>{props.id}</h1>
      <button onClick={clearAllCookie}>clear cookies</button>
      <button onClick={clearLocalStore}>clear local stores</button>
      <br />
      <br />

      <button onClick={() => decrement(STORE_TYPE)}>decrement</button>
      {counters.map((v, index) => <span style={{marginLeft: 10, marginRight: 10}} key={index}>{v.get()}</span>)}
      <button onClick={() => increment(STORE_TYPE)}>increment</button>
      <br />

      <button onClick={() => addTodo(STORE_TYPE)}>Add element</button>
      <button onClick={() => deleteFirst(STORE_TYPE)}>Del 1st element</button>
      <button onClick={() => deleteLast(STORE_TYPE)}>Del last element</button>
      <button onClick={() => toZZZLast(STORE_TYPE)}>ToZZ last</button>

      <div>
          {todolists.map((list, index) => {
            return <div key={index}>
              <h1>Todolist {index}</h1>
              {list.map((todo, index) => {
                return <div key={index}>
                  <span>{todo.content()}</span>
                  <span> : </span>
                  <span>{todo.ID()}</span>
                  <span> = </span>
                  <span style={{color: 'red'}}>{todo.counter().get()}</span>
                </div>
              })}
            </div>
          })}
      </div>

    </div>
  )
}

export default Home;
