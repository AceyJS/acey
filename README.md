
<p align="center" font-style="italic" >
  <a>
    <img alt="acey" src="https://siasky.net/jACsWS_RnAZq-tZ5Uj4bz9AjVIfDVcxLcb3kYXhkNKAJdg" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />

# OOP State Manager built with Lodash. ⚡

#### What super power it gives me ?
> **To Encapsulate your states inside Models and Collections to treat, access, format, and organize your data in a one and same place. 🔌**

<br />

<p align="center">
  <a>
    <img src="https://siasky.net/FADRz00WBZi1aOgtoycI6mgLVSOZTbWEDD6ZUSoj7P20eQ" width="100%">
  </a>
</p>

#### I work on React {Native}, can I use it ?
> **Yes, Acey works smoothly with React environment, its dev experience is the logical evolution of Redux.<br />On Acey there is:<br />- No action types. ✅<br />- No reducers. ✅<br />- No selectors. ✅<br />- No context. ✅<br />AND you can trigger your actions from wherever you want without any binding. 💥<br />Nice hmm? 😉**

<br />

<p align="center">
  <a>
    <img src="https://siasky.net/bABDwDjCoepBX2CMpLWRT05SF9iO2B2PrCft2ENf-ClTew" width="100%">
  </a>
</p>

