
<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/wvCsGXdM/ascey.png" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />


# Ascey - An MVC oriented state manager.

Ascey is a-based-MVC state manager for React {Native} apps.

It makes accessible the maintenance of an organized and scalable architecture on medium and large apps thanks to the centralization of data and their utilities (getter, setter, formatter) inside **Models** (objects) and **Collections** (array of Models).

<br />

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
#### Here are 3 step-by-step tutorials in order of difficulty, allowing you to understand the logic and the possibilities of Ascey.

### 1. [Counter App](https://medium.com/@siuoly/part-1-practice-with-react-ascey-a-counter-in-9-steps-55e34f3d46b9)
### 2. [User Management App](https://medium.com/@siuoly/part-2-practice-with-react-ascey-user-management-in-10-steps-6717fbbd8a2e)
### 3. [Todolist App](https://medium.com/@siuoly/part-3-practice-with-react-ascey-todolist-step-by-step-9ca5dd068328)

<br />

<br />

# Ascey - Core.

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/6phvTVrv/map.png" width="100%">
  </a>
</p>

### How works Ascey in 3 steps. 

1. Ascey **centralizes** your data inside **Models** (object) and **Collections** (array of Models), you are then free to create the **methods** you need to interact with these data (getters, setters, formatters). **One time**, **One place**.  🏴‍☠️

2. Then you need to link your Model/Collection with a dedicated **Controller**, that is the **link** between them and your **Components**. ⛓️

3. A **Controller** is a **mediator** between your storage of data (**Collection/Model**) and your **Components**. It dispatches the updates to the Store and gives access to the current state of your data. 🎛️

<br />

Ascey's MVC architecture makes your code **organized**, **scalable** and easy to **keep tidy up**.

<br />


## Documentation

### Table of contents
* [Model](#model)
* [Collection](#collection)
* [Controller](#controller)
* [Connect with component](#connect-with-component)
* [Store](#store)
* [Wrap with Ascey](#wrap-with-ascey)
* [Other](#other)


<br />

## Model

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/B6gLpLM4/model.png" width="100%">
  </a>
</p>


#### prototype: `class Model` 🌱

A Model is a class built with an **object of data**. 
It allows you to **create** all the **methods** you need related to a specific type of data like **util**, **getter** (selector), and **setter** functions

You build a Model from a data object.

#### Example of a Model:
`./src/ascey/models/todo.ts`
```
import { Model } from 'react-ascey'
import moment from 'moment'

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
    
    getCreatedAtLTS = () => moment(this.getCreatedAt()).format('LTS')
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
- `defaultState = (): any` : return the state of data of the instanciation.

<br />

## Collection

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/V6Z8RzQd/collection.png" width="100%">
  </a>
</p>

#### prototype: `class Collection extends Model` 🌿

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
- `defaultState = (): any` : return the state of data of the instanciation.


## Controller

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/ZKKfm6Nt/controller.png" width="100%">
  </a>
</p>

#### prototype: `class Controller` 🌎

#### A Controller is a grouping of Actions.
You build this class from:
1. a **Model or a Collection** bound with.
2. A unique key (that serves to identify the Controller in the Ascey Store).

A Controller is made to update your data in the Store through the Model/Collection it is bound with.

#### Exemple of a Controller:
`./src/ascey/controllers/todo.ts`

```
import { Controller } from 'react-ascey'
import TodoCollection from '../collections/todo'
import TodoModel from '../models/todo'

class TodoController extends Controller {

    constructor(todoCollection: any){
       /* 
         The Controller class requires 2 parameters:
         1. The Model/Collection class bound with the controller
         2. A unique key to identify the controller. 
       */ 
       super(todoCollection, 'todo')
    }

   /*
       Dispatching to store:
       
       1. The dispatch method takes a callback parameter
          sending the instanced Model/Collection bound with the 
          Controller
       2. Then you are free to execute the method you want 
          from the Model/Collection that is going to update the data.
       3. At the end of the callback execution, the change 
          is saved, transformed into a plain javascript 
          object, and sent to the Store.
   */
   
    createTodo = (content: string): TodoModel => {        
        const todo = new TodoModel({
            content,
            created_at: new Date()
        })
        
        this.dispatch((collection: TodoCollection) => {
            collection.push(todo)
        })
        return todo
    }

    deleteTodo = (todo: TodoModel): TodoModel => {
        let v: any;
        this.dispatch((collection: TodoCollection) => {
            v = collection.delete(todo)
        })
        return v
    }

}

/* We export the instanced Controller initialized with TodoCollection */
export default new TodoController(TodoCollection)
```

#### Methods: 
- `getIDKey = (): string` : return the controller's uniq key.
- `getStateClass = (): Type<Model>` : return the Model/Collection the controller is bound with.
- `getStore = (): Object` : return the Ascey Store into a plain object
- `getState = (): Model | Controller`: return the current instanced Model/Collection of the Controller.
- `dispatch = (action: (model: Model | Collection) => any)` : Execute the function passed in parameter, then dispatch the state from the action function parameter and update the Ascey Store.
<br />

## Connect with component

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/fT8049cP/connect.png" width="100%">
  </a>
</p>

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
          <span>{todo.getCreatedAtLTS()}</span>
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
      todolist: TodoController.getState()
   }
}

export default connect(mapStateToProps)(App)
```

<br />


## Store

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/02j7ynyv/store.png" width="100%">
  </a>
</p>

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

## Wrap with Ascey
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

## Other

- [applyMiddleware](https://redux.js.org/api/applymiddleware) - Same than redux
- [createStore](https://redux.js.org/api/createstore) - Same than redux
- bindControllers - `bindControllers(states: []Controller, extraReducer = {}) `
- [connect](https://react-redux.js.org/7.1/api/connect#connect) - Same than react-redux

<br />
<br />

# Questions / Answers

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/FsgFwdSL/band.png" width="100%">
  </a>
</p>

#### All the example are in Typescript, does the library works with Javascript?
Yes, it does! The library is written in Typescript, but you can use react-ascey if you are writing a react app in javascript.

<br />

#### I come from Redux, I'm interested in the lib but don't want to give up the Redux ecosystem, and Redux related libraries how I should do?
First of all, react-ascey uses the Redux API to work; that is to say that theoretically, you could use any Redux tool library on Ascey. 
You might need to adapt some parts; for example, a logger doesn't exist on Ascey, but you could create one inspired on redux-logger and release it on Github for the community. 
Another example, if you used redux-saga or redux-thunk until there, you can get rid of them. You can do everything you used to do without them on Ascey.

If you have any question or you would like to see a feature, feel free to create an issue or email me: siuol@gmx.com
