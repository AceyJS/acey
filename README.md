
<p align="center" font-style="italic" >
  <a>
    <img alt="acey" src="https://siasky.net/BAA8tXYO7Ec4f7wEvKPYwM-L-paOU3ZZlcDnucQA2yh4Vg" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />


# Acey - A React State Manager.

#### Acey is an innovative Global State Manager for React Apps. 💡
 
It allows you to encapsulate your states inside Model class. Then you can gather the methods you need to treat, access, format, and organize their state. 🍱

You can :

- Update and access your Model’s state wherever you want in your App without any binding. 🔓
- Connect conveniently any Model with any component, so they re-render when the Model’s state changes. 🔄

<br />

It implements many useful built-in features to make your life easier, building, and maintaining your app architecture. 🛠️

Acey helps you to keep your code **organized**, **maintainable**, and easy to **scale**. 🌱


<br />

## Get started

### Installation

```
yarn add acey
```

<br />


To start the Acey engine **you need to declare the configuration as done** at the **root** of your application.
Here's how according to your environment: 

## On ReactJS
```js
import { config } from 'acey' //HERE
config.done() //HERE

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

<br />

## On React-Native

React-native is not using the same local store engine as web does, so you need to set it up manually at the root of your application:
```js
import AsyncStorage from '@react-native-community/async-storage'
import { config } from 'acey'

config.setStoreEngine(AsyncStorage)
config.done()
```
*make sure you already installed and linked async-storage.*
```
yarn add @react-native-community/async-storage
```

<br />

## On NextJS

Refer to the Wrapper doc ⬇️

🌯 [Next Acey wrapper documentation](https://github.com/Fantasim/next-acey-wrapper)

<br />

<br />

# Tutorials

## ReactJS

<details><summary>Counter App</summary>
  
### 📺&nbsp;[Youtube](https://www.youtube.com/watch?v=dFCCcDKUi80) &nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;🐱&nbsp;[Github project](https://github.com/Fantasim/acey/tree/master/example/reactjs/counter) &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;🌎&nbsp;[Live demo](https://codesandbox.io/s/github/Fantasim/acey/tree/master/example/reactjs/counter)

```ts
import React from 'react';
import { Model, config, useAcey } from 'acey'

/* Set the Acey configuration done, once, at the entry point of the project. */
config.done()

/* STEP 1: Let's create a model to handle the counter state */
class CounterModel extends Model {

  constructor(initialState: any, options: any){
    super(initialState, options)
  }

  /*  STEP 2: Add a getter for the counter number */
  get = () => this.state.counter
  
  /* 
      STEP 3: Add incrementer/decrementer actions to update the counter's state
      _________________________________________________________________________
      
        setState:     works like setState in React Class Components, 
                      it updates the current state of the Model
                
        save:         dispatch the new state to the store and re-render 
                      all the components bound with the Model
                
        localStore:   Store the Model's state in the localStore. (OPTION)
                      i) The default Model state at the next app load is going 
                         to be the last state stored.
  */
  increment = () => this.setState({counter: this.get() + 1}).save().localStore()
  decrement = () => this.setState({counter: this.get() - 1}).save().localStore()
}

/* 
   STEP 4: Instance the Counter Model, and define it as `connected Model 
           with the Acey Store` 
   
   i) connected Model have the ability to re-render the components they are bound with
      when their state change.
*/
const Counter = new CounterModel({counter: 0}, {connected: true, key: 'counter'})

const App = () => {

  /* STEP 5: Bind the Counter Model with the App components. */
  useAcey([ Counter ])

  return (
    <div>
      <button onClick={Counter.decrement}>decrement</button>
      {Counter.get()}
      <button onClick={Counter.increment}>increment</button>
    </div>
  );
}

export default App;
```
</details>
<details><summary>Todolist App</summary>
  
### 📺&nbsp;[Youtube](https://www.youtube.com/watch?v=qXR6bLp8iWE) &nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;🐱&nbsp;[Github project](https://github.com/Fantasim/acey/tree/master/example/reactjs/todolist) &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;🌎&nbsp;[Live demo](https://codesandbox.io/s/github/Fantasim/acey/tree/master/example/reactjs/todolist)
</details>

<br />

## NextJS 

<details><summary>Counter App</summary>

### 📺&nbsp;[Youtube](https://www.youtube.com/watch?v=AvVnU7Cr1hg) &nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;🐱&nbsp;[Github project](https://github.com/Fantasim/acey/tree/master/example/next/counter)

```js
import { Model, useAcey} from 'acey'

/* STEP 1: Let's create a model to handle the counter state */
class CounterModel extends Model {

  constructor(initialState: any, options: any){
    super(initialState, options)
  }

