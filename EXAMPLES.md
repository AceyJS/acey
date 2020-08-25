# 🏗️ Use example with Acey's methods. [10% completed]🏗️

### Table of contents
* [Model](#model)

<br />


# Model.

<p align="center">
  <a>
    <img src="https://siasky.net/EADADSyChLwhkcxglW4V9Kdce6xMBGNbEIixagA8iVHzMw" width="100%">
  </a>
</p>

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

`hydrate` fills nested Models in your Model if there are, meanwhile `setState` just replace the old key-value with the new one in the parameter.

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

ℹ️ `save` makes sense to be used only with React. (See an example with React [here](https://github.com/arysociety/acey#1-a-react-counter))

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

<br />
<br />

# Collection.

<p align="center" font-style="italic" >
  <a>
    <img src="https://siasky.net/GADqcD9yzvtu9lMGSVtKY5bXto96CJpFu7jTJyMy78iZrA" width="100%">
  </a>
</p>


Each following methods will be used from the following `Collection`:

```ts
import { Model, Collection, IModelOptions } from 'acey' 

const DEFAULT_STATE = {
  id: '',
  content: '',
  created_at: new Date(),
}

class Todo extends Model {
   
   constructor(initialState = DEFAULT_STATE, options: IModelOptions){
      super(initialState, options)
   }
   
   ID = () => this.state.id
   content = () => this.state.content
   createdAt = () => this.state.created_at
}

class Todolist extends Collection {

   constructor(initialState = [], options: IModelOptions){
      super(initialState, [Todo, Todolist], options)
   }
}
```


<br />

## Collection's values

### `state`

**state** is the current Collection's state.

```ts
const todolist = new Todolist([ {id: '1', content: 'Initial todo :)', created_at: '2020-08-21T02:17:05.000Z' } ], { connected: false }) 
console.log(todolist.state) // [ Todo ]
console.log(todolist.state[0].state) // { id: '1', content: 'Initial todo :)', created_at: '2020-08-21T02:17:05.000Z' }
```

<br />

### `save`

**save** dispatches the Collection's state to the Acey's store. (only accesible with a `connected` Collection)

```ts
console.log(todolist.save()) // throw an Error because todolist is NOT connected
```

ℹ️ `save` makes sense to be used only with React. (See an example with React [here](https://github.com/arysociety/acey#1-a-react-counter))

<br />

### `is`

Same feature than [Model one](https://github.com/arysociety/acey/blob/master/EXAMPLES.md#is).

<br />

### `setState`

**setState** replaces the Collection state with the one passed in parameters.

```ts
console.log(todolist.state[0].state) // { id: '1', content: 'Initial todo :)', created_at: '2020-08-21T02:17:05.000Z' }
user.setState([ { id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' }  ])
console.log(todolist.state[0].state) // { id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' } 
```

<br />

### `super`
Same feature than [Model one](https://github.com/arysociety/acey/blob/master/EXAMPLES.md#super).

<br />

### `localStore`
Same features than [Model one](https://github.com/arysociety/acey/blob/master/EXAMPLES.md#localstore).

<br />

### `to`

**to** returns methods to convert your Collection's state into different data types (like string, JSON..)

```ts
console.log(todolist.to()) // {string: Function, plain: Function} 
console.log(todolist.to().string()) // [{"id": "2", "content": "Second todo :)", "created_at": "2020-08-21T02:17:05.000Z" }]
console.log(todolist.to().plain()) // [{ id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' }]
console.log(todolist.to().listClass([{id: '1', content: 'Initial todo :)', created_at: '2020-08-21T02:17:05.000Z' }])) // [Todo]
```

<br />

### `watch`

Same features than [Model one](https://github.com/arysociety/acey/blob/master/EXAMPLES.md#watch).


<br />

### `append`

**append** returns a fresh Collection with the Array passed in parameter added at the end of the current Collection's state.

```ts
todolist.append([ {"id": "3", "content": "Third todo :)", "created_at": "2020-08-21T02:17:05.000Z" } ])
console.log(todolist.to().plain()) // [{ id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' }, {"id": "3", "content": "Third todo :)", "created_at": "2020-08-21T02:17:05.000Z" }]
```

<br />

### `arrayOf`

**arrayOf** returns an Array of value for the key in each element of the Collection.

```ts
console.log(todolist.arrayOf('id')) // ['2', '3']
```

<br />

### `chunk`

**chunk** returns an Array of collections splited into groups of the length of nChunk.

```ts
console.log(todolist.chunk(1)) // [ Todolist(1), Todolist(1) ] 
```

<br />

### `chunk`

**chunk** returns an Array of collections splited into groups of the length of nChunk.

```ts
console.log(todolist.chunk(1)) // [ Todolist(1), Todolist(1) ] 
```

<br />

### `concat`

Same use than [append](https://github.com/arysociety/acey/blob/master/EXAMPLES.md#append).

```ts
console.log(todolist.chunk(1)) // [ Todolist(1), Todolist(1) ] 
```

<br />

### `count`

**count** returns the length of the Collection's state

```ts
console.log(todolist.count()) // 2
```

<br />

### `copy`

**copy** returns a fresh instance of the current Collection.

```ts
const copy = todolist.copy()
console.log(todolist.is().equal(copy)) // true
```

<br />

### `delete`

**delete** deletes the Model passed in parameter if present in the list.

```ts
console.log(todolist.count()) // 2
todolist.delete(todolist.state[0])
console.log(todolist.count()) // 1
```

<br />

### `deleteBy`

**deleteBy** deletes all the nodes matching the predicate

```ts
todolist.append([ 
  {"id": "4", "content": "A new todo", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "5", "content": "A new todo", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
])

console.log(todolist.count()) // 4
todolist.deleteBy({ content: "A new todo" })
// or
// todolist.deleteBy((todo: Todo) => todo.content() === "A new todo" )
console.log(todolist.count()) // 2
```

<br />

### `deleteIndex`

**deleteIndex** removes an element at index.

```ts
console.log(todolist.count()) // 2
todolist.deleteIndex(0)
console.log(todolist.count()) // 1
```

<br />

### `find`

**find** finds the first node matching the predicate

```ts
console.log(todolist.find({id: 1})) // undefined
console.log(todolist.find({id: 6})) // Todo
// or
// todolist.deleteBy((todo: Todo) => todo.ID() === 6)
```

<br />

### `find`

**find** finds the first node matching the predicate

```ts
console.log(todolist.find({id: 1})) // undefined
console.log(todolist.find({id: 6})) // Todo
// or
// todolist.deleteBy((todo: Todo) => todo.ID() === 6)
```





