
# Acey API

### Table of contents
* [Model](#model)
* [Collection](#collection)
* [Interfaces](#interfaces)

<br />


## Model

<p align="center" font-style="italic" >
  <a>
    <img src="https://siasky.net/EADADSyChLwhkcxglW4V9Kdce6xMBGNbEIixagA8iVHzMw" width="100%">
  </a>
</p>

A Model is built with an **object**.

#### Example - Todo Model:
```ts
import { Model } from 'acey'

class Todo extends Model {

    constructor(initialState = {}, options){
        super(initialState, options)
    }
 
    content = () => this.state.content
    ID = () => this.state.id
    createdAt = () => this.state.created_at
}

export default Todo
```

<br />

### Instanciation : `super(initialState: Object, options: IOption)`

<br />

- **Model's values**:

    | Name | Type | Description |
    | -- | -- | -- |
    | state |`Object` | return the current Model's data state |

<br />

- **Model's methods**: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | **deleteKey**(key: string) | `IAction` | remove a key in the Model's state object |
    | **deleteMultiKey**(keys: string[]) | `IAction` | remove many keys in the Model's state object |
    | **hydrate**(state: Object) | `IAction` | fill the Model's state with the `Object` passed in parameter. |
    | **is**() |`IsManager` | return methods giving your information about the composition of the Model |
    | **kids**() | `IAction` | return the class actions (use to be passed as options in nested Models.) |
    | **save**() |`IAction` | Dispatch the Model's state to Model's store. |
    | **setState**(state: Object) |`IAction` | update the state by merging it with the `Object` parameter. |
    | **super**() | `ISuper` | return methods used by the acey system. |
    | **store**() |`LocalStoreManager`| **(Only if `connected` option is set to `true`)** return the Model's LocalStoreManager to deal with the local store related with the Model |
    | **Ito**() | `To` | return methods enabling you to convert your Model's state into different data types |
    | **watch**() |`IWatchAction` | return a class enabling you to watch changes on the Model's state and store |
    
<br />

<br />

## Collection

<p align="center" font-style="italic" >
  <a>
    <img src="https://siasky.net/GADqcD9yzvtu9lMGSVtKY5bXto96CJpFu7jTJyMy78iZrA" width="100%">
  </a>
</p>

A Collection is a Model that has for state an array of Models.

#### Example - Todo Collection
```js
import { Collection } from 'acey'
import Todo from './todo'

class Todolist extends Collection {

    constructor(initialState = [], options){
        super(initialState, [Todo, Todolist], options)
    }
    
    create = (content) => {
      this.push({
        id: randomID(),
        content,
        created_at: new Date(),
      }).save()
    }
    
    sortByContent = () => this.orderBy(['content'], ['desc]) as Todolist
}

export default Todolist
```

<br />

### Instanciation : `super(initialState: Array, nodeAndCo: [Model, Collection], options: IOption)`

<br />

- **Collection's values**:

    | Name | Type | Description |
    | -- | -- | -- |
    | state |`Array` | return the current Collection's data state |

<br />

- **Collection's methods**: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | **hydrate**(state: Object) | `IAction` | fill the Collection's state with the `Array` passed in parameter. |
    | **is**() |`IsManager` | return methods giving your information about the composition of the Collection |
    | **kids**() | `IAction` | return the class actions (use to be passed as options in the instanciation of the Collection's Models.) |
    | **save**() |`IAction` | Dispatch the Model's state to Model's store. |
    | **setState**(state: Array) |`IAction` | replace the state by the one passed in parameter. |
    | **super**() | `ISuper` | return methods used by the acey system. |
    | **store**() |`LocalStoreManager`| **(Only if `connected` option is set to `true`)** return the Model's LocalStoreManager to deal with the local store related with the Model |
    | **to**() | `ITo` | return methods enabling you to convert your Collection's state into different data types |
    | **watch**() |`IWatchAction` | return a class enabling you to watch changes on the Collection's state and store |
    | -- | -- | -- |
    | **append**(values: (Collection | Object)[]) |`Collection` | Returns a fresh Collection with the Array passed in parameter added at the end of the current Collection's state. |
    | **chunk**(nChunk: number) |`Collection[]` | Returns an Array of collections split into groups the length of `nChunk`. |
    | **concat**(...list: any) |`Collection` | Creates a new Collection concatenating the current one with any values. |
    | **count()** |`number` | Returns the length of the Collection |
    | **copy()** | `Collection` | Returns a fresh instance of the current Collection.
    | **delete**(v: Object or Model) | `IAction` | Deletes the `Model` passed in parameter if present in the list. |
    | **deleteBy**(predicate: any) | `IAction` | Delete all the nodes matching the predicate |
    | **deleteIndex**(index: number) | `IAction` | Remove an element at index.
    | **find**(predicate: any) | `Model or undefined` | Find the first node matching the predicate |
    | **findIndex**(predicate: any) | `number` | Return the index of the first node matching the predicate |
    | **filter**(predicate: any) | `Collection` | Returns a new Collection filled with list of node matching the predicate |
    | **first**() | `Model or undefined` | Returns the head node of the list
    | **last**() | `Model or undefined` | Returns the tail node of the list  
    | **indexOf**(v: Object or Model) | `number` | Gets the index of a node in the list.
    | **limit**v(n: number) | `Collection` | Picks up the `n` first elements of the list  |
    | **map**(callback: (v: Model, index: number) => any) | `any` | Creates a new array with the results of calling the `callback` for every Collection node (same than javascript map on arrays) |
    | **newCollection**(arr: Array) | `Collection` | Return fresh instanced Collection with `arr` passed in parameter | 
    | **newModel**(obj: Object) | `Model` | Return a fresh instanced Collection's Model built with `obj` passed in parameter | 
    | **nodeAt**(index: number) | `Model or undefined` | Returns the node at `index` in the list. |
    | **offset**(n: number) | `Collection` | Removes the `n` first element of the list  |
    | **orderBy**(iteratees: any[], orders: any[]) | `Collection` | Returns a sorted array of instanced Model upon the parameters passed |
    | **pop**() | `IAction` | Remove the last nodes in the list |
    | **prepend**(values: (Collection | Object)[]) |`Collection` | Returns a fresh Collection with the Array passed in parameter added at the beginning of the current Collection's state. |
    | **reduce**(callback: (accumulator: any, currentValue: any) => any, initialAccumulator: any) | `any` | Reduces Collection to a value which is the accumulated result of running each element in collection, where each successive invocation is supplied the return value of the previous. If initialAccumulator is not given, the first Model of Collection is used as the initial value. |
    | **nth**(index: number) | `Model or undefined` | Gets the node at index n of the Collection. If n is negative, the nth node from the end is returned.  |
    | **shift**() | `IAction` | Remove the first state element |
    | **slice**(begin: number (optional), end: number (optional)) | `Collection` | Same than the slice method for arrays  |
    | **splice**(begin: number, nbToDelete[, elem1[, elem2[, ...]]]) | `Collection` | Same than the splice method for arrays  |
    | **updateAt**(v: Object or Model, index: number) | `IAction` | Updates the element at index with the Model or Object passed in parameter |
    | **updateWhere**(predicate: any, toSet: Object) | `IAction` | Merges the states of the Models matching the `predicate` with the `toSet` Object value |
    | **uniqBy**(iteratee: any) | `IAction` | Returns a new Collection generated  with the `iteratee` by which uniqueness is computed. |
    
<br />

<br />

## Interfaces

<p align="center">
  <a>
    <img src="https://siasky.net/GACKFKVF4znkcrcpSl_oOMESCOPMKYm1qFqLCwTkmIGo1g" width="100%">
  </a>
</p>


- **IOption (or Model's options)**: 

    | Name | Type | Default | Description |
    | -- | -- | -- | -- |
    | connected | `bool` | false | If set to `true` the Model is connected, so it has a Store. |
    | key | `string` | "" | Model's unique key. (optional for non-connected Models |
    
<br />

- **IAction (or Model's actions)**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | store(expires = 365) | `IAction` | **(Only if `connected` option is set to `true`)**. Transform the current data of the model to a string and store it in the localStore. |
    | save() |`IAction` | **(Only if `connected` option is set to `true`)**. Dispatch the Model's state to Model's store. |
    
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
    
- **LocalStoreManager** *(only ReactJS and React Native)*: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | get() | `Object` | return the Model's plain state stored in the local store |
    | isActive() | `boolean` | return `true` if the local store are enabled on the Model |
    | pull() | `undefined` | get the Model's state stored in the local store and set it has the current state of the Model |
    | remove() | `undefined` | remove the Model's state stored in the local store |
    | set() | `IAction` | set the Model's current state to the local store |

<br />

- **ISuper **:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | option() | `IOptions` | Returns the Model's options |
    | prevState |`Object` | Previous state object |
    | prevStateStore |`Object` | Previous Model's store object |
    
- **ITO **:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | listClass(elems: any[]) | `Model[]` | (**Only if Collection**) Returns a list of instanced Models with the list of objects passed in parameter |
    | string() |`string` | Returns the state to a JSON string |
    | plain() |`string` | Returns the state to a JS plain object/array |
    
    
<br />
