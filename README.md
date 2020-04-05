
<p align="center" font-style="italic" >
  <a href="https://rnds.netlify.com/">
    <img alt="react-ascey" src="https://i.postimg.cc/wvCsGXdM/ascey.png" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />

# A MVC oriented state manager. (Better than Redux)

Ascey is a-based-MVC state manager for your React apps.
It is built on top of Redux and makes accessible the maintenance of an organized and scalable architecture on medium and large apps.


## Better than Redux, how?

Redux is a great state manager, and this is the reason why it got so much success and created a new whole ecosystem of open source libraries.
It is also why Ascey is built on top of it, using its API to work.

#### But Redux has for weekness, its strength : The boilerplate 
- Actions function / type
- Reducers
- Connect
- Selectors ([reselect](https://github.com/reduxjs/reselect)), 
- Middlewares ([saga](https://github.com/redux-saga/redux-saga), [thunk](https://github.com/reduxjs/redux-thunk), [logger](https://github.com/LogRocket/redux-logger))
- Util formatting functions
- Redundant imports in your components (actions, selectors, utils formatting)


### This is too much.
The redux boilerplate is clean and enable you to make a good organization on small apps.
#### But one change require code update at many different places that makes editing awful when you didn't write the code or your app is just big.
Still, more and more, you add actions and reducers (and so data to handle), more you find yourself feeling the architecture messy, hard to maintain, and a significant drop concerning your productivity working on the project.


### Why?

Because your app has "100" different action types, "12" different reducers, "70" differents action functions, and I'm not talking about your selectors and utility functions distributed in dozen of files.
That means that iterating on this app is painful, and your ability to keep developing your app while maintaining a high standard in terms of organization decreases.

#### In other words, you lose productivity, and you don't like what you are doing anymore.

<br />

<br />

# Ascey

## Get started

### Installation

```
npm i react-ascey
```
or
```
yarn add react-ascey
```
<br />

___
Here are 3 step-by-step tutorials in order of difficulty, allowing you to understand the logic and the possibilities of Ascey.

1. [Counter App](https://medium.com/@siuoly/part-1-practice-with-react-ascey-a-counter-in-9-steps-55e34f3d46b9)
2. [User Management App](https://medium.com/@siuoly/part-2-practice-with-react-ascey-user-management-in-10-steps-6717fbbd8a2e)
3. [Todolist App](https://medium.com/@siuoly/part-3-practice-with-react-ascey-todolist-step-by-step-9ca5dd068328)

<br />

## Documentation

### Table of contents
* [Model](#1-model)
* [Collection](#2-collection)
* [State](#3-state)
* [Controller](#4-controller)
* [Connect with component](#5-connect-with-component)
* [Store](#6-store)
* [Wrap with Ascey](#7-wrap-with-ascey)
* [Other](#8-other)


<br />

## 1. Model

#### prototype: `class Model`

#### A Model is a class built with an object of data. 

It allows you to create all the methods you need related to a specific type of data (utils, getters (selectors), setters) 

You build a Model from a data object.

#### Example of a Model:
`./src/ascey/models/todo.ts`
```
import { Model } from 'react-ascey'

/*
    1. Create a default data object for our Model
   /!\ Must always be an object. /!\
*/
const DEFAULT_DATA = {
    content: '',
    created_at: new Date()
}

class TodoModel extends Model {

    constructor(todo = DEFAULT_DATA){
        super(todo)
    }

    getContent = () => this.get().content
    getCreatedAt = () => this.get().created_at
}

export default TodoModel
```

#### Methods: 
- `get = (): Object` : return the state of the model.
- `set = (state: Object)` : set the new state of the model.
- `setState = (obj: Object)` : update the state by assigning the current state with the obj parameter. (like React)
- `run = (action: (newState: any) => void): Object` : Execute the function passed in parameter and then set the new state  with the state from the action function parameter. 
- `deleteKey = (key: string)` : delete the value linked with a key in your state object.
- `copyDeep = (src: Model)` : copy the src into the current state without changing the references of the values nested inside the current model.
- `toPlain = (): Object` : return the state of model as a plain javascript object
- `isCollection = (): boolean` : return true if the Model is a Collection.

<br />

## 2. Collection

#### prototype: `class Collection extends Model`

#### A Collection is a Model that has for state an array of Models. (Example: a Todolist is a Collection of Todo Models.)

You build a collection with :
1. An array of Models or Objects.
2. A non-instanced Model class that represents the Model of the elements in the array.

#### Example of a Collection:
`./src/ascey/collections/todo.ts`
```
import { Collection } from 'react-ascey'
import TodoModel from '../models/todo'

/*
    1. Create a default data object for our Collectiono
   /!\ Must always be an array. /!\
*/
const DEFAULT_DATA = []

class TodoCollection extends Collection {

    constructor(list: any = DEFAULT_DATA){
        super(list, TodoModel)
    }

    sortByCreateDate = (sortType: any = 'asc' || 'desc') => {
        /*
            - orderBy sort the list by data and return an array
            of model.
            - We return a fresh instance of a collection with the array
            returned by orderBy
        */
        return new TodoCollection(
            this.orderBy(['created_at'], [sortType])
        )
    }
}

export default TodoCollection
```

There is room for other methods; please feel free to open a pull request if you want to add other useful methods.

#### Methods :
- `count = (): number` - Return the length of the array
- `toListClass = (elem: any[]): Model[]` - Transform an object array into an instanced Model array.
- `push = (v: Model)` - Add an element in the array
- `update = (v: Model, index: number)` - Update the model at index with the one passed in parameter
- `pop = ()` - Remove the last element
- `shif = ()` - Remove the first item
- `map = (callback: (v: Model, index: number) => any)` - creates a new array with the results of calling a function for every array element (same than javascript map on arrays)
- `orderBy = (iteratees: any[], orders: any[]): Model[]` - Return a sorted array of instanced Model upon the parameters passed
- `filter = (predicate: any): Model[]` - Pick up a list of node matching the predicate
- `find = (predicate: any): Model | undefined` - Find the first node matching the predicate
- `findIndex = (predicate: any): number` - Return the index of the first node matching the predicate
- `deleteAll = (predicate: any)` - Delete all the nodes matching the predicate
- `delete = (v: Model)` - Delete the model passed in parameter in the list.
- `deleteIndex = (index: number)` - Remove an element at index.
- `getIndex = (v: Model): number` - Get the index of a node in the list.

#### + the ones from Model :
- `get = (): Object` : return the state of the model.
- `set = (state: Object)` : set the new state of the model.
- `run = (action: (newState: any) => void): Object` : Execute the function passed in parameter and then set the new state  with the state from the action function parameter. 
- `copyDeep = (src: Model)` : copy the src into the current state without changing the references of the values nested inside the current model.
- `toPlain = (): Object` : return the state of model as a plain javascript object


## 3. State

#### prototype: `class State extends Model`

#### A State is comparable with a Reducer.
This class is a child of the Model class, and is 98% similar.
The difference with a Model is that a State is going to bound with a Controller that will connect the State's data with the Ascey Store.

As its parent, you build this class with a data object.

This class can contain methods interacting with State's data like utils, getters and, setters.


#### Exemple of a State:
`./src/ascey/states/todo.ts`
```
import { State } from 'react-ascey'
import TodoCollection from '../collections/todo'

/*
    1. Create a default data object for our State
   /!\ Must always be an object. /!\
*/
const DEFAULT_DATA = {
    todolist: []
}

class TodoState extends State {

    constructor(data = DEFAULT_DATA){
        super({
          /* transform data into Models/Collections */
          todolist: new TodoCollection(data.todolist)
        })
    }

    getTodolist = (): TodoCollection => this.get().todolist
}

export default TodoState
```

#### Methods :
- `defaultState = (): any` : return the default state

#### + the ones from Model :
- `get = (): Object` : return the state of the model.
- `set = (state: Object)` : set the new state of the model.
- `setState = (obj: Object)` : update the state by assigning the current state with the obj parameter. (like React)
- `run = (action: (newState: any) => void): Object` : Execute the function passed in parameter and then set the new state  with the state from the action function parameter. 
- `deleteKey = (key: string)` : delete the value linked with a key in your state object.
- `copyDeep = (src: Model)` : copy the src into the current state without changing the references of the values nested inside the current model.
- `toPlain = (): Object` : return the state of model as a plain javascript object


<br />

## 4. Controller

#### prototype: `class Controller`

#### A Controller is comparable with a grouping of Actions.
You build this class from:
1. the State class you want to bind it with
2. A unique key (that serves to identify the controller in the Ascey Store.)

A Controller is made to update your data in the Store through the State it is bound with.

#### Exemple of a Controller:
`./src/ascey/controllers/todo.ts`

```
import { Controller } from 'react-ascey'
import TodoState from '../states/todo'
import TodoModel from '../models/todo'

class TodoController extends Controller {

    constructor(todoState: any){
       /* 
         The Controller class requires 2 parameters:
         1. The state class bound with the controller
         2. A unique key to identify the controller. 
       */ 
       super(todoState, 'todo')
    }

   /*
       Dispatching to store:
       
       1. The dispatch method takes a callback parameter
          sending the instanced State bound with the 
          Controller
       2. Then you are free to execute the method you want 
          from the State that is going to update the data.
       3. At the end of the callback execution, the change 
          is saved, transformed into a plain javascript 
          object, and sent to the Store.
   */
   
    createTodo = (content: string): TodoModel => {        
        const todo = new TodoModel({
            content,
            created_at: new Date()
        })
        
        this.dispatch((state: TodoState) => {
            state.getTodolist().push(todo)
        })
        return todo
    }

    deleteTodo = (todo: TodoModel): TodoModel => {
        let v: any;
        this.dispatch((state: TodoState) => {
            v = state.getTodolist().delete(todo)
        })
        return v
    }

}

/* We export the instanced Controller initialized with TodoState */
export default new TodoController(TodoState)
```

#### Methods: 
- `getIDKey = (): string` : return the controller's uniq key.
- `getStateClass = (): Type<State>` : return the State class the controller is bound with.
- `getStore = (): Object` : return the Ascey Store into a plain object
- `getState = (): State`: return the current instanced State of the Controller.
- `dispatch = (action: (state: State) => any)` : Execute the function passed in parameter, then dispatch the State from the action function parameter and update the Ascey Store.
<br />

## 5. Connect with component

#### Here is a simple React component (todolist) : 
`./src/home.js`
```
import React, { useState } from 'react';
import TodoModel from './ascey/models/todo
import TodoController from './ascey/controllers/todo'
import { connect } from 'react-ascey'


function App(props: any) {
   const { todolist } = props
   const [text, setText] = useState('')
   
   const onChangeInput = (e: any) => setText(e.target.value)
   const addTodo = () => TodoController.createTodo(text) && setText('')
   
   const renderInput = () => (
      <div style={{margin: 20}}>
          <input 
             onChange={onChangeInput} 
             style={{width: 300, height: 20}} 
             value={text}
          />
          <button onClick={addTodo}>Add</button>
      </div>
   )
   
   const renderTodo = (todo: TodoModel, idx: number) => (
       <div key={idx} style={{margin: 10}}>
          <span>{todo.getContent()}</span>
          <span> - </span>
          <span>{todo.getCreatedAt().getMinutes() + ':' + todo.getCreatedAt().getSeconds() }</span>
       </div>
    )
   
   return (
      <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center'}}>
         {renderInput()}
         {todolist.map(renderTodo)}
      </div>
   )
}

const mapStateToProps = () => {
   return {
      todolist: TodoController.getState().getTodolist()
   }
}

export default connect(mapStateToProps)(App)
```

<br />


## 6. Store
`./src/ascey/store.ts`
```
import { createStore, bindControllers } from 'react-ascey'
import TodoController from '../controllers/todo'

/* 
   bindControllers is binding the controllers with the store, 
   it takes two parameters: 
     - 1. An array of instanced Controllers 
     - 2. Object of reducers. (if you still want to work in a redux way on some parts. 
         E.g if you want to connect your router with the store)
*/
const store = bindControllers([ TodoController ] /*, { router: connectRouter(history) } */  ),

export default store
```

<br />

## 7. Wrap with Ascey
`./src/index.js`
```
import store from './ascey/store';
import { Provider } from 'react-ascey';
import Home from './home.js'

const App = () => {
    return (
        <Provider store={store}>
          <Home />
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<br />

## 8. Other

- [applyMiddleware](https://redux.js.org/api/applymiddleware) - Same than redux
- [createStore](https://redux.js.org/api/createstore) - Same than redux
- bindControllers - `bindControllers(states: []Controller, extraReducer = {}) `
- [connect](https://react-redux.js.org/7.1/api/connect#connect) - Same than react-redux

