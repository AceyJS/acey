
<p align="center" font-style="italic" >
  <a href="https://rnds.netlify.com/">
    <img alt="react-ascey" src="https://i.postimg.cc/wvCsGXdM/ascey.png" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />

# A MVC oriented state manager. (Better than Redux)

Ascey is a-based-MVC state manager for your React apps.
It is built on top of Redux and makes easy the maintenance of an organized and scalable architecture on medium and large apps.


## Better than Redux, how ?

Redux is a great state manager and this is the reason why it got so much success and created a new whole ecosystem of open source libraries.
This is also why Ascey is build on top of it, using its API to work.

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
#### But one change require code update at many different place that makes editing awful when you either didn't write the code or your app is just big.
Still, more and more, you add actions and reducers (and so data to handle), more you find yourself feeling the architecture messy, hard to maintain, and a significant drop concerning your productivity working on the project.


### Why ?

Because your app has "100" different action types, "12" different reducers, "70" differents action functions, and I'm not talking about your selectors and utility functions distributed in dozen of files.
That means that iterating on this app is painful, and your ability to keep developing your app while maintaining a high standard in terms of organization decreases.

#### In other words, you lose productivity, and you don't like what you are doing anymore because your app.

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


<br />

## Documentation

### Table of contents
* [Model](#1-model)
* [State](#2-state)
* [Controller](#3-controller)
* [Connect with component](#4-connect-with-component)
* [Store](#5-store)
* [Wrap with Ascey](#6-wrap-with-ascey)


<br />

## 1. Model

#### prototype: `class Model`

#### A Model is a class built with an object of data. 

It allows you to create all the methods you need related to a specific type of data (utils, getters (selectors), setters) 

#### Example of a Model:
`./src/ascey/model/window.ts`
```
import { Model } from 'react-ascey'

const DEFAULT_DATA = {
   width: window.innerWidth, 
   height: window.innerHeight
}

class Window extends Model {
    
    constructor(dimensions = DEFAULT_DATA){
        super(dimensions)
    }
    
    /* getters */
    getWidth = () => this.get().width
    getHeight = () => this.get().height
    
    /* setters */
    setWidth = (width) => this.run((state) => state.width = width)
    setHeight = (height) => this.run((state) => state.height = height)
}

export default Window
```

#### Methods: 
- `get = (): Object` : return the state of the model.
- `set = (state: Object)` : set the new state of the model.
- `run = (action: (newState: any) => void): Object` : Execute the function passed in parameter and then set the new state  with the state from the action function parameter. 
- `toPlain = (): Object` : return the state of model as a plain javascript object
- `isArray = (): boolean` : return true if the state of the model is an array

<br />

## 2. State

#### prototype: `class State extends Model`

#### A State is comparable with a Reducer.
This class is a child of the Model class.
You build this class from a data object connected with the your Ascey Store and then your components (like Redux).

This class can contain methods interacting with State's data like getters or setters.
The Controller bound with its State will then be able to call the State's method to update the Store (see part. 3)

#### Exemple of a State:
`./src/ascey/states/ui.ts`
```
import { State } from 'react-ascey'
import Window from '../models/window'

/* A default object of data */
const DEFAULT_DATA = {
    window: {
        width: window.innerWidth, 
        height: window.innerHeight,
    }
}

class UIState extends State {

    /* This method returns a new State of the current one and must be in all State class. */
    public new = (initial = DEFAULT_DATA): UIState => new UIState(initial)

    constructor(initial = DEFAULT_DATA){
        /*
        You must instanciate the parent with 2 parameters:
          1. An object of data
          2. An uniq key identifying your State.
        */
        
        super(
           { window: new Window(initial.window) }, /* See part. 2 */ 
           'ui'
        )
    }

    /* Setter the Window Model in the State */
    public setWindow = (dimensions = DEFAULT_DATA.window) => {

      /* 
         "run" is a Model's method allowing you to update data in your state
         It takes a function with the state object in the parameter
      */
      this.run((state) => {
        state.window.setWidth(dimensions.width)
        state.window.setHeight(dimensions.height)
      })
      
    }
    
    /* Getter of our window model in the State */
    public getWindow(): Window => this.get().window
}

/* Initialization of the State with a default data. */
export default new UIState(DEFAULT_DATA)
```

#### Methods :
- `storeKey = (): string` : return the uniq id key of the State.
- `defaultState = (): any` : return the state the State class has been built with.

#### + the ones from Model :
- `get = (): Object` : return the state of the model.
- `set = (state: Object)` : set the new state of the model.
- `run = (action: (newState: any) => void): Object` : Execute the function passed in parameter and then set the new state  with the state from the action function parameter. 
- `toPlain = (): Object` : return the state of model as a plain javascript object
- `isArray = (): boolean` : return true if the state of the model is an array

<br />

## 3. Controller

#### prototype: `class Controller`

#### A Controller is comparable with a grouping of Actions.
You build this class from the instanced State you want to bind with.

A Controller is necessary to update your data in the Store, and to access your Store's data in real-time inside your components

#### Exemple of a Controller:
`./src/ascey/controllers/ui.ts`

```
import { Controller } from 'react-ascey'
import UIState from '../states/ui'

const DEFAULT_DATA = {
   width: window.innerWidth, 
   height: window.innerHeight
}

class UIController extends Controller {

    constructor(stateClass: any){
        super(stateClass)
    }

    /* {Method|Action} setting new window dimensions to the store */
    updateWindow = (window = DEFAULT_DATA) => {
      /* 
         dispatch is a Controller's method updating the Ascey Store when
         the function passed in parameter has been executed
         The function passed in parameter takes a parameter: the State Model
      */
      
       this.dispatch( (state: any) => state.setWindow(window) )
    }
}

/* 
Instantiation of your Controller with its State. */
export default new UIController(UIState)
```

#### Methods: 
- `getAttachedStateClass = (): State` : return the instanced State bound with it.
- `getStoreObject = (): Object` : return the state object from the Ascey Store
- `dispatch = (action: (state: State) => any)` : Execute the function passed in parameter, then dispatch the State from the action function parameter and update the Ascey Store.
- `extend = (store: any): State` : Take the whole Ascey Store object as parameter and return a fresh instanced of the State bound with the Controller.
- `extendLocal = (store: any): State` : return a fresh instanced of the State bound with the Controller.

<br />

## 4. Connect with component

#### Here is a simple React component : 
- displaying the width of the window.
- updating the dimensions of the window in your Ascey state through your controller when it changes. 

`./src/home.js`
```
import { connect } from 'react-ascey'
import { UIController } from '../ascey/controllers/ui'
import $ from 'jquery'

const Home = (props) => {

  /* on window size change */
  const onWindowUpdate = () => {
    $( window ).resize( function(){
      const width = $(window).width()
      const height = $(window).height()
      
      /* 
         Here is where call the update window dimensions method 
         
         i) Contrary to Redux, you don't need to bind it.
         You can call your method anywhere in your app.
      */
      UIController.updateWindow({width, height})
    });
  }

  /* componentDidMount */
  useEffect(() => onWindowUpdate(), [])

  return (
    <div>
      width: {this.props.window.getWidth()} {/* the getter method you defined in your Model class */}
    </div>
  );
}

const mapStateToProps = (storeObject) => {
    return {
        /*
           The extend methods are native from the Controller class.
           This methods pick up in the whole state object, the state object linked with the controller
           and then transform it into the instanced State class
        */
        window: UIController.extend(storeObject).getWindow() /* the getter method you defined in your State class */
    }
}

export default connect(mapStateToProps)(Home)
```

<br />


## 5. Store
`./src/ascey/store.ts`
```
import { createStore, bindStates } from 'react-ascey'
import UIState from '../states/ui'

/* 
   bindStates is bindinng the states with the store, 
   it takes two parameters: 
     - 1. An array of instanced States 
     - 2. Object of reducers. (if you still want to work with in a redux way on some parts. 
         E.g if you want to connect your router with the store)
*/
const store = bindStates([ UIState ] /*, { router: connectRouter(history) } */  ),

export default store
```

<br />

## 6. Wrap with Ascey
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

## Ascey functions

- [applyMiddleware](https://redux.js.org/api/applymiddleware) - Same than redux
- [createStore](https://redux.js.org/api/createstore) - Same than redux
- bindStates - `bindStates(states: []State, extraReducer = {}) `
- [connect](https://react-redux.js.org/7.1/api/connect#connect) - Same than react-redux

