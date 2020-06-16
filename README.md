### 🌱 *Version 1.3 released on 06/15/2020. [Click here](https://github.com/Fantasim/acey/releases/tag/1.3.0) to check out the news.*

<p align="center" font-style="italic" >
  <a>
    <img alt="acey" src="https://siasky.net/BAA8tXYO7Ec4f7wEvKPYwM-L-paOU3ZZlcDnucQA2yh4Vg" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />

## Acey - Model oriented State Manager for React, Next and React-Native. 📱⚡

Encapsulate your states inside Model and Collection to treat, access, format and organize your data in the most efficient way. 

<br />

## Quick implementation

<img src="https://i.postimg.cc/13DD3SDM/tenor.gif" />

**1.** **`./counter-model.ts`** *(state)*
```ts
import { Model } from 'acey'

class CounterModel extends Model {

  constructor(initialState: any, options: any){
    super(initialState, options)
  }
  
  get = () => this.state.counter
  increment = () => this.setState({counter: this.get() + 1}).save().cookie()
  decrement = () => this.setState({counter: this.get() - 1}).save().cookie()
  
  /* 1) `save()` re-render the components bound with the Model (if a change occured) */
  /* 2) `cookie()` store the Model's state into the cookies and automatically hydrate the
  Model when the page is refreshed */
}

/* A `connected` Model enable the feature `save` that re-render the components they are bound with */
export default new CounterModel({counter: 0}, {connected: true, key: 'counter'})
```

<br />

**2.** **`./counter.ts`** *(component)* 
```js
import React from 'react'
import { useAcey } from 'acey'
import Counter from './counter-model'

const App = () => {

  /* Bind the Counter Model with component. */
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

<br />

## Usage

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
      device: new Device(device, this.option().kids() ),
      tweet_list: new TweetCollection(tweet_list, this.option().kids())    
    })
    /* 
      `kids()` allow you to connect Device and TweetCollection to the store, 
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
    super(initialState, [Tweet, TweetList], options)
  }
  
  filterByWorld = (word) => this.filter(o => o.content.indexOf(word) != -1)
  sortByContentLength = () => this.orderBy([(o) => o.content.length], ['asc'])
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

# Tutorials

## ReactJS

<details><summary>Counter App (Single file)</summary>
  
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

<details><summary>Counter App (Single file)</summary>

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

<details><summary>Counter App (Single file)</summary>
  
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
                
        cookie:   Store the Model's state in the store with AsyncStorage. (OPTION)
  */
  increment = () => this.setState({counter: this.get() + 1}).save().localStore()
  decrement = () => this.setState({counter: this.get() - 1}).save().localStore()
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
  
 
### 📺&nbsp;[Youtube](https://www.youtube.com/watch?v=sW14y3DGLwc) &nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;🐱&nbsp;[Github project](https://github.com/Fantasim/acey/tree/master/example/react-native/microBlogging) &nbsp;&nbsp;&nbsp;
</details>

<br />

<br />

# API

### Table of contents
* [Model](#model)
* [Collection](#collection)
* [General](#general)

<br />

## Model

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/ZnmTKcNB/model.png" width="100%">
  </a>
</p>


#### prototype: `class Model` 🌿

A Model is a class built with an **object**.

#### Todo Model:
```js
import { Model } from 'acey'

class Todo extends Model {

    /* A Model must always have a default state. */
    constructor(initialState = {id: 0, content: ''}, options){
        super(initialState, options)
    }
 
    content = () => this.state.content
    ID = () => this.state.id
}