  /*  STEP 2: Add a getter for the counter number */
  get = () => this.state.counter
  
  /* 
      STEP 3: Add incrementer/decrementer actions to update the counter's state
      _________________________________________________________________________
      
        setState: works like setState in React Class Components, 
                  it updates the current state of the Model
                
        save:     dispatch the new state to the store and re-render 
                  all the components bound with the Model
                
        cookie:   Store the Model's state in the cookies. (OPTION)
  */
  increment = () => this.setState({counter: this.get() + 1}).save().cookie()
  decrement = () => this.setState({counter: this.get() - 1}).save().cookie()
}

/* 
   STEP 4: Instance the Counter Model, and define it as `connected Model 
           with the Acey Store` 
   
   i) connected Model have the ability to re-render the components they are bound with
      when their state change.
*/
const Counter = new CounterModel({counter: 0}, {connected: true, key: 'counter'})

export default function Home() {

  /* STEP 5: Bind the Counter Model with the App components. */
  useAcey([ Counter ])

  return (
    <div>
      <button onClick={Counter.decrement}>decrement</button>
      {Counter.get()}
      <button onClick={Counter.increment}>increment</button>
    </div>
  )
}

/* 
    STEP 6: We set the counter state at 10 before being executed on the client. 
    i) It's going to be displayed at 10 on the client.
*/
Home.getInitialProps = ({ query }) => {
  Counter.setState({counter: 10}).save()
}
```
</details>
<details><summary>Search tech job App</summary>
  
### 📺&nbsp;[Youtube](https://www.youtube.com/watch?v=tP0QZR-jUYQ) &nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;🐱&nbsp;[Github project](https://github.com/Fantasim/acey/tree/master/example/next/find-tech-job)

</details>

<br />

## React Native

<details><summary>Counter App</summary>
  
### 📺&nbsp;[Youtube](https://www.youtube.com/watch?v=1Zp8ol_xtI8) &nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;🐱&nbsp;[Github project](https://github.com/Fantasim/acey/tree/master/example/react-native/counter)
```js
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import { config, Model, useAcey } from 'acey'

/* 
    Step 1:
      - Define the store engine (for localStorage feature) as AsyncStore 
      - Set the Acey configuration done.
      i)  All of this once at the entry point of the project
 */
config.setStoreEngine(AsyncStorage) 
config.done()

/* STEP 2: Let's create a model to handle the counter state */
class CounterModel extends Model {

  constructor(initialState: any, options: any){
    super(initialState, options)
  }

  /*  STEP 3: Add a getter for the counter number */
  get = () => this.state.counter
  
  /* 
      STEP 4: Add incrementer/decrementer actions to update the counter's state
      _________________________________________________________________________
      
        setState: works like setState in React Class Components, 
                  it updates the current state of the Model
                
        save:     dispatch the new state to the store and re-render 
                  all the components bound with the Model
                
        cookie:   Store the Model's state in the cookies. (OPTION)
  */
  increment = () => this.setState({counter: this.get() + 1}).save().cookie()
  decrement = () => this.setState({counter: this.get() - 1}).save().cookie()
}

/* 
   STEP 5: Instance the Counter Model, and define it as `connected Model 
           with the Acey Store` 
   
   i) connected Model have the ability to re-render the components they are bound with
      when their state change.
*/
const Counter = new CounterModel({counter: 0}, {connected: true, key: 'counter'})

