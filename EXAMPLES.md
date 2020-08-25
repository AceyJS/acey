# 🏗️ Use example with Acey's methods. [10% completed]🏗️

### Table of contents
* [Model](#model)

<br />


# Model.

Each following methods will be used from the following `Model`:

```ts
import { Model, IModelOptions } from 'acey' 

const DEFAULT_STATE = {
  id: '',
  username: '',
  created_at: new Date(),
  age: 0
}

class User extends Model {
   
   static create(username: string, age: number) => {
     return new User({ 
        id: randomUIID(), 
        username, 
        created_at: new Date(),
        age
     }, { connected: false })
   }
   
   constructor(initialState = DEFAULT_STATE, options: IModelOptions){
      super(initialState, options)
   }
   
   ID = () => this.state.id
   username = () => this.state.username
   createdAt = () => this.state.created_at
   age = () => this.state.age
}
```

<br />

## Model's values

### `state`

**state** is the current Model's state.

```ts
const user = User.create('steve', 28)
console.log(user.state) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}
```

<br />

## Model's methods

### `deleteKey`

**deleteKey** removes a key(s) in the `Model`'s state object

```ts
console.log(user.state) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}
user.deleteKeys('username', 'id')
console.log(user.state) // {created_at: '2020-08-21T02:17:05.000Z', age: 28}
```

<br />

### `hydrate`

**hydrate** fills the Model's state with the Object passed in parameter.

```ts
console.log(user.state) // {created_at: '2020-08-21T02:17:05.000Z', age: 28}
user.hydrate({id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28})
console.log(user.state) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}
```

ℹ️ *What's is the difference with* **`setState`** *?*

`hydrate` fills nested Models/Collections in your Model if there are, meanwhile `setState` just replace the old key-value with the new one in the parameter.

[There's a gist here](https://gist.github.com/Fantasim/7a5b02c3e3d381b4a8489d580b4d2642) to show you the difference between `hydrate` and `setState`

<br />

### `is`

**is** returns methods giving informations about the Model's composition.

```ts
//is
console.log(user.is()) // {connected: Function, equal: Function, localStorePulled: Function, empty: Function, localStorePulled: Function, keyGenerated: Function, localStoreEnabled: Function} 

//connected
console.log(user.is().connected()) // false

//equal
console.log(user.is().equal(user)) // true
console.log(user.is().equal( {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28} )) // true
console.log(user.is().equal( { username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28} )) // false
console.log(user.is().equal( null )) // false

//localStorePulled - Only usable when the Model is set has connected.
console.log(user.is().localStorePulled()) // false

//empty
console.log(user.is().empty()) // false
console.log(new User({}, {connected: false}).is().empty()) // true

//keyGenerated - Used in the acey system, developers shouldn't have to use this function.
console.log(user.is().keyGenerated()) // false

//localStoreEnabled - Only usable when the Model is set has connected.
console.log(user.is().localStoreEnabled()) // false
```

<br />

### `kids`

**kids** returns the Model's actions that interacts with the store (Acey store and local store). This method is used to be called as the options of a nested Model when instancing it.

```ts
console.log(user.kids()) // { save: Function, store: Function } 
```

[There's a gist here](https://gist.github.com/Fantasim/7a5b02c3e3d381b4a8489d580b4d2642) to show you when to use `kids` 

<br />

### `save`

**save** dispatches the Model's state to the Acey's store. (only accesible with a `connected` Model)

```ts
console.log(user.save()) // throw an Error because user is NOT connected
```

ℹ️ `save` is only used when working with React. (See an example with React [here](https://github.com/arysociety/acey#1-a-react-counter))

<br />


### `setState`

**setState** updates the state by merging it with the Object parameter.

```ts
console.log(user.state) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}
user.setState({ username: 'Paul', age: 21 })
console.log(user.state) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'paul', created_at: '2020-08-21T02:17:05.000Z', age: 21}
```

ℹ️ *What's is the difference with* **`hydrate`** *?*

`hydrate` fills nested Models/Collections in your Model if there are meanwhile `setState` just replace the old key-value with the new one in the parameter.

[There's a gist here](https://gist.github.com/Fantasim/7a5b02c3e3d381b4a8489d580b4d2642) to show you the difference between `setState` and `hydrate`

<br />

### `super`

**super** returns methods used by the Acey system.

```ts
console.log(user.super()) // {prevState: Object, prevStateStore: Object, defaultState: Object}
console.log(user.prevState) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}
console.log(user.prevStateStore) // null
console.log(user.defaultState) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}
```

<br />

### `localStore`

**localStore** returns the Model's LocalStoreManager to manage the Model state stored in the local store. (only accesible with a `connected` Model, in a React or Node env)

*For this example let's suppose `user` is **connected**.*

```ts
//set
user.localStore().set() //store the current Model's state to the store.
/* or user.setState({ some_change }).store() */
/* or user.action().store() */

//get
console.log(user.localStore().get()) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}

//isActive
console.log(user.localStore().isActive()) // true

//pull (pull is automatically called when the Model is just instanced.)
user.setState({ username: 'NO_USERNAME', id: 'NO_ID', age: -1 })
console.log(user.state) // {id: 'NO_ID', username: 'NO_USERNAME', created_at: '2020-08-21T02:17:05.000Z', age: -1}
user.localStore().pull()
console.log(user.state) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}

//remove
user.localStore().remove()
console.log(user.localStore().get()) // null
```

<br />

### `to`

**to** returns methods to convert your Model's state into different data types (like string, JSON..)

```ts
console.log(user.to()) // {string: Function, plain: Function} 
console.log(user.to().string()) // "{"id": "5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3", "username": "steve", "created_at": "2020-08-21T02:17:05.000Z", "age": "28"}"
console.log(user.to().plain()) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}
```

<br />

### `watch`

**watch** returns methods to watch changes on the Model's state, store and local store

```ts
console.log(user.watch()) // {state: Function, store: Function, localStoreFetch: Function} 

let i = 0;
user.watch().state((prevState, newState) => {
  i++;
})
user.setState({ id: 'NEW_ID_1' })
user.setState({ id: 'NEW_ID_2' })
console.log(i) // 2

user.watch().store((prevStore, newStore) => {
  /* 
    same than state method, but with each time the Model's Acey store is updated 
    when the Model is connected.
  */  
})

//
user.watch().localStoreFetch(() => {
  //When the local store has been pulled to the Model.
})
```