#### Seems great! 🤑 And I saw it works as well in NodeJS, how?
> **Right, so Acey enable a built-in feature auto-syncing your states with your local storage. So Acey in the back-end, use this feature by storing your state in a JSON DB 🗄️.<br />When your program run, all your JSON files are pulled and directly added in the state of your collection (It's 100% cached, like Redis 📚).<br /><br />So yeah, it works amazing for embedded systems, prototypes, MVP, or any other program that can work with a full DB cached. 💨**


<br />

<br />

<br />


## Quick implementations

### 1. A React Counter in 2 steps

<img src="https://i.postimg.cc/13DD3SDM/tenor.gif" />

<details><summary>See code</summary>
  <br />
 
**1/2 - State** | *`./counter-model.ts`* 
```ts
import { Model } from 'acey'

class CounterModel extends Model {

  constructor(initialState: any, options: any){
    super(initialState, options)
  }
  
  get = () => this.state.counter
  
  increment = () => this.setState({counter: this.get() + 1}).save()
  decrement = () => this.setState({counter: this.get() - 1}).save()
  
  /* `save()` save the Model's state in the Acey Store */
}

/* A `connected` Model has its state connected with the Acey store */
export default new CounterModel({counter: 0}, {connected: true, key: 'counter'})
```

<br />

**2/2 - Component** | *`./app.tsx`* 
```jsx
import React from 'react'
import { useAcey } from 'react-acey'
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
 
<p align="right" font-style="bold">
  <a target="_blank" href="https://github.com/Fantasim/acey/blob/master/README.md#a-few-examples">More examples</a>
</p>

</details>


<br />


### 2. A RESTful NodeJS API in 2 steps.

<img src="https://siasky.net/_AQX4h4T-QWhT3lqM7gcPmuzPKm0tyhZk_zvEF9PBLdYiQ" />


<details><summary>See code</summary>
<br />

**1/2 - State** | *`./todos.ts`* 
```ts
import { Model, Collection } from 'acey'
import { v4 as uuid } from 'uuid'

export class TodoModel extends Model {
    constructor(initialState: any = {}, options: any){
        super(initialState, options)
    }
}

export class TodoCollection extends Collection {
    constructor(initialState: any, options: any){
        super(initialState, [TodoModel, TodoCollection], options)
    }

    create = (content: string) => {
        todos.push({
            id: uuid(),
            created_at: new Date(),
            content
        }).store()
        return todos.last()
    }

    orderByLastCreation = () => this.orderBy(['created_at'], ['desc'])
}

export default new TodoCollection([], {connected: true, key: 'todolist'})
```

<br />

**2/2 - Server** | *`./index.ts`* 
```ts
import { config } from 'acey'
import express from 'express' 
import morgan from 'morgan' //request logger
import LocalStorage from 'acey-node-store'
import todos from './todos'

const initServer = async () => {
    config.setStoreEngine(new LocalStorage('./db'))
    await config.done()

    const server = express()
    server.use(express.json());
    server.use(morgan('tiny'))
    return server
}

initServer().then((server) => {
    console.log('Server started ')

    server.post('/', (req: express.Request, res: express.Response) => {
        const t = todos.create(req.body.content)
        res.json(t.to().plain())
    })
    
    server.delete('/:id', (req: express.Request, res: express.Response) => {
        todos.deleteBy({'id': req.params.id}).store()
        res.sendStatus(200)
    })
    
    server.get('/', (req: express.Request, res: express.Response) => {
        res.json(todos.orderByLastCreation().to().plain())
    })
    
    server.get('/:id', (req: express.Request, res: express.Response) => {
        const t = todos.find({id: req.params.id})
        t ? res.json(t.to().plain()) : res.sendStatus(404)
        
    })
    
    server.listen(PORT, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})
```
</details>

<br />

# Get Started
## Usage

```
yarn add acey
```

<br />


To start the Acey engine, **you need to declare the configuration as done** at the **root** of your application.
Here's how, according to your environment: 

### ReactJS
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

### React-Native

At the root of your app, bind the React Native Store Engine (AsyncStorage) with Acey to benefit Acey's key features.
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

### NextJS

Refer to the doc ⬇️

🌯 [Next Acey wrapper documentation](https://github.com/Fantasim/next-acey-wrapper)

<br />

### NodeJS

After all your collections have been instanced:
<br />
1. bind the Acey Store Engine for Node (`acey-node-store` package)
2. And set the config as done.

```js
import NodeStorage from 'acey-node-store'
import { config } from 'acey'
import MyCollection1 from './my-collection-1'
import MyCollection2 from './my-collection-2'
...

const myCollect1 = new MyCollection1([], {connected: true, key: 'collection-1'})
const myCollect2 = new MyCollection2([], {connected: true, key: 'collection-2'})
...

config.setStoreEngine(NodeStorage)
config.done()
```

*make sure you already installed `acey-node-store`*
```
yarn add acey-node-store
```

<br />

<br />


## Examples

<details><summary>Nesting Models in Model</summary>

<br />

**1/2 - Device Model** | *`./device-model.js`*
```js
import { Model } from 'acey'
export default class Device extends Model {

  constructor(initialState, options){
    super(initialState, options)
  }
  
  //getters
  brand = () => this.state.brand
  model = () => this.state.model
  version = () => this.state.version  
}
```

<br />

**2/2 - User Model** | *`./user-model.js`*
```js
import { Model } from 'acey'
import Device from './device-model'

const DEFAULT_STATE = {
  id: '',
  username: '',
  device: { brand: '', model: '', version: 0 }
}

class User extends Model {

  constructor(initialState = DEFAULT_STATE, options){
    super(initialState, options);
    this.setState({ 
        device: new Device(initialState.device, this.option().kids()) 
    });
    /* `kids()` makes Device inherits of connected User's methods. */
  }
  
  //getters
  device = () => this.state.device //return the instanced Device Model
  ID = () => this.state.id
  username = () => this.state.username
  
  //action
  updateUsername = (username) => this.setState({ username }).save()
}

export default User
```
</details>

<details><summary>Sort and Filter a TweetList</summary>

<br />

**1/3 - Tweet Model** | *`./tweet-model.js`*
```js
import { Model } from 'acey'

export default class Tweet extends Model {

  constructor(initialState = { content: '' , id: '' }, options){
    super(initialState, options)
  }
  
  //getters
  content = () => this.state.content
  ID = () => this.state.id
}
```

**2/3 - Tweet Collection** | *`./tweet-collection.js`*

```js
import { Collection } from 'acey'
import Tweet from './tweet-model'

class TweetCollection extends Collection {
  
  constructor(initialState = [], options){
    super(initialState, [Tweet, TweetCollection], options)
  }
  
  filterByWorld = (word) => this.filter(o => o.content.indexOf(word) != -1)
  sortByContentLength = () => this.orderBy([(o) => o.content.length], ['asc'])
}

export default new TweetCollection([], {connected: true, key: 'todolist'})
```

**3/3 - Tweets Component** | *`./tweets.js`*
```js
import React from 'react'
import { useAcey } from 'acey'

import TweetCase from './components/tweet'
import TweetList from './tweet-collection'

export default = () => {
   useAcey([ TweetList ])

  const fetchTweetList = () => {
    TweetList.setState([
      { content: 'this is a casual tweet', id: 'ID_1' },
      { content: 'This is a frequent tweet', id: 'ID_2' }
    ]).save()
  }  
  
  return (
    <>
      {Tweetlist.filterByWorld('casual').sortByContentLength().map((tweet, index) => {
        return <TweetCase tweet={tweet} key={index} />
      })}
      <button onClick={fetchTweetList}>Fetch list</button>
    </>
  )
}
```
</details>
