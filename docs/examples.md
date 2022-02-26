# [API](https://github.com/arysociety/acey/blob/master/docs/api.md) Examples ✏️ 

<br />

<br />


<p align="center">
  <a href="#model">
    <img width="20%" src="https://siasky.net/EAAzsnQ4WJc4Yg5pbj-Z-Dp7c7av6NV_jqakGpXoQrDh2A"/>
  </a>

  <img width="5%" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
  
  <a href="#collection">
    <img width="20%" src="https://siasky.net/EABCA6-YMiNNSgZQr-SGFw8PTlRcRUy1umxSlx5l1NJBxw"/>
  </a>

</p>

<br />

<br />

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

**deleteKey** removes key(s) in the `Model`'s state object

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
user.is() // {connected: Function, equal: Function, localStorePulled: Function, empty: Function, localStorePulled: Function, keyGenerated: Function, localStoreEnabled: Function} 

//connected
user.is().connected() // false

//equal
user.is().equal(user) // true
user.is().equal( {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28} ) // true
user.is().equal( { username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28} ) // false
user.is().equal( null ) // false

//localStorePulled - Only usable when the Model is set has connected.
user.is().localStorePulled() // false

//empty
user.is().empty() // false
new User({}, {connected: false}).is().empty()) // true

//keyGenerated - Used in the acey system, developers shouldn't have to use this function.
user.is().keyGenerated() // false

//localStoreEnabled - Only usable when the Model is set has connected.
user.is().localStoreEnabled() // false
```

<br />

### `kids`

**kids** returns the Model's actions that interacts with the store (Acey store and local store). This method is used to be called as the options of a nested Model when instancing it.

```ts
user.kids() // { save: Function, store: Function } 
```

[There's a gist here](https://gist.github.com/Fantasim/7a5b02c3e3d381b4a8489d580b4d2642) to show you when to use `kids` 

<br />

### `save`

**save** dispatches the Model's state to the Acey's store. (only accesible with a `connected` Model)

```ts
user.save() // throw an Error because user is NOT connected
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
user.super() // {prevState: Object, prevStateStore: Object, defaultState: Object}
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
//or
user.setState({ some_change }).store()
//or
user.action().store()

//get
user.localStore().get() // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}

//isActive
user.localStore().isActive() // true

//pull (pull is automatically called when the Model is just instanced.)
user.setState({ username: 'NO_USERNAME', id: 'NO_ID', age: -1 })
console.log(user.state) // {id: 'NO_ID', username: 'NO_USERNAME', created_at: '2020-08-21T02:17:05.000Z', age: -1}
user.localStore().pull()
console.log(user.state) // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}

//remove
user.localStore().remove()
user.localStore().get() // null
```

<br />

### `to`

**to** returns methods to convert your Model's state into different data types (like string, JSON..)

```ts
user.to() // {string: Function, plain: Function} 
user.to().string() // "{"id": "5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3", "username": "steve", "created_at": "2020-08-21T02:17:05.000Z", "age": "28"}"
user.to().plain() // {id: '5cd50f02-3c4d-4f09-a16f-0ab6ba2981e3', username: 'steve', created_at: '2020-08-21T02:17:05.000Z', age: 28}
```

<br />

### `watch`

**watch** returns methods to watch changes on the Model's state, store and local store

```ts
user.watch() // {state: Function, store: Function, localStoreFetch: Function} 

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

## Collection's methods

### `save`

**save** dispatches the Collection's state to the Acey's store. (only accesible with a `connected` Collection)

```ts
todolist.save() // throw an Error because todolist is NOT connected
```

