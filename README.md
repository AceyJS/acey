
<p align="center" font-style="italic" >
  <a href="https://rnds.netlify.com/">
    <img alt="react-ascey" src="https://i.postimg.cc/wvCsGXdM/ascey.png" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />

# A MVC oriented state manager. (Better than Redux)

Ascey is a-based-MVC state manager for your React apps.
It is built on top of Redux and makes easy the maintenance of an organized and scalable architecture on medium and large apps.


## Better than Redux, how ?

Redux is a great state manager and this is the reason why it got so much success and created a new whole ecosystem of open source libraries.
This is also why Ascey is build on top of it, using its API to work.

#### Redux has for weekness, its strength : The boilerplate 
- Actions function / type
- Reducers
- Connect
- Selectors ([reselect](https://github.com/reduxjs/reselect)), 
- Middlewares ([saga](https://github.com/redux-saga/redux-saga), [thunk](https://github.com/reduxjs/redux-thunk), [logger](https://github.com/LogRocket/redux-logger))
- Util formatting functions
- Redundant imports in your components (actions, selectors, utils formatting)


### This is too much.
The redux boilerplate is clean and enable you to make a good organization on small apps. 
Still, more and more, you add actions and reducers (and so data to handle), more you find yourself feeling the architecture messy, hard to maintain, and a significant drop concerning your productivity working on the project.


### Why ?

Because your app has "100" different action types, "12" different reducers, "70" differents action functions, and I'm not talking about your selectors and utility functions distributed in dozen of files.
That means that iterating on this app is painful, and your ability to keep developing your app while maintaining a high standard in terms of organization decreases.

#### In other words, you lose productivity, and you don't like what you are doing anymore because your app.

<br />

<br />

# Ascey

## Model

example: 
```
import { Model } from 'react-ascey'
class Window extends Model {
    
    constructor(dimensions = {width: window.innerWidth, height: window.innerHeight}){
        super(dimensions)
    }
    
    width = () => this.get().width
    height = () => this.get().height

    public isXS = () => this.width() < SM_MIN_WIDTH 
    public isSM = () => this.width() >= SM_MIN_WIDTH && this.width() < MD_MIN_WIDTH
    public isMD = () => this.width() >= MD_MIN_WIDTH && this.width() < LG_MIN_WIDTH
    public isLG = () => this.width() >= LG_MIN_WIDTH && this.width() < XL_MIN_WIDTH
    public isXL = () => this.width() >= XL_MIN_WIDTH

    public isGreaterThanXS = () => this.width() >= SM_MIN_WIDTH
    public isGreaterThanSM = () => this.width() >= MD_MIN_WIDTH
    public isGreaterThanMD = () => this.width() >= LG_MIN_WIDTH
    public isGreaterThanLG = () => this.width() >= XL_MIN_WIDTH

    public isGreaterOrEqualThanSM = () => this.width() >= SM_MIN_WIDTH
    public isGreaterOrEqualThanMD = () => this.width() >= MD_MIN_WIDTH
    public isGreaterOrEqualThanLG = () => this.width() >= LG_MIN_WIDTH
    
    public isLowerThanSM = () => this.width() < SM_MIN_WIDTH
    public isLowerThanMD = () => this.width() < MD_MIN_WIDTH
    public isLowerThanLG = () => this.width() < LG_MIN_WIDTH
    public isLowerThanXL = () => this.width() < XL_MIN_WIDTH
}
```

Methods: 
- get = (): Object | Array
- set = (state: Object | Array )
- run = (action: (newState: any) => void): Object | Array
- toPlain = (): any
- isArray = (): boolean


## State

```
import { State } from 'react-ascey'
import { Window } from '../models'

const DEFAULT_STATE = {
    window: {
        width: window.innerWidth, 
        height: window.innerHeight,
    }
}

class UIState extends State {

    //Should be implemented in every state class
    public new = (initial = DEFAULT_STATE): UIState => new UIState(initial)

    constructor(initial = DEFAULT_STATE){
        super({
            window: new Window(initial.window)
        }, 'ui')
    }

    public setWindow = (window: any) => {
        this.run((state) => state.window = window)
    }
    
    public getWindow(): Window => this.get().window
}

export default new UIState(DEFAULT_STATE)
```

Same methods than Model + :
- storeKey = (): string
- defaultState = (): any


## Controller

```
import { Controller } from 'react-ascey'
import { UIState } from '../states'

class UIController extends Controller {

    constructor(stateClass: any){
        super(stateClass)
    }

    updateWindow = (window = {width: 0, height: 0}) => {
       this.dispatch( 
          (state: any) => state.setWindow(window) 
       )
    }
}

export default new UIController(UIState)
```

Methods: 
- getAttachedStateClass = ()
- state = ()
- store = ()
- storeObject = (): any
- stateObject = (): any
- dispatch = (action: (state: State) => any)
- extendLocal = (): any
- extend = (store: any): any



## Create the store

```
import { createStore, bindStates } from 'react-ascey'
import { UIState } from '../states'

export default createStore(bindStates([UIState]))
```

## Wrap with Ascey

```
import store from './ascey/store';
import { Provider } from 'react-ascey';

const App = () => {
    return (
        <Provider store={store}>
          <Index />
        </Provider>
    )
}
```

## Connect with your component
```
import { connect } from 'react-ascey'
import { UIController } from '../ascey/controllers'
import $ from 'jquery'

const Index = (props) => {

  const onWindowUpdate = () => {
    $( window ).resize( function(){
      const width = $(window).width()
      const height = $(window).height()
      UIController.updateWindow({width, height})
    });
  }

  useEffect(() => {
    onWindowUpdate()
  }, [])

  return (
    <div>
      width: {this.props.window.width()}
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        window: UIController.extend(state).window
    }
}

export default connect(mapStateToProps)(Index)
```


