import { Controller } from 'react-ascey'
/* 1. We import the Counter State */
import CounterState from '../states/counter'


/* 2. Let's prototype our counter controller class */
class CounterController extends Controller {

    /* 3. A Controller is built from a State class */
    constructor(counterState: any){
        /* 
            The Controller class requires 2 parameters:
            1. The state class bound with the controller
            2. An uniq key to identify the controller. 
        */
        super(counterState, 'counter')

    }

    /*
        This method triggers the counter to increase in the Ascey Store
        according to the boolean parameter.
    */
    updateCounter = (isIncrementing: boolean) => {
        /* 
            1. The dispatch method takes a callback parameter 
               sending a fresh copy of the State bound with the Controller
        
            2. Then you are free to execute the method you want from the 
                State that is going to update the data.

            3. At the end of the callback execution, the change is saved, 
               transformed into a plain javascript object, and sent to the Store.
        */
        this.dispatch(
            (state: CounterState) => {
                isIncrementing ? state.increment() : state.decrement()
            }
        )
    }
}

/*
    4. We export from our counter.ts file the instanced 
       Controller initialized with CounterState
*/
export default new CounterController(CounterState)