const App = () => {

  /* STEP 6: Bind the Counter Model with the App components. */
  useAcey([ Counter ])
 
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>     
          <TouchableOpacity onPress={Counter.decrement}>
             <Text>decrement</Text>
          </TouchableOpacity>    
          <Text>{Counter.get()}</Text>
          <TouchableOpacity onPress={Counter.increment}>
            <Text>increment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
```
</details>
<details><summary>Micro blogging app</summary>
  
### 🐱&nbsp;[Github project](https://github.com/Fantasim/acey/tree/master/example/react-native/microBlogging) &nbsp;&nbsp;&nbsp;
</details>

<br />
<br />

# Examples

<details><summary>Connect Model to Class Component</summary>
  
```js
import React from 'react'
import { connect } from 'acey'
import { Counter } from '../acey/models'

class CounterApp extends React.Component {
  
  render = () => {
    return (
      <>
        <button onClick={Counter.decrement}>decrement</button>
        <span>{Counter.get()}</span>
        <button onClick={Counter.increment}>increment</button>
      </>
    )
  }
}

export default connect([ Counter ])(CounterApp)
```
</details>

<details><summary>Nesting Models in Model</summary>
  
```js
import { Model } from 'acey'
import TweetCollection from '../collections/tweetlist'

const DEFAULT_STATE = {
  id: '',
  username: '',
  device: {
    brand: '',
    model: '',
    version: 0
  },
  tweet_list: []
}

class Device extends Model {

  constructor(initialState, options){
    super(initialState, options)
  }
  
  //getters
  brand = () => this.state.brand
  model = () => this.state.model
  version = () => this.state.version  
}

class User extends Model {

  constructor(initialState = DEFAULT_STATE, options){
    super(initialState, options)
    const { device, tweet_list } = initialState
    this.setState({
      device: new Device(device, this.__childOptions),
      tweet_list: new TweetCollection(tweet_list, this.__childOptions)    
    })
    /* 
      __childOptions allow you to in some way connect Device and TweetCollection to the store, 
      while binding them to User. 
    */
  }
  
  //getters
  device = () => this.state.device //return the instanced Device Model
  tweetList = () => this.state.tweet_list //return the instanced Tweet Collection
  ID = () => this.state.id
  username = () => this.state.username
  
  //actions
  updateUsername = (username) => this.setState({ username }).save()
}

export default User
```
</details>

<details><summary>Sort and Filter a TweetList</summary>
  
```js
import React from 'react'
import TweetCase from './components/tweet

import { Model, Collection, useAcey } from 'acey'

const Tweet extends Model {
  
  constructor(initialState = { content: '' , id: '' } , options){
    super(initialState, options)
  }
  
  //getters
  content = () => this.state.content
  ID = () => this.state.id
}

class TweetList extends Collection {
  
  constructor(initialState = [], options){
    super(initialState, Tweet, options)
  }
  
  filterByWorld = (word) => new TweetList(this.filter(o => o.content.indexOf(word) != -1), this.__childOptions)
  sortByContentLength = () => new TodoCollection(this.orderBy([(o) => o.content.length], ['asc']), this.__childOptions)
}

const DEFAULT_TWEET_LIST = [
  {
    content: 'this is a casual tweet',
    id: 'ID_1'
  },
  {
    content: 'This is a frequent tweet,
    id: 'ID_2'
  }
]

const TweetList = new TodoCollection(DEFAULT_TWEET_LIST, {connected: true, key: 'todolist'})

const Tweets = () => {

  useAcey([ TweetList ])
  
  return (
    <>
      {Tweetlist.filterByWorld('casual').sortByContentLength().map((tweet, index) => {
        return <TweetCase tweet={tweet} key={index} />
      })}
    </>
  )
}

export default Tweets
```
</details>

<br />
<br />



# Acey - Core.

## Documentation

### Table of contents
* [Model](#model)
* [Collection](#collection)

<br />

## Model

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/ZnmTKcNB/model.png" width="100%">
  </a>
</p>


#### prototype: `class Model` 🌿

A Model is a class built with an **object of data**. 
It allows you to create all the methods you need related to a specific type of data like **utils**, **getters**, and **setters**.

You build a Model from an Object and options.

`super(data: Object, options: IOptions)`

#### Example of a Model:
```js
import { Model } from 'acey'

// A Model must always have a default state.
const DEFAULT_STATE = {
    id: 0,
    content: ''
}

class Todo extends Model {

    constructor(initialState = DEFAULT_STATE, options){
        super(initialState, options)
    }
    
    content = () => this.state.content
    ID = () => this.state.id
}

export default Todo
```

<br />

- **Model's values**:

    | Name | Type | Description |
    | -- | -- | -- |
    | state |`Object` | return the current Model's data state |
    | options | `Object` | return the Model's options |
    | __childOptions | `Object` | return the connected methods of the current Model (as options). You can then pass this object as options for any instanced Model/Collection inside a connected Model, to make them connected as well without separating each other. |

<br />

- **Model's methods**: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | setState(array: Array) |`IAction` | update the state by assigning the current state with the array parameter. |
    | hydrate(state: Array) | `IAction` | fill the Model's state with the JS array `state` passed in parameter. |
    | toPlain() | `Object` | return the state to a plain javascript object. |
    | isCollection() | boolean | return true if the Model is a Collection. |
    | defaultState() | Object | return the state of data of the instanciation. |
    | fetchCookies() | Object |  **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)** return the cookies stored by the Model. |
    | clearCookies() | any |  **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)** remove the cookies stored by the Model. |
    
<br />

- **IOption (or Model's options)**: 

    | Name | Type | Default | Description |
    | -- | -- | -- | -- |
    | key | `string` | "" | Model's unique key, if `not set` Acey will set it automatically for you. |
    | connected | `bool` | false | If set to `true` the Model is connected to the Acey Store, it will also re-render your component connected with it on changes. |
    
<br />

- **IAction (or Model's actions)**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | save() |`IAction` | **(Only if `connected` option is set to `true`)**. Give the order to refresh the store with the new data when the function is called. It will then re-render all the components connected with the Model. |
    | cookie(expires = 365) | `IAction` | **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)**. Transform the current data of the model to JSON and store it in the cookies. |

<br />

<br />

## Collection

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/hvYp1C0h/collection.png" width="100%">
  </a>
</p>

#### prototype: `class Collection extends Model` 🌳

#### A Collection is a Model that has for state an array of Models. (Example: a Todolist is a Collection of Todo Models.)

You build a Collection with :
1. An array of Models or Objects.
2. A non-instanced Model class that represents the Model of the elements in the array.
3. Options

#### Example of a Collection:
```js
import { Collection } from 'acey'
import Todo from './todo'

class Todolist extends Collection {

    constructor(initialState = [], options){
        super(initialState, Todo, options)
    }
    
    //method example
    sortByID = () => {
        /*
            - orderBy sort the list by data and return an array
            of model.
            - We return a fresh instance of a collection with the array
            returned by orderBy
            - __childOptions passes the connected method of the current Collection to the
            the new instanced one. This way if any data is updated in the fresh instance,
            it will be in the state of the current Collection.
        */
        return new TodoCollection( this.orderBy(['id'], ['desc]), this.__childOptions)
    }
}

export default Todolist
```

<br />

- **Collection's values**:

    | Name | Type | Description |
    | -- | -- | -- |
    | state |`Object` | return the current Collection's data state |
    | options | `Object` | return the Collection's options |
    | __childOptions | `Object` | return the connected methods of the current Collection (as options). You can then pass this object as options for any instanced Model inside a connected Collection, to make them connected as well without separating each other. |

<br />

- **Collection's methods**: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | count() |`number` | Return the length of the Collection |
    | toListClass(elem: any[]) |`Model[]` | Transform an object array into an instanced Model array |
    | push(v: Object | Model) | `IAction` | Add an element in the array |
    | update(v: Object | Model, index: number) | `IAction` | Update the element at index with the Model passed in parameter |
    | pop() | `IAction` | Remove the last element |
    | shift() | `IAction` | Remove the first element |
    | map(callback: (v: Model, index: number) => any) | `any` | creates a new array with the results of calling a function for every array element (same than javascript map on arrays) |
    | reduce(callback: (accumulator: any, currentValue: any) => any, initialAccumulator: any) | `any` | Reduces Collection to a value which is the accumulated result of running each element in collection, where each successive invocation is supplied the return value of the previous. If initialAccumulator is not given, the first Model of Collection is used as the initial value. |
    | orderBy(iteratees: any[], orders: any[]) | `Model[]` | Return a sorted array of instanced Model upon the parameters passed |
    | filter(predicate: any) | `Model[]` | Pick up a list of node matching the predicate |
    | find(predicate: any) | `Model | undefined` | Find the first node matching the predicate |
    | findIndex(predicate: any) | `number` | Return the index of the first node matching the predicate |
    | deleteAll(predicate: any) | `IAction` | Delete all the nodes matching the predicate |
    | delete(v: Object | Model) | `IAction` | Delete the model passed in parameter if in the list. |
    | deleteIndex(index: number) | `IAction` | Remove an element at index.
    | indexOf(v: Object | Model) | `number` | Get the index of a node in the list.
    | nodeAt(index: number) | `Model` | Get the node at index in the list, undefined it not found. |
    | newNode(v: Object) | `Model` | Return fresh instanced Model with the value sent in parameter | 
    | hydrate(state: Object) | `IAction` | fill the Model's state with the JS object `state` passed in parameter. |
    | toPlain() | `Object` | return the state of model as a plain javascript array. |
    | isCollection() | boolean | return true if the Model is a Collection. |
    | defaultState() | Object | return the state of data of the instanciation. |
    | fetchCookies() | Object |  **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)** return the cookies stored by the Collection. |
    | clearCookies() | any |  **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)** remove the cookies stored by the Collection. |
    
<br />

- **IOption (or Collection's options)**: 

    | Name | Type | Default | Description |
    | -- | -- | -- | -- |
    | key | `string` | "" | Model's unique key, if `not set` Acey will set it automatically for you. |
    | connected | `bool` | false | If set to `true` the Collection is connected to the Acey Store, it will also re-render your component connected with it on changes. |
    
<br />

- **IAction (or Collection's actions)**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | save() |`IAction` | **(Only if `connected` option is set to `true`)**. Give the order to refresh the store with the new data when the function is called. It will then re-render all the components connected with the Collection. |
    | cookie(expires = 365) | `IAction` | **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)**. Transform the current data of the model to JSON and store it in the cookies. |


<br />

# Questions / Answers

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/FsgFwdSL/band.png" width="100%">
  </a>
</p>

Ask your questions in issue request...
