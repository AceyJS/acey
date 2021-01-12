
<p align="center" font-style="italic" >
  <a>
    <img alt="acey" src="https://siasky.net/MAAA3n7zPsq4hUD9j23OHgOvJIU1dlFaxAuiQzCw9qFMHg" width="100%">
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
    <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-256.png" width="70px">
  </a>
</p>

#### I work on React {Native}, can I use it ?
> **Yes, Acey works smoothly with React environment, its dev experience is the logical evolution of Redux.<br />On Acey there is:<br />- No action types. ✅<br />- No reducers. ✅<br />- No selectors. ✅<br />- No context. ✅<br />AND you can trigger your actions from wherever you want without any binding. 💥<br />Nice hmm? 😉**

<br />

<p align="center">
  <a>
    <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/nodejs-1-logo.png" width="130px">
  </a>
</p>

#### Seems great! 🤑 and it works as well with NodeJS, right?
> **Right, so Acey enable a built-in feature auto-syncing your states with your local storage. So Acey in the back-end, use this feature by storing your state in a JSON DB 🗄️.<br />When your program run, all your JSON files are pulled and directly added in the state of your collection (It's 100% cached, like Redis 📚).<br /><br />So yeah, it works amazing for embedded systems, CLI tools, prototypes, MVP, or any other program that can work with a full DB cached. 💨**

<br />

<br />

<br />

<br />


<p align="center">
  <a target="_blank" href="https://github.com/arysociety/acey/blob/master/docs/api.md">
    <img width="20%" src="https://siasky.net/CAAkpr2DonQI6sv58Q0yYtyLpBOAmSS93vt1cZlQOx4riQ"/>
  </a>

  <img width="2%" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
  
  <a href="#get-started">
    <img width="20%" src="https://siasky.net/IADMNB8ShW03w7rwttWPZqlsbKWWw25v_LSnGLOpUUtjCQ"/>
  </a>

  <img width="2%" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>

  <a target="_blank" href="https://github.com/arysociety/acey-examples">
    <img width="20%" src="https://siasky.net/EACUxKJWNHB8qNYIYUrCFn3OwQn9vy-Q0HAnOPe2wopurw"/>
  </a>
</p>

<br />

<br />

<br />

<br />



# Quick implementations

## 1. A React Counter

<img width="80%" src="https://i.postimg.cc/13DD3SDM/tenor.gif" />

<details><summary>See code</summary>
  <br />
 
**Step 1/2 - State** | `./counter-model.ts`
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

**Step 2/2 - Component** | `./app.tsx`
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
</details>


<br />


## 2. A RESTful NodeJS API

<img width="80%" src="https://siasky.net/_AQX4h4T-QWhT3lqM7gcPmuzPKm0tyhZk_zvEF9PBLdYiQ" />


<details><summary>See code</summary>
<br />

**Step 1/2 - State** | `./todos.ts`
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

**Step 2/2 - Server** | `./index.ts`
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


## 3. A React-Native micro-blogging app

<img height="550px" src="https://siasky.net/_AQ7OxKUidVsPZ6Ems-6GMmSVNBT5XaJEKbkJTGuGirGDg" />


<details><summary>See code</summary>
<br />

**Step 1/3 - State** | `./post.ts`
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

    /* `save()` save the Model's state in the Acey Store */
    updateContent = (content) => this.setState({content}).save().store()
}

export class PostCollection extends Collection {
    constructor(initialState = [], options){
        super(initialState, [PostModel, PostCollection], options)
    }

    sortByCreationDate = () => this.orderBy(['created_at'], ['desc'])
    
    create = (content) => {
        PostList.push({
          id: Math.random().toString(), 
          content, 
          created_at: new Date()
        }).save().store()
    }
    
    /* 
      `store()` store the state in the Local Store
      
      (i) Acey auto-sync the local store's data with 
          their Model/Collection when the app reload.
    */
}
```

<br />

**Step 2/3 - Components**

*Styles are not present to purposely make the code shorter and more readable.*

`./components/add-post-input.js`

```js
import React, {useState} from 'react';
import { 
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Dimensions
 } from 'react-native';

const AddPostInput = (props) => {

    const { onSubmit } = props

    const [text, setText] = useState('')

    const onLocalSubmit = () => {
        onSubmit(text)
        setText('')
    }

    const renderSubmitTouchable = () => (
        <SubmitTouchable onPress={onLocalSubmit}>
            <SubmitText>CREATE</SubmitText>
        </SubmitTouchable>
    )

    return (
        <Container>
            <Input
                value={text}
                onChangeText={(text) => setText(text)}
                multiline
            />
            {renderSubmitTouchable()}
        </Container>        
    )
}

export default AddPostInput
```

*Styles are not present to purposely make the code shorter and more readable.*

`./components/post.js`

```js
import React, { useState } from 'react'
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const Post = (props) => {
    const {
        post,
        onDelete
    } = props

    const [updateText, setUpdateText] = useState(post.content())
    const [isUpdating, setUpdatingStatus] = useState(false)

    onSubmitUpdate = () => {
        post.updateContent(updateText)
        setUpdatingStatus(false)
    }

    const renderUpdateContainer = () => (
        <UpdateContainer>
            <UpdateInput multiline={true} value={updateText} onChangeText={(text) => setUpdateText(text)} />
            <UpdateSubmitTouchable onPress={onSubmitUpdate}>
                <UpdateSubmitText>
                    UPDATE
                </UpdateSubmitText>
            </UpdateSubmitTouchable>
        </UpdateContainer>
    )

    const renderAction = (title = '', color = '', onPress = null) => (
        <ActionTouchable onPress={onPress} color={color}>
            <ActionText color={color}>{title}</ActionText>
        </ActionTouchable>
    )

    const renderActions = () => (
        <ActionsWrapper>
            {renderAction('Update', 'blue', () => setUpdatingStatus(true))}
            {renderAction('Delete', 'red', () => onDelete(post))}
        </ActionsWrapper>
    )

    return (
        <Container>
            {!isUpdating && <View>
                <TopWrapper>
                    <DateText>{post.formatedCreationDate()}</DateText>
                </TopWrapper>
                <ContentText>{post.content()}</ContentText>
                {renderActions()}
            </View>}
            {isUpdating && renderUpdateContainer()}
        </Container>
    )

}

export default Post
```

<br />

**Step 3/3 - Main**

*Styles are not present to purposely make the code shorter and more readable.*

`./App.js`

```js
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';

import { config } from 'acey'
import { useAcey } from 'react-acey'
import { PostCollection } from './posts'

import Post from './src/components/post'
import AddPostInput from './src/components/add-post-input'

const PostList = new PostCollection([], {connected: true, key: 'postlist'})
config.setStoreEngine(AsyncStorage)
config.done()

const App = () => {

  useAcey([ PostList ])

  const onSubmit = (content) => PostList.create(content)
  const onDelete = (post) => PostList.delete(post).save().store()

  return (
    <>
      <ScrollView>
        <AddPostInput onSubmit={onSubmit} />
        {PostList.sortByCreationDate().map((post, index) => {
          return (
            <View key={index}>
              <Post post={post} onDelete={onDelete} />
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

### NextJS

Refer to the [Next Acey wrapper documentation](https://github.com/Fantasim/next-acey-wrapper) 💡

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

## Small code demonstrations
#### 1. **`hydrate`** vs **`setState`** and **Model nesting**. [Click here](https://gist.github.com/Fantasim/7a5b02c3e3d381b4a8489d580b4d2642)
#### 2. Model's `local storage` cycle exlained. [Click here](https://gist.github.com/Fantasim/eddfd25f284245f490380c192771d534)




