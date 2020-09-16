
# API 📐  

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

  <img width="5%" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>

  <a href="#interfaces">
    <img width="20%" src="https://siasky.net/EACuwZuJQfGmZ0qap3qAuHMdn_TVPrNjbIlXpRuh6vp3SA"/>
  </a>
</p>

<br />

<br />

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
    | [**state**](https://github.com/arysociety/acey/blob/master/docs/examples.md#state) |`Object` | return the current **Model's state** |

<br />

- **Model's methods**: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | [**deleteKey**](https://github.com/arysociety/acey/blob/master/docs/examples.md#deletekey) (key: string or string[]) | `IAction` | remove **key(s)** in the Model's state object |
    | [**hydrate**](https://github.com/arysociety/acey/blob/master/docs/examples.md#hydrate)(state: Object) | `IAction` | **fill the Model's state** with the `Object` passed in parameter. |
    | [**is**](https://github.com/arysociety/acey/blob/master/docs/examples.md#is)() |`IsManager` | return **methods giving informations** about the **Model's composition**. |
    | [**kids**](https://github.com/arysociety/acey/blob/master/docs/examples.md#kids)() | `IAction` | return the class actions (use to be passed as options in nested Models.) |
    | [**save**](https://github.com/arysociety/acey/blob/master/docs/examples.md#save)() |`IAction` | **Dispatch** the Model's state to the Model's store. |
    | [**setState**](https://github.com/arysociety/acey/blob/master/docs/examples.md#setstate)(state: Object) |`IAction` | **update the state** by merging it with the `Object` parameter. |
    | [**super**](https://github.com/arysociety/acey/blob/master/docs/examples.md#super)() | `ISuper` | return methods used by the **acey system**. |
    | [**localStore**](https://github.com/arysociety/acey/blob/master/docs/examples.md#localstore)() |`LocalStoreManager`| **(Only if `connected` option is set to `true`)** return the Model's LocalStoreManager to deal with the local store related with the Model |
    | [**to**](https://github.com/arysociety/acey/blob/master/docs/examples.md#to)() | `ITo` | return methods to **convert your Model's state** into different data types (like **string**, **JSON**..) |
    | [**watch**](https://github.com/arysociety/acey/blob/master/docs/examples.md#watch)() |`IWatchAction` | return methods to **watch changes** on the Model's **state**, **store** and **local store** |
    
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
    | [**state**](https://github.com/arysociety/acey/blob/master/docs/examples.md#state-1) |`Array` | return the current **Collection's state** |

<br />

- **Collection's methods**: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | [**hydrate**](https://github.com/arysociety/acey/blob/master/docs/examples.md#hydrate-1)(state: Array) | `IAction` | **fill the Collection's state** with the `Array` passed in parameter. |
    | [**is**](https://github.com/arysociety/acey/blob/master/docs/examples.md#is-1)() |`IsManager` | return **methods giving informations** about the **Collection's composition**. |
    | [**save**](https://github.com/arysociety/acey/blob/master/docs/examples.md#save-1)() |`IAction` | **Dispatch** the Collection's state to the Collection's store. |
    | [**setState**](https://github.com/arysociety/acey/blob/master/docs/examples.md#setstate-1)(state: Array) |`IAction` | **replace the state** by the one passed in parameter. |
    | [**super**](https://github.com/arysociety/acey/blob/master/docs/examples.md#super-1)() | `ISuper` | return methods used by the **acey system**. |
    | [**localStore**](https://github.com/arysociety/acey/blob/master/docs/examples.md#localstore-1)() |`LocalStoreManager`| **(Only if `connected` option is set to `true`)** return the **LocalStoreManager** to deal with the **Collection's local store** |
    | [**to**](https://github.com/arysociety/acey/blob/master/docs/examples.md#to-1)() | `ITo` | return methods to **convert your Collection's state** into different data types (like **string**, **JSON**..) |
    | [**watch**](https://github.com/arysociety/acey/blob/master/docs/examples.md#watch-1)() |`IWatchAction` | return methods to **watch changes** on the Collection's **state**, **store** and **local store** |
    | -- | -- | -- |
    | [**append**](https://github.com/arysociety/acey/blob/master/docs/examples.md#append)(values: (Collection or Object)[]) | `Collection` | Returns a fresh Collection with the Array passed in parameter **added at the end of the current Collection's state**. |
    | [**arrayOf**](https://github.com/arysociety/acey/blob/master/docs/examples.md#arrayof)(key: string) |`any[]` | Returns an **Array of value** for the `key` in **each element** of the `Collection`. |
    | [**chunk**](https://github.com/arysociety/acey/blob/master/docs/examples.md#chunk)(nChunk: number) |`Collection[]` | Returns an Array of collections **splited into groups of the length** of `nChunk`. |
    | [**concat**](https://github.com/arysociety/acey/blob/master/docs/examples.md#concat)(...list: any) |`Collection` | Creates a new Collection **concatenating the current state** with any values. |
    | [**count**](https://github.com/arysociety/acey/blob/master/docs/examples.md#count)() |`number` | Returns the **length** of the Collection's state |
    | [**copy**](https://github.com/arysociety/acey/blob/master/docs/examples.md#copy)() | `Collection` | Returns a **fresh instance** of the current Collection.
    | [**delete**](https://github.com/arysociety/acey/blob/master/docs/examples.md#delete)(v: Object or Model) | `IAction` | **Deletes** the `Model` passed in parameter **if present** in the list. |
    | [**deleteBy**](https://github.com/arysociety/acey/blob/master/docs/examples.md#deleteby)(predicate: any) | `IAction` | **Delete all** the nodes **matching** the **predicate** |
    | [**deleteIndex**](https://github.com/arysociety/acey/blob/master/docs/examples.md#deleteindex)(index: number) | `IAction` | **Remove** an element **at index**.
    | [**find**](https://github.com/arysociety/acey/blob/master/docs/examples.md#find)(predicate: any) | `Model or undefined` | **Find** the **first** node **matching** the predicate |
    | [**findIndex**](https://github.com/arysociety/acey/blob/master/docs/examples.md#findindex)(predicate: any) | `number` | Return the **index** of the **first node matching** the predicate |
    | [**filter**](https://github.com/arysociety/acey/blob/master/docs/examples.md#filter)(predicate: any) | `Collection` | Returns a new **Collection filled** with **list of node matching** the predicate |
    | [**filterIn**](https://github.com/arysociety/acey/blob/master/docs/examples.md#filterin)(key: string, arrayElems: any[]) | `Collection` | Returns a new **Collection filled** with the nodes for whom the `key`'s value is **equal** to **one of the value** in the `arrayElems` passed in parameter. |
    | [**first**](https://github.com/arysociety/acey/blob/master/docs/examples.md#first)() | `Model or undefined` | Returns the **head** node of the list
    | [**groupBy**](https://github.com/arysociety/acey/blob/master/docs/examples.md#groupby)(iteratee: any) | `IGrouped` | Returns an **object** composed of **keys generated** from the results of running each element of collection thru iteratee. The corresponding value of each key is a **Collection of elements** responsible for generating the key. |
    | [**indexOf**](https://github.com/arysociety/acey/blob/master/docs/examples.md#indexof)(v: Object or Model) | `number` | Gets the **index of a node** in the list.
    | [**last**](https://github.com/arysociety/acey/blob/master/docs/examples.md#last)() | `Model or undefined` | Returns the **tail** node of the list  
    | [**limit**](https://github.com/arysociety/acey/blob/master/docs/examples.md#limit)(n: number) | `Collection` | Returns a collection filled with the `n` **first nodes** of the list.  |
    | [**map**](https://github.com/arysociety/acey/blob/master/docs/examples.md#map)(callback: (v: Model, index: number) => any) | `any` | Creates a new array with the results of calling the `callback` for every Collection node (**same** than **javascript map** on arrays) |
    | [**newCollection**](https://github.com/arysociety/acey/blob/master/docs/examples.md#newcollection)(arr: Array) | `Collection` | Return **fresh instanced** Collection with `arr` passed in parameter | 
    | [**newModel**](https://github.com/arysociety/acey/blob/master/docs/examples.md#newmodel)(obj: Object) | `Model` | Return a **fresh instanced Collection's Model** built with `obj` passed in parameter | 
    | [**nodeAt**](https://github.com/arysociety/acey/blob/master/docs/examples.md#nodeat)(index: number) | `Model or undefined` | Returns the **node at `index`** in the list. |
    | [**offset**](https://github.com/arysociety/acey/blob/master/docs/examples.md#offset)(n: number) | `Collection` |  Returns a fresh instance of the collection removing the `n` **first nodes** of the list. |
    | [**orderBy**](https://github.com/arysociety/acey/blob/master/docs/examples.md#orderby)(iteratees: any[], orders: any[]) | `Collection` | Returns a **fresh Collection** with the nodes **sorted** upon the parameters passed |
    | [**pop**](https://github.com/arysociety/acey/blob/master/docs/examples.md#pop)() | `IAction` | **Remove** the **last node** in the list |
    | [**prepend**](https://github.com/arysociety/acey/blob/master/docs/examples.md#prepend)(values: Collection[] or Object[]) | `Collection` | Returns a fresh Collection with the **`Array`** passed in parameter **added at the beginning of the current Collection's state**. |
    | [**push**](https://github.com/arysociety/acey/blob/master/docs/examples.md#push)() | `IAction` | **Add** an element at the **end** in the list |
    | [**reduce**](https://github.com/arysociety/acey/blob/master/docs/examples.md#reduce)(callback: (accumulator: any, currentValue: any) => any, initialAccumulator: any) | `any` | Reduces Collection to a value which is the accumulated result of running each element in collection, where each successive invocation is supplied the return value of the previous. If initialAccumulator is not given, the first Model of Collection is used as the initial value. |
    | [**nth**](https://github.com/arysociety/acey/blob/master/docs/examples.md#nth)(index: number) | `Model or undefined` | Gets the **node at index n** of the Collection. If n is negative, the nth node from the end is returned.  |
    | [**shift**](https://github.com/arysociety/acey/blob/master/docs/examples.md#shift)() | `IAction` | **Remove** the **first** element |
    | [**slice**](https://github.com/arysociety/acey/blob/master/docs/examples.md#slice)(begin: number (optional), end: number (optional)) | `Collection` | Same than the slice method for arrays  |
    | [**splice**](https://github.com/arysociety/acey/blob/master/docs/examples.md#splice)(begin: number, nbToDelete[, elem1[, elem2[, ...]]]) | `Collection` | Same than the splice method for arrays  |
    | [**updateAt**](https://github.com/arysociety/acey/blob/master/docs/examples.md#updateat)(v: Object or Model, index: number) | `IAction` | **Updates** the element **at index** with the Model or Object passed in parameter |
    | [**updateWhere**](https://github.com/arysociety/acey/blob/master/docs/examples.md#updatewhere)(predicate: any, toSet: Object) | `IAction` | **Merges** the states of the Models **matching** the `predicate` **with `toSet`** Object value |
    | [**uniq**](https://github.com/arysociety/acey/blob/master/docs/examples.md#uniq)() | `IAction` | Returns a **new Collection** with **only unique** elements.|
    | [**uniqBy**](https://github.com/arysociety/acey/blob/master/docs/examples.md#uniqby)(iteratee: any) | `IAction` | Returns a **new Collection** with the `iteratee` by which **uniqueness** is computed. |
    
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
    | connected | `bool` | false | If **set to `true`** the Model is connected, so **it has a store**. *Can be connected to outside, like a react component.* |
    | key | `string` | "" | Model's **unique key**. *Optional for non-connected Models* |
    
<br />

- **IAction (or Model's actions)**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | **store**(expires = 365) | `IAction` | **(Only if `connected` option is set to `true`)**. **Transform the state** of the Model **to a string** and **store it in the localStore**. |
    | **save**() |`IAction` | **(Only if `connected` option is set to `true`)**. **Dispatch** the Model's **state** **to** Model's **store**. |
    
<br />

- **IWatchAction**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | **store**(callback: (prevStore, nextStore) => any) | `SubscribeAction` | **Execute the callback** passed in parameter **every time** the Model's **store changes**. It returns a `SubscriberAction` class with a `stop` method. |
    | **state**(callback: (prevStore, nextStore) => any) | `SubscribeAction` | **Execute the callback** passed in parameter **every time** the Model's **state changes**. It returns a `SubscriberAction` class with a `stop` method. |
    | **localStoreFetch**(callback: () => any) | `SubscribeAction` | **Execute the callback** passed in parameter **when** the Model **has just pulled its data stored in the local storage**. It returns a `SubscriberAction` class with a `stop` method. |
    
 <br />
    
- **IsManager**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | **collection**() |`boolean` | Returns `true` if the Model **is a collection** |
    | **connected**() |`boolean` | Returns `true` if the Model **is connected** to the store. |
    | **empty**() |`boolean` | Returns `true` if the Model's state **is empty** |
    | **equal**(m: Model) |`boolean` | Returns `true` if the Model's **state is equal to the one passed** in parameter. |
    | **localStoreEnabled**() |`boolean` | Returns `true` if the **localStore is enabled** with the Model |

<br />

- **OptionManager**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | **get**() | `IOptions` | Returns the **Model's option Object** |
    | **key**() | `string` | Returns the **Model's key** |
    | **kids**() | `Object` | Returns the **connected methods** of the Model (as options). You can then **pass this object as options for any instanced Model/Collection inside a connected Model**. *It will make them connected without separating them from each other.* |
    
<br />
    
- **LocalStoreManager** *(only React and Node)*: 

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | **get**() | `Object` | Returns the Model's **plain state stored** in the local store |
    | **isActive**() | `boolean` | Returns `true` if the **local store is enabled** on the Model |
    | **pull**() | `undefined` | Sets the data stored in the **Model's local store into the Model's state** | 
    | **remove**() | `undefined` | **Clears** the Model's **local store** |
    | **set**() | `IAction` | Sets the **Model's state into the local store** |

<br />

- **ISuper**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | **option**() | `IOptions` | Returns the Model's **options** |
    | **prevState** |`Object` | Returns the **previous state** |
    | **prevStateStore** |`Object` | Returns the **previous store** |
    
 
 <br />
 
 
- **ITO**:

    | Prototype | Return value | Description |
    | -- | -- | -- |
    | **listClass**(elems: any[]) | `Model[]` | (**Only if Collection**) Returns a list of instanced Models with the list of objects passed in parameter |
    | **string**() |`string` | Returns the state to **a JSON string** |
    | **plain**() |`string` | Returns the state to a **JS plain object/array** *(JSON format)* |
    
    
<br />
