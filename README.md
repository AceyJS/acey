**A robust, lightweight (~30kb), and portable object-oriented state manager**

<br />

<p align="center" font-style="italic" >
  <a>
    <img alt="acey" src="https://github.com/Fantasim/assets/blob/master/68747470733a2f2f736961736b792e6e65742f4d414141336e377a50737134685544396a32334f48674f764a495531646c466178417569517a43773971464d4867.png?raw=true" width="100%">
  </a>
 + Reusability. | - Debugging. | - Code. | + Productivity.
</p>

<br />

<br />

<br />


# Object Oriented State Manager tailored for React {Native} ⚡

### Acey aims to be for States what React is for Components
- Easily **code decoupled** and **reusable** states for JS applications.
- **Lightweight** but **highly customisable** so there is no need for external librairies/tools when handling states
- Robust by a **boilerplate free** and **class oriented architecture**, so debugging is over. (no selectors, reducers, context, bindings, etc..)

<br />
<br />

<p align="center">
  <a target="_blank" href="https://twitter.com/aceyjs">
    <img width="32px" src="https://cdn-icons-png.flaticon.com/512/889/889147.png"/>
  </a>
  
  <img width="32px" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
  
  <a target="_blank" href="https://discord.com/channels/1058396126904078367">
    <img width="32px" src="https://cdn-icons-png.flaticon.com/512/3670/3670157.png"/>
  </a>
</p>

<br />
<br />

## Why Acey exists ?

As with most libraries, it started with the tiredness of repetitions. 💡

In December 2019, I was starting an umpteenth **React-Native** application and found myself coding the same states that I previously did in other apps. 
Reusability of components was easy with React, but I couldn't find any existing state manager that would make **state reusability** cool but that also combine **oriented object** programming and **smooth management of cached data** and **local store**. 📱

These were the 2 most important requirements for Acey:
- **States** are built the **same way** you create Components and **re-use them** in each of your projects. 🖥️
- **Persistant** so the states can be automatically **synchronized** with the **local store** and make your apps easily **buildable in a no-network environment**. 📡

<br />

<br />


<p align="center">
  <a target="_blank" href="https://github.com/arysociety/acey/blob/master/docs/api.md">
    <img width="20%" src="https://github.com/Fantasim/assets/blob/master/68747470733a2f2f736961736b792e6e65742f4341416b707232446f6e514936737635385130795974794c70424f416d53533933767431635a6c514f7834726951.png?raw=true"/>
  </a>

  <img width="2%" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
  
  <a href="#get-started">
    <img width="20%" src="https://github.com/Fantasim/assets/blob/master/68747470733a2f2f736961736b792e6e65742f4941444d4e4238536857303377377277747457505a716c73624b5757773235765f4c536e474c4f705555746a4351.png?raw=true"/>
  </a>

  <img width="2%" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>

  <a target="_blank" href="https://github.com/AceyJS/acey/tree/master/examples">
    <img width="20%" src="https://github.com/Fantasim/assets/blob/master/68747470733a2f2f736961736b792e6e65742f45414355784b4a574e484238714e594959557243466e334f77516e3976792d513048416e4f506532776f70757277.png?raw=true"/>
  </a>
</p>

<br />

<br />

<br />

<br />


# Ways

### Synchronise with local store

<details><summary>See code</summary>

```tsx
class User extends Model {
  constructor(state: any, options: any) {
    super(state, options);
  }
}

const myuser = new User({ id: 1, status: 'normal' }, {connected: true, key: 'user'});
myuser.setState({ status: 'good' })
//local store object: {}
myuser.setState({ status: 'great' }).store()
//local store object: {user: {id: 1, status: 'great'}}
myuser.setState({ status: 'perfect' }).store()
//local store object: {user: {id: 1, status: 'perfect'}}

/*
  Now when refreshing the page, the default state of my myuser will be: {id: 1, status: 'perfect'}
*/
```
  
</details>

<br />

### Rendering on order
  
<details><summary>See code</summary>

