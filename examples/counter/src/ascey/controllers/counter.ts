import { Controller } from 'react-ascey'
/* 1. We import the Counter Model */
import CounterModel from '../models/counter'

/* 2. Let's prototype our Counter Controller */
class CounterController extends Controller {

    /* 3. A Controller is built from a Model/Collection class */
    constructor(){
        /* 
            The Controller requires 2 parameters:
            1. The Model/Collection class bound with the controller
            2. A unique key to identify the controller. 
        */
        super(CounterModel, 'counter')
    }

    /* 

        `dispatch` is a native method from Controller.
        
        It takes a callback parameter with the instanced Model/Collection
        bound with it's class.
        
        At the end of the execution of the callback function, 
        the instanced Model will be dispatched to the store.

    */

    increment = () => {
        this.dispatch((counter: CounterModel) => {
            counter.setCounter(counter.getCounter() + 1)
        })
    }

    decrement = () => {
        this.dispatch((counter: CounterModel) => {
            counter.setCounter(counter.getCounter() - 1)
        })
    }
}

/*
    4. We export from our counter.ts file the instanced 
       Controller initialized with CounterModel
*/
export default new CounterController()