ℹ️ `save` makes sense to be used only with React. (See an example with React [here](https://github.com/arysociety/acey#1-a-react-counter))

<br />

### `hydrate`

Same feature than [Model one](https://github.com/arysociety/acey/blob/master/docs/examples.md#hydrate).

<br />

### `is`

Same feature than [Model one](https://github.com/arysociety/acey/blob/master/docs/examples.md#is).

<br />

### `setState`

**setState** replaces the Collection state with the one passed in parameters.

```ts
console.log(todolist.state[0].state) // { id: '1', content: 'Initial todo :)', created_at: '2020-08-21T02:17:05.000Z' }

todolist.setState([ { id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' }  ])

console.log(todolist.state) // [ Todo ]
console.log(todolist.state[0].state) // { id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' } 
```

<br />

### `super`
Same feature than [Model one](https://github.com/arysociety/acey/blob/master/docs/examples.md#super).

<br />

### `localStore`
Same features than [Model one](https://github.com/arysociety/acey/blob/master/docs/examples.md#localstore).

<br />

### `to`

**to** returns methods to convert your Collection's state into different data types (like string, JSON..)

```ts
todolist.to() // {string: Function, plain: Function} 
todolist.to().string() // [{"id": "2", "content": "Second todo :)", "created_at": "2020-08-21T02:17:05.000Z" }]
todolist.to().plain() // [{ id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' }]
todolist.to().listClass([{id: '1', content: 'Initial todo :)', created_at: '2020-08-21T02:17:05.000Z' }]) // [Todo]
```

<br />

### `watch`

Same features than [Model one](https://github.com/arysociety/acey/blob/master/docs/examples.md#watch).


<br />

### `append`

**append** returns a fresh Collection with the Array passed in parameter added at the end of the current Collection's state.

```ts
todolist.to().plain() // [{ id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' }]

todolist.append([ {"id": "3", "content": "Third todo :)", "created_at": "2020-08-21T02:17:05.000Z" } ])

todolist.to().plain() /* [
  { id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' }, 
  { id: '3', content: 'Third todo :)', created_at: '2020-08-21T02:17:05.000Z' }
]
*/
```

<br />

### `arrayOf`

**arrayOf** returns an `Array of value` for the `key` in each element of the Collection.

```ts
todolist.arrayOf('id') // ['2', '3']
```

<br />

### `chunk`

**chunk** returns an `Array of collections` splited into groups of the `length` of nChunk.

```ts
todolist.chunk(1) // [ Todolist(1), Todolist(1) ] 
```

<br />

### `concat`

Same use than [append](https://github.com/arysociety/acey/blob/master/EXAMPLES.md#append).

```ts
todolist.chunk(1) // [ Todolist(1), Todolist(1) ] 
```

<br />

### `count`

**count** returns the `length` of the **Collection's state** list.

```ts
todolist.count() // 2
```

<br />

### `copy`

**copy** returns a **fresh instance** of the current `Collection`.

```ts
const copy = todolist.copy()
todolist.is().equal(copy) // true
```

<br />

### `delete`

**delete** deletes the `node` passed in parameter if present in the list.

```ts
todolist.to().plain() /* [
  { id: '2', content: 'Second todo :)', created_at: '2020-08-21T02:17:05.000Z' }, 
  { id: '3', content: 'Third todo :)', created_at: '2020-08-21T02:17:05.000Z' }
]
*/

todolist.delete(todolist.state[0])
//or
todolist.delete(todolist.to().plain()[0])
//or 
todolist.delete(todolist.state[0].to().plain())

todolist.to().plain() // [{ id: '3', content: 'Third todo :)', created_at: '2020-08-21T02:17:05.000Z' }]
```

<br />

### `deleteBy`

**deleteBy** deletes `the nodes` matching the `predicate`

```ts
todolist.append([ 
  {"id": "4", "content": "A new todo", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "5", "content": "A new todo", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
])

todolist.to().plain() /* [
  { id: '3', content: 'Third todo :)', created_at: '2020-08-21T02:17:05.000Z' }
  { "id": "4", "content": "A new todo", "created_at": "2020-08-21T02:17:05.000Z" } 
  { "id": "5", "content": "A new todo", "created_at": "2020-08-21T02:17:05.000Z" } 
  { "id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
]

todolist.deleteBy({ content: "A new todo" })
//or
todolist.deleteBy((todo: Todo) => todo.content() === "A new todo")

todolist.to().plain() /* [
  { id: '3', content: 'Third todo :)', created_at: '2020-08-21T02:17:05.000Z' }
  { "id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
]
```

<br />

### `deleteIndex`

**deleteIndex** removes an element at `index`.

```ts
todolist.to().plain() /* [
  { id: '3', content: 'Third todo :)', created_at: '2020-08-21T02:17:05.000Z' }
  { id: '6', content": 'AN UPPERCASE TODO', created_at: '2020-08-21T02:17:05.000Z' } 
]

todolist.deleteIndex(0)

todolist.to().plain() /* [{ id: '6', content": 'AN UPPERCASE TODO', created_at: '2020-08-21T02:17:05.000Z' }]
```

<br />

### `find`

**find** returns the **first** `node` **matching** the `predicate`, undefined if not found

```ts
todolist.find({id: 1}) // undefined

todolist.find({id: 6}) // Todo
//or
todolist.find((todo: Todo) => todo.ID() === 6)

```

<br />

### `findIndex`

**findIndex** returns the `index` of the **first node matching** the `predicate`, -1 if not found.

```ts
todolist.find({id: 1}) // -1

todolist.find({id: 6}) // 0
//or
todolist.find((todo: Todo) => todo.ID() === 6)
```

<br />

### `filter`

**filter** returns a new `Collection` filled with list of node **matching** the predicate

```ts
todolist.append([ 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "8", "content": "Content B", "created_at": "2020-08-21T02:17:05.000Z" } 
])

todolist.to().plain() /* [ 
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "8", "content": "Content B", "created_at": "2020-08-21T02:17:05.000Z" } 
]) */


// Example 1
todolist.filter({id: 6}) // [ Todo ]
//or 
todolist.filter((todo: Todo) => todo.ID() === 6)


// Example 2
todolist.filter((todo: Todo) => todo.content().startsWith('Content')) // [ Todo, Todo ] 
```

<br />

### `filterIn`

**filterIn** returns a new Collection filled with the nodes for whom the `key`'s value is equal to one of the value in the `arrayElems` passed in parameter.

```ts
todolist.filterIn('id', [7, 8, 9, 10]) // [Todo, Todo] 
//or 
todolist.filterIn((todo: Todo) => todo.ID(), [7, 8, 9, 10])
```

<br />

### `first`

**first** returns the `head` node of the list.

```ts
todolist.first() // Todo
todolist.first().to().plain() // {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" }
```

<br />

### `groupBy`

**groupBy** returns an object composed of **keys generated** from the results of running each element of collection thru iteratee. The corresponding value of each key is a **Collection of elements** responsible for generating the key.

```ts
todolist.grouped('id') // { '6': Todolist(1), '7': Todolist(1), '8': Todolist(1) }
todolist.grouped('created_at') // { '2020-08-21T02:17:05.000Z': Todolist(3) }
```

<br />

### `last`

**groupBy** returns the `tail` node of the list

```ts
todolist.last() // Todo
todolist.last().to().plain() // {"id": "8", "content": "Content B", "created_at": "2020-08-21T02:17:05.000Z" } 
```

<br />

### `indexOf`

**indexOf** returns the `index` of **a node** in the list.

```ts
todolist.indexOf(todolist.state[1]) // 1
```

<br />

### `limit`

**limit** returns a collection filled with the `n` **first nodes** of the list 

```ts
todolist.count() // 3
todolist.limit(2) // Todolist(2)
todolist.limit(3) // Todolist(3)
todolist.limit(4) // Todolist(3)
```

<br />

### `map`

**map** returns a new array filled with the return value of the callback called for each node of the Collection (same than javascript map on arrays)

```ts
todolist.map((todo: Todo, index: number) => todo.content()) // ["AN UPPERCASE TODO", "Content A", "Content B"]
```

<br />

### `newCollection`

**newCollection** returns **fresh instanced** `Collection` with the `state` passed in parameter.

```ts
todolist.newCollection([ todolist.state[0], todolist.state[1] ]) // Todolist(1)
```

<br />

### `newModel`

**newModel** returns a **fresh instanced** Collection's `Model` built with the object passed in parameter

```ts
todolist.newModel({ id: 0, content: 'empty', created_at: new Date() }) // Todo
```

<br />

### `nodeAt`

**nodeAt** returns the node at index in the list.

```ts
todolist.nodeAt(0) // Todo
todolist.nodeAt(5) // undefined
```

<br />

### `offset`

**offset** Returns a fresh instance of the collection removing the n first nodes of the list.

```ts
todolist.offset(1) // [ Todo, Todo ]
todolist.offset(2) // [ Todo ]
todolist.offset(4) // []
```

<br />

### `orderBy`

**orderBy** returns a fresh Collection with the nodes sorted upon the parameters passed

```ts
todolist.arrayOf('id') // [ 6, 7, 8 ]
todolist.orderBy('id', 'desc').arrayOf('id') // [ 8, 7, 6 ]

todolist.arrayOf('content') // [ "AN UPPERCASE TODO", "Content A", "Content B" ]
todolist.orderBy( [ (todo: Todo) => todo.content().length, 'content' ], ['asc', 'desc'] ).arrayOf('content') // [ "Content B", "Content A", "AN UPPERCASE TODO" ]
```

<br />

### `pop`

**pop** removes the last node in the list

```ts
todolist.to().plain() /* [ 
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "8", "content": "Content B", "created_at": "2020-08-21T02:17:05.000Z" } 
]) */

todolist.pop()

todolist.to().plain() /* [ 
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
]) */
```

<br />


### `prepend`

**prepend** returns a fresh Collection with the Array passed in parameter added at the beginning of the current Collection's state.

```ts
todolist.prepend([ { id: '9', content: "A preprended Todo", created_at: new Date() } ])
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "9", "content": "A preprended Todo", "created_at": "2020-08-21T02:17:05.000Z" }
]
*/
```

<br />

### `reduce`

**reduce** reduces `Collection` to a value which is the accumulated result of running each element, where each successive invocation is supplied the return value of the previous. If initialAccumulator is not given, the first Model of Collection is used as the initial value.

```ts
const initialValue = 0
todolist.reduce((total: number, todo: Todo) => total += todo.ID(), initialValue) //22 (6 + 7 + 9)
```

<br />

### `nth`

**nth** Gets the `node` at **index** `n` of the Collection. If n is negative, the nth node from the end is returned.

```ts
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "9", "content": "A preprended Todo", "created_at": "2020-08-21T02:17:05.000Z" }
]
*/

todolist.nth(0).to().plain() // {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
todolist.nth(2).to().plain() // {"id": "9", "content": "A preprended Todo", "created_at": "2020-08-21T02:17:05.000Z" } 
todolist.nth(3).to().plain() // {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
todolist.nth(-1).to().plain() // {"id": "9", "content": "A preprended Todo", "created_at": "2020-08-21T02:17:05.000Z" }
```

<br />

### `shift`

**shift** removes the `first` node 

```ts
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "9", "content": "A preprended Todo", "created_at": "2020-08-21T02:17:05.000Z" }
]
*/

todolist.shift()

todolist.to().plain() /* [
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "9", "content": "A preprended Todo", "created_at": "2020-08-21T02:17:05.000Z" }
]
*/
```

<br />

### `slice`

**slice** same than the [slice](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/slice) method for arrays

```ts
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/

todolist.slice() // Todolist(2)
todolist.slice().to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/

todolist.slice(1) //Todolist(1)
todolist.slice(1).to().plain() // [{"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" }]

todolist.slice(0, 1) //Todolist(1)
todolist.slice(1).to().plain() // [{"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" }]

```

<br />

### `splice`

**splice** same than the [splice](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/splice) method for arrays

```ts
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/

todolist.splice(1, 1) // Todolist(1)

todolist.splice(1, 1).to().plain() // [ {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } ]
```

<br />

### `push`

**push** Add an element at the end of the Collection

```ts
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/

todolist.push({ id: '10', content: "This is the 10th element !", created_at: new Date() })

todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "10", "content": "This is the 10th element !", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/
```

<br />

### `updateAt`

**updateAt** updates the element at index with the Model or Object passed in parameterv

```ts
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "7", "content": "Content A", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "10", "content": "This is the 10th element !", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/

todolist.updateAt( { id: '11', content: "Todo replacing an old one", created_at: new Date() }, 0)

todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "11", "content": "Todo replacing an old one", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "10", "content": "This is the 10th element !", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/
```

<br />

### `updateWhere`

**updateWhere** Merges the states of the Models matching the predicate with toSet Object value

```ts
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "11", "content": "Todo replacing an old one", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "10", "content": "This is the 10th element !", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/

todolist.updateWhere( { id: '11' }, { id: '6', content: 'AN UPPERCASE TODO' } )
//or 
todolist.updateWhere((todo: Todo) => todo.ID() === '11', { id: '6', content: 'AN UPPERCASE TODO' } )

todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "10", "content": "This is the 10th element !", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/
```

<br />

### `uniq`

**uniq** returns a ``new Collection`` with the **unique** elements of the current one.

```ts
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "10", "content": "This is the 10th element !", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/

todolist.uniq() // Todolist(2)

todolist.uniq().to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "10", "content": "This is the 10th element !", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/
```

<br />

### `uniqBy`

**uniqBy** Returns a new Collection with the iteratee by which uniqueness is computed.

```ts
todolist.to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "10", "content": "This is the 10th element !", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/

todolist.uniqBy('id') // Todolist(2)
//or 
todolist.uniqBy( (todo: Todo) => todo.ID() ) // Todolist(2)

todolist.uniqBy('id').to().plain() /* [
  {"id": "6", "content": "AN UPPERCASE TODO", "created_at": "2020-08-21T02:17:05.000Z" } 
  {"id": "10", "content": "This is the 10th element !", "created_at": "2020-08-21T02:17:05.000Z" } 
]
*/
```