```tsx
class User extends Model {
  constructor(state: any, options: any) {
    super(state, options);
  }
}
const myuser = new User({ id: 1, status: 'normal' });
myuser.setState({ status: 'good' }); //doesn't re-render components
myuser.setState({ status: 'great' }); //still doesn't re-render components
myuser.setState({ status: 'perfect' }).save(); //NOW it re-render components :)

export default function App() {
  /* state changed 3 times, but re-rendered once only */
  return (
    <div>
      <h1>{myuser.state.status}</h1>
    </div>
  );
}
```
  
</details>
  
<br />

### Subscribe 
  
<details><summary>See code</summary>
  
```ts
class User extends Model {
  constructor(state: any, options: any) {
    super(state, options);
  }
}

const myuser = new User({ id: 1, status: 'normal' });
myuser.watch().state((prev, after) => alert(prev.status + after.status));
myuser.setState({ status: 'good' });
// alert: "normal good"
myuser.setState({ status: 'great' });
// alert: "good great"
```
  
</details>
  
<br />

### Nested models

<details><summary>See code</summary>
  
```ts
class Device extends Model {
  constructor(state: any, options: any) {
    super(state, options);
  }
}
class User extends Model {
  constructor(state: any, options: any) {
    super(state, options);
    this.setState({
    /* kids(): makes inherit the parent options */
      device: new Device(state.device, this.kids()),
    });
  }
  device = () => this.state.device;
}

const myuser = new User({
    id: 1,
    status: 'great',
    device: {
      platform: 'ios',
      version: 125,
    }
});
console.log(myuser.to().string()); // {"id":1,"status":"great","device":{"platform":"ios","version":125}}
myuser.device().setState({ platform: 'android', version: 200 });
console.log(myuser.to().string()); // {"id":1,"status":"great","device":{"platform":"android","version":200}}
```
  
</details>

<br />

### Amazing for lists

<details><summary>See code</summary>
  
```ts
class User extends Model {
  constructor(state: any, options: any) {
    super(state, options);
  }
}
class UserList extends Collection {
  constructor(state: any, options: any) {
    super(state, [User, UserList], options);
  }
}

const users = new UserList([], {});
users.append([
  { id: 1, name: 'bob' },
  { id: 2, name: 'alice' },
]);
//users = [{"id":1,"name":"bob"},{"id":2,"name":"alice"}]
const alice = users.find({ name: 'alice' });
//alice = {"id":2,"name":"alice"}
users.delete(alice);
//users = [{"id":1,"name":"bob"}]
users.push({ id: 3, name: 'mike' });
//users = [{"id":1,"name":"bob"},{"id":3,"name":"mike"}]
console.log(users.orderBy('id', 'desc'));
//print [{"id":3,"name":"mike"}, {"id":1,"name":"bob"}]

/*
...
and 40 more methods to ease your life.
*/
```
  
</details>

<br />

<br />

# Quick implementations


## 1. Designless todolist in ReactJS

<img width="40%" src="https://raw.githubusercontent.com/Fantasim/assets/master/aceyreactodolist.gif" />

