
https://i.ibb.co/ZYGcvCs/ascey.png
<p align="center">
  <a href="https://rnds.netlify.com/">
    <img alt="react-ascey" src="https://i.ibb.co/ZYGcvCs/ascey.png" width="500">
  </a>
</p>

<p align="center">
  <h1 align="center">React Ascey</h1>
  <p align="center">Increase your productivity and the scalability of your medium and large React apps.</p>
</p>

Redux MVC is a new way to handle the redux store of your app by removing most of the boiler plate and useless redundant code.
Redux MVC removes the actions, their types, and the reducers.
It also removes redundant data formatting, checking, and selecting functions treating your datas.
And removes a lot of line of codes from the components and containers


## How does it work ?

### 1. Objects are replaced with Model.
Get your code safer, cleaner by centralizing everything concerning your data at the same place. Don't create another util function to sort your message list, don't create another selectors function, don't spoil your app architecture.
A new kind of object to handle ? Just create a new Model.

e.g Example of class concerning the User data
```
class UserModel extends Model {
    constructor(u = {id: 123, name: 'Paul', token: 'b615f293-225e-47cd-bae5-e37f94206bc7'} ){
        super(u)
    }

    getID = () => this.get().id
    getName = () => this.get().name
    getToken = () => this.get().token
	
    //use the run function to deeply update your models
    setName = (name) => this.run((state) => state.name = name)
}

export default UserModel
```
#### The model object is instanciable with an object data or an array.
This object/array can only contain these types of data: 
`string, number, array, object, Model, null, undefined, NaN.`
Everything else is not supported by Model (including Date) because of the function toPlain converting a Model into a plain object/array. (When reversing the data it currently can't guess if you want your date under string format, number or Date. This can be improved, pull requests are very welcome.)
So for example if you want to write any instancied Date inside your model or any others instancied Object, please convert it into the allowed data types. 

[More about the Model class](https://github.com/Fantasim/redux-mvc/blob/master/src/model.ts)



### 2. Reducers are replaced with States
#### ? - The State class is children of Model, so it has and works with all the Model methods. 

You don't create anymore a function containing an unending switch case.

A State is a class initialized with a default state as you were used to do with reducer.
In this State class, you can directly creates the method you need to interact with your state (write/read or setter/getter)

e.g: Example of State class concerning the Users data

```
class UserState extends State {

    //Must be implemented in every state class
    public new = (userState: any): UserState => new UserState(userState)

    constructor(state: any){
        super({ 
            user: new UserModel(state.user) 
        }, 'user')
    }
    
    updateName = (name) => this.run((state) => state.user.setName(name)) 
    getUser = () => this.get().user //return the UserModel
}

export default new UserState({user: {id: 123, name: 'Paul', token: 'b615f293-225e-47cd-bae5-e37f94206bc7'}})
```

[More about the State class](https://github.com/Fantasim/redux-mvc/blob/master/src/state.ts)



### 3. Actions are replaced with Controllers
? - The Controller class is children of Model, so it has and works with all the Model methods.


Controller is definitely the most interesting part of the library as current redux user.

Because with it replacing actions, you don't need anymore to :

- Create a new type, import it in your reducer, and add another line your switch case function.
- Dispatch a data and catch in your reducer to update your state then
- To create a secondary type to handle the result(s) got through your actions.
- To bind your actions with your component through connect.

You want to create a new action ? Just add a method to your controller
You want to call an action ? just call it from anywhere in your app, no binding required.
You want to update your state ? Just update it like the example below
You want to handle the result from your action ? just return it at the end of your function and handle it where your action is called.

```
import UserState from '../states/user'

class UserController extends Controller {
    constructor(stateClass: any){
        super(stateClass)
    }
    
    //your methods can be asynchrone.
    updateName = (newName: string) => {
    	const formatedName = formatName(newName)
	if (formatedName.length < 30){
	   this.dispatch((state) => state.updateName(formatedName))
	   return
	}
	return new Error("new name is too long")
    }   
}

//You need to bind your controller with the attached state.
export default UserController(UserState)
```

[More about the Controller class](https://github.com/Fantasim/redux-mvc/blob/master/src/controller.ts)

#### 4. Connect with components
on the component side almost nothing excepted the way mapStateToProps is handled.

Here is a component.
```
import React from 'react';
import { connect } from 'redux-mvc'
import UserController from '../redux/controllers/user'

const Main = (props) => {
    const { user } = props
    const { updateName } = UserController

    onClick = (e) => {
       const error = updateName( 'Brian' )
       error ? alert(error) : alert('success')
    }

    return (
        <div>
	   <span>{user.getName()}</span>
           <button onClick={onClick} type="button">Update Name</button>
        </div>
    )
}

const mapStateToProps = (state) => {
   return {
      /*
      The extend methods is native from the Controller class.
      This methods pick up in the whole redux state, the right object and then transform 
      it into the instancied State class binded with the Controller it is called from.
      so here we call it from the user Controller, the state binded with is the User State.
      So it return the User State.
      ...then we call the getUser method to get the User Model.
      */
      user: UserController.extend(state).getUser()
   }
}

export default connect(mapStateToProps)(Main)
```

## Single file get started

```
import React from 'react';
import ReactDOM from 'react-dom';

// import store, { history } from './redux/store';
import { 
    Provider, 
    createStore,
    Model,
    State,
    connect,
    Controller,
    bindStates,
} from 'redux-mvc';

import * as serviceWorker from './serviceWorker';


//----------------- USER MODEL ----------------- //



class UserModel extends Model {
    constructor(u = {id: 123, name: 'Paul', token: 'b615f293-225e-47cd-bae5-e37f94206bc7'} ){
        super(u)
    }

    getID = () => this.get().id
    getName = () => this.get().name
    getToken = () => this.get().token
	
    //use the run function to deeply update your models
    setName = (name: string) => this.run((state) => state.name = name)
}


//----------------- USER STATE ----------------- //


class UserState extends State {

    //Must be implemented in every state class
    public new = (userState: any): UserState => new UserState(userState)

    constructor(state: any){
        super({ 
            user: new UserModel(state.user) 
        }, 'user')
    }
    
    updateName = (name: string) => this.run((state) => state.user.setName(name)) 
    getUser = () => this.get().user //return the UserModel
}

const UserStateInstancied = new UserState({user: {id: 123, name: 'Paul', token: 'b615f293-225e-47cd-bae5-e37f94206bc7'}})


//----------------- USER CONTROLLER ----------------- //

class UserController extends Controller {
    constructor(stateClass: any){
        super(stateClass)
    }
    
    updateName = (newName: string) => {
        if (newName.length < 30){
            this.dispatch((state: any) => state.updateName(newName))
            return
        }	
	    return new Error("new name is too long")
    }   
}


const UserControllerInstancied = new UserController(UserStateInstancied)

//----------------- COMPONENT ----------------- //



const Main = (props: any) => {
    const { user } = props
    const { updateName } = UserControllerInstancied

    const onClick = (e: any) => {
       const error = updateName( 'Brian' )
       error ? alert(error) : alert('success')
    }

    return (
        <div>
	        <span>{user.getName()}</span>
            <button onClick={onClick} type="button">Update Name</button>
        </div>
    )
}

const mapStateToProps = (state: any) => { 
    return {
      /*
      The extend methods is native from the Controller class.
      This methods pick up in the whole redux state, the right object and then transform 
      it into the instancied State class binded with the Controller it is called from.
      so here we call it from the user Controller, the state binded with is the User State.
      So it return the User State.
      ...then we call the getUser method to get the User Model.
      */
      user: UserControllerInstancied.extend(state).getUser(),
   }
}
/*
The list listMethods methods, native from the Controller class, just return an object with
all the methods dispatching a new state, this avoid to select them each time.
(You can manually add each method if you want to)
*/
const MainComponent = connect(mapStateToProps)(Main)



//----------------- STORE ----------------- //



const store = createStore(
	//this is initializing all the states.
	//-> the function takes 2 parameters the parameters of states in an array (here: states)
	//this second parameters has only been made to integrate react-router.
    bindStates([
        UserStateInstancied,
    ] /*, {router: connectRouter(history)}*/  ),
)

//STORE.set(store)



//----------------- APP ----------------- //



const App = () => {
    return (
        <Provider store={store}>
            <MainComponent />
        </Provider>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

[Try this example HERE](https://github.com/Fantasim/redux-mvc/tree/master/examples/single-file)
