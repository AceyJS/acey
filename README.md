
<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://siasky.net/BAA8tXYO7Ec4f7wEvKPYwM-L-paOU3ZZlcDnucQA2yh4Vg" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />


# Ascey - A React State Manager.

#### Ascey is Model oriented state manager for React apps.

It enables an organized and scalable architecture thanks to the centralization of data and their utilities (getter, setter, formatter) inside **Models** (objects) and **Collections** (list of Models). **One time**, **One place**. 🏴‍☠️

Acey helps your code to stay **organized**, **scalable**, and easy to keep **clean**. 🌱

<br />

## Get started

### Installation

```
npm i acey
```
or
```
yarn add acey
```
<br />

# Ascey - Core.

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

You build a Model from an Object.

#### Example of a Model:
`./src/ascey/models/todo.ts`
```ts
import { Model, IOptions } from 'acey'

// A Model must always have an initial object data.
const DEFAULT_DATA = {
    id: 0,
    content: ''
}

class Todo extends Model {

    constructor(todo = DEFAULT_DATA, options: IOptions){
        super(todo, options)
    }
    
    content = () => this.state.content
    ID = () => this.state.id
}

export default Todo
```
<br />

You build it this way in your class constructor:
`super(data: Object, options: IOptions)`

<br />

- **Model's values**:

    | Name | Type | Description |
    | -- | -- | -- |
    | state |`Object` | return the current Model's data state |
    | options | `Object` | return the options of the Model's |

<br />

- **Model's methods**: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | setState(obj: Object) |`IAction` | update the state by assigning the current state with the obj parameter. (like React |
    | hydrate(state: Object) | `IAction` | fill a the model with the JS object `state` passed in parameter. |
    | deleteKey(key: string) | `IAction` | delete the value linked with a key in your state object. |
    | toPlain() | `Object` | return the state of model as a plain javascript object. |
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
    | cookie() | `IAction` | **(Only if `connected` option is set to `true` and `key` option is `manually set` with `an unique string`)**. Transform the current data of the model to JSON and store it in the cookies. |

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

You build a collection with :
1. An array of Models or Objects.
2. A non-instanced Model class that represents the Model of the elements in the array.

#### Example of a Collection:
`./src/ascey/collections/todo.ts`
```ts
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

#### Collection native methods :
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

<br />

## connect with Component

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/GhcyXPfm/component.png" width="100%">
  </a>
</p>


<br />

# Questions / Answers

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/FsgFwdSL/band.png" width="100%">
  </a>
</p>

#### All the example are in Typescript, does the library works with Javascript?
Yes, it does! The library is written in Typescript, but you can use Acey if you are writing a React app in JS.