[Try it online HERE](https://stackblitz.com/edit/react-acey-todo?file=src%2FApp.jsx&terminal=dev) (full app code in one single file)



<br />


## 2. A RESTful NodeJS API

<img width="80%" src="https://github.com/Fantasim/assets/blob/master/68747470733a2f2f736961736b792e6e65742f5f415158346834542d51576854336c714d37676350_lwqdWxn0.gif?raw=true" />


<details><summary>See code</summary>
<br />

**Step 1/2 - State** | `./todos.ts`
```ts
import { Model, Collection } from 'acey'
import { v4 as uuid } from 'uuid'

export class TodoModel extends Model {
    constructor(initialState = {}, options){
        super(initialState, options)
    }
}

export class TodoCollection extends Collection {
    constructor(initialState = [], options){
        super(initialState, [TodoModel, TodoCollection], options)
    }
    orderByLastCreation = () => this.orderBy(['created_at'], ['desc'])
}

export default new TodoCollection([], {connected: true, key: 'todolist'})
```

<br />

**Step 2/2 - Server** | `./index.ts`
```ts
import { config } from 'acey'
import LocalStorage from 'acey-node-store'
import todos from './todos'

const initServer = async () => {
    config.setStoreEngine(new LocalStorage('./db'))
    await config.done()
    return express()
}

initServer().then((server) => {
    console.log('Server started ')

    server.post('/', (req: express.Request, res: express.Response) => {
        todos.push({ id: uuid(), created_at: new Date(), content: req.body.content }).store()
        res.json(todos.last().to().plain())
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

[Try it yourself HERE](https://github.com/AceyJS/acey/tree/master/examples/node-todo-api)

<br />


## 3. A React-Native micro-blogging app with Expi

<img height="550px" src="https://github.com/Fantasim/assets/blob/master/68747470733a2f2f736961736b792e6e65742f5f4151374f784b5569645673505a36456d732d3647_0qx2i0IM.gif?raw=true" />


<details><summary>See code</summary>
<br />

**Step 1/2 - State** | `./post.ts`
```ts
import { Model, Collection } from 'acey'
import moment from 'moment'

export class PostModel extends Model {

    constructor(initialState = {}, options){
        super(initialState, options)
    }

    ID = () => this.state.id
    content = () => this.state.content
    createdAt = () => this.state.created_at
    formatedCreationDate = () => moment(this.createdAt()).format("MMM Do");
}

export class PostCollection extends Collection {
    constructor(initialState = [], options){
        super(initialState, [PostModel, PostCollection], options)
    }

    sortByCreationDate = () => this.orderBy(['created_at'], ['desc'])
}

export default new PostCollection([], {connected: true, key: 'postlist'})
```

<br />

**Step 2/2 - App**

`./App.js`

```js
//React imports
...

import { config } from 'acey'
import { useAcey } from 'react-acey'
import { posts } from './posts'

import Post from './src/components/post'
import AddPostInput from './src/components/add-post-input'

const App = () => {

  useAcey([ posts ])

  /* 
    save() method set the change state as done and re-render the required components
    store() save the new state in the local storage
  */
  const onSubmit = (content) => posts.push({id: randomID(), created_at: new Date(), content: content}).save().store()
  const onDelete = (post) => posts.delete(post).save().store()

  return (
    <>
      <ScrollView>
        <AddPostInput onSubmit={onSubmit} />
        {posts.sortByCreationDate().map((post) => {
          return (
            <View key={post.ID()}>
              <Post 
                content={post.content()}
                date={post.formatedCreationDate())}
                onDelete={onDelete}
              />
            </View>
          )
        })}
      </ScrollView>
    </>
  );
};

export default App;
```
</details>

[Try it yourself HERE](https://github.com/AceyJS/acey/tree/master/examples/react-native-blog)

<br />

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
<br />

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

*make sure to install **[react-acey](https://github.com/arysociety/react-acey)** to **bind** your **React components** with your **Models and Collections**.*
```sh
yarn add react-acey
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

*make sure to install and link **[async-storage](https://github.com/react-native-community/async-storage)** .*
```sh
yarn add @react-native-community/async-storage
```

<br />

### NodeJS

After all your collections have been instanced:
<br />
1. bind the **Acey Store Engine** for Node with **[acey-node-store](https://github.com/arysociety/acey-node-store)**
2. And **set** the **config** as **done**.

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

*make sure to install **[acey-node-store](https://github.com/arysociety/acey-node-store)** .*
```sh
yarn add acey-node-store
```

<br />

<br />

## Advanced demonstrations/system explainations
#### 1. **`hydrate`** vs **`setState`** and **Model nesting**. [Click here](https://gist.github.com/Fantasim/7a5b02c3e3d381b4a8489d580b4d2642)
#### 2. Model's `local storage` cycle exlained. [Click here](https://gist.github.com/Fantasim/eddfd25f284245f490380c192771d534)