export default Todo
```

<br />

### `super(initialState: Object, options: IOption)`

<br />

- **Model's values**:

    | Name | Type | Description |
    | -- | -- | -- |
    | state |`Object` | return the current Model's data state |
    | prevState |`Object` | return the prev Model's data state |

<br />

- **Model's methods**: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | cookie() |`CookieManager`| **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)** return the Model's CookieManager to deal with the cookies related with the Model |
    | is() |`IsManager` | return a class containing boolean functions concerning the Model |
    | localStore() |`LocalStoreManager`| **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)** return the Model's LocalStoreManager to deal with the local store related with the Model |
    | option() |`OptionManager` | return the Model's OptionManager to deal with the Model's options |
    | watch() |`IWatchAction` | return a class enabling you to watch changes on the Model's state and store |
    | deleteKey(key: string) | `IAction` | remove a key in the Model's state object |
    | deleteMultiKey(keys: string[]) | `IAction` | remove many keys in the Model's state object |
    | hydrate(state: Object) | `IAction` | fill the Model's state with the `Object` passed in parameter. |
    | setState(state: Object) |`IAction` | update the state by merging it with the `Object` parameteer. |
    | defaultState() | `Object` | return the Model's state when it instanced. |
    | toPlain() | `Object` | return the state to a plain javascript object. |
    | toString() | `string` | return state of your Model as a string |
    
<br />

<br />

## Collection

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/hvYp1C0h/collection.png" width="100%">
  </a>
</p>

#### prototype: `class Collection extends Model` 🌳

A Collection is a Model that has for state an array of Models. (Example: a Todolist is a Collection of Todo Models.)

#### Example of a Collection:
```ts
import { Collection } from 'acey'
import Todo from './todo'

class Todolist extends Collection {

    constructor(initialState = [], options){
        super(initialState, [Todo, Todolist], options)
    }
    
