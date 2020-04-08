import { Model } from 'react-ascey'

/*
    1. Let's create a default state object for our state
   /!\ It must always be an object. /!\
*/
const DEFAULT_STATE = {
    counter: 0
}

/* 2. Let's prototype our Counter Model */
class CounterModel extends Model {

    constructor(state = DEFAULT_STATE){
        super(state)
    }
    
    /* 
        We create a getter and a setter for the counter variable 
        `get` : return the state of our Model
        `setState` : update the Model state by assigning it with the object passed in parameter (like React)
    */ 
    getCounter = () => this.get().counter
    setCounter = (counter: number) => this.setState({counter})
}

export default CounterModel