    sortByContent = (): Todolist => this.orderBy(['content'], ['desc]) as Todolist
}

export default Todolist
```

<br />

### `super(initialState: Array, nodeAndCo: [Model, Collection], options: IOption)`

<br />

- **Collection's values**:

    | Name | Type | Description |
    | -- | -- | -- |
    | prevState |`Array` | return the previous Collection's data state |
    | state |`Array` | return the current Collection's data state |

<br />

- **Collection's methods**: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | cookie() |`CookieManager`| **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)** return the Collection's CookieManager to deal with the cookies related with the Collection |
    | is() |`IsManager` | return a class containing boolean functions concerning the Collection |
    | localStore() |`LocalStoreManager`| **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)** return the Collection's LocalStoreManager to deal with the local store related with the Collection |
    | option() |`OptionManager` | return the Model's OptionManager to deal with the Collection's options |
    | watch() |`IWatchAction` | return a class enabling you to watch changes on the Collection's state and store |
    | count() |`number` | Return the length of the Collection |
    | findIndex(predicate: any) | `number` | Return the index of the first node matching the predicate |
    | indexOf(v: Object or Model) | `number` | Get the index of a node in the list.
    | map(callback: (v: Model, index: number) => any) | `any` | creates a new array with the results of calling a function for every array element (same than javascript map on arrays) |
    | reduce(callback: (accumulator: any, currentValue: any) => any, initialAccumulator: any) | `any` | Reduces Collection to a value which is the accumulated result of running each element in collection, where each successive invocation is supplied the return value of the previous. If initialAccumulator is not given, the first Model of Collection is used as the initial value. |
    | filter(predicate: any) | `Collection` | Pick up a list of node matching the predicate |
    | limit(n: number) | `Collection` | Pick up the `n` first element of the list  |
    | newCollection(v: Array) | `Collection` | Return fresh instanced Collection with the value sent in parameter | 
    | offset(n: number) | `Collection` | Remove the `n` first element of the list  |
    | orderBy(iteratees: any[], orders: any[]) | `Collection` | Return a sorted array of instanced Model upon the parameters passed |
    | slice(begin: number (optional), end: number (optional)) | `Collection` | Same than the slice method for arrays  |
    | splice(begin: number, nbToDelete[, elem1[, elem2[, ...]]]) | `Collection` | Same than the splice method for arrays  |
    | toListClass(elem: any[]) |`Collection` | Transform an object array into an instanced Model array |
    | delete(v: Object or Model) | `IAction` | Delete the model passed in parameter if in the list. |
    | deleteBy(predicate: any) | `IAction` | Delete all the nodes matching the predicate |
    | deleteIndex(index: number) | `IAction` | Remove an element at index.
    | find(predicate: any) | `Model or undefined` | Find the first node matching the predicate |
    | hydrate(state: Array) | `IAction` | fill the Model's state with the JS `array` passed in parameter. |
    | newNode(v: Object) | `Model` | Return fresh instanced Model with the value sent in parameter | 
    | nodeAt(index: number) | `Model` | Get the node at index in the list, undefined it not found. |
    | pop() | `IAction` | Remove the last state element |
    | push(v: Object or Model) | `IAction` | Add an element in the state |
    | shift() | `IAction` | Remove the first state element |
    | update(v: Object or Model, index: number) | `IAction` | Update the element at index with the Model passed in parameter |
    | defaultState() | `Object` | return the state of data of the instanciation. |
    | toPlain() | `Object` | return the state of model as a plain javascript array. |
    
<br />

<br />

## General

<br />

- **IOption (or Model's options)**: 

    | Name | Type | Default | Description |
    | -- | -- | -- | -- |
    | connected | `bool` | false | If set to `true` the Model is connected to the Acey Store, it will also re-render your component connected with it on changes. |
    | key | `string` | "" | Model's unique key, if `not set` Acey will set it automatically for you. |
    
<br />

- **IAction (or Model's actions)**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | cookie(expires = 365) | `IAction` | **(Only on ReactJS and NextJS if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)**. Transform the current data of the model to a string and store it in the cookies. |
    | localStore(expires = 365) | `IAction` | **(Only on React-Native and ReactJS if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)**. Transform the current data of the model to a string and store it in the localStore. |
    | save() |`IAction` | **(Only if `connected` option is set to `true`)**. Dispatch the Model's state to the store and re-render all the components connected with the Model. |
    
<br />

- **IWatchAction**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | all(callback: Function) | `SubscribeAction` | Execute the callback function passed in parameter every time the Model's state or store changes. Return a `SubscriberAction` class with a `stop` method. |
    | state(callback: Function) | `SubscribeAction` | Execute the callback function passed in parameter every time the Model's state changes. Return a `SubscriberAction` class with a `stop` method. |
    | store(callback: Function) | `SubscribeAction` | Execute the callback function passed in parameter every time the Model's store changes. Return a `SubscriberAction` class with a `stop` method. |
    
 <br />
    
- **IsManager**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | collection() |`boolean` | return `true` if the Model is a collection |
    | connected() |`boolean` | return `true` if the Model is connected to the store. |
    | cookiesEnabled() |`boolean` | return `true` if the cookies are enabled with the Model |
    | empty() |`boolean` | return `true` if the Model's state is empty |
    | equal(m: Model) |`boolean` | return `true` if the Model's state is equal to the one passed in parameter. |
    | keyGenerated() |`boolean` | return `true` if the Model's key has been automatically generated (if no key set when the model is connected (only on ReactJS) |
    | localStoreEnabled() |`boolean` | return `true` if the localStore is enabled with the Model |

<br />

- **OptionManager**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | get() | `IOptions` | return the Model's option Object |
    | key() | `string` | return the Model's key |
    | kids() | `Object` |  return the connected methods of the current Model (as options). You can then pass this object as options for any instanced Model/Collection inside a connected Model, to make them connected without separating them from each other. |
    
    
<br />
    
- **CookieManager** *(only ReactJS and NextJS)*:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | get() | `Object` | return the Model's plain state stored in the cookies |
    | isActive() | `boolean` | return `true` if the cookies are enabled on the Model |
    | pull() | `undefined` | get the Model's state stored in the cookies and set it has the current state of the Model |
    | remove() | `undefined` | remove the Model's state stored in the cookies |
    | set() | `IAction` | set the Model's current state to the cookies |
    
<br />

- **LocalStoreManager** *(only ReactJS and React Native)*: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | get() | `Object` | return the Model's plain state stored in the local store |
    | isActive() | `boolean` | return `true` if the local store are enabled on the Model |
    | pull() | `undefined` | get the Model's state stored in the local store and set it has the current state of the Model |
    | remove() | `undefined` | remove the Model's state stored in the local store |
    | set() | `IAction` | set the Model's current state to the local store |

<br />

<br />

# Questions / Answers

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/FsgFwdSL/band.png" width="100%">
  </a>
</p>

Ask your questions in issue request...
