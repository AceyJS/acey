import { Controller, State } from 'react-ascey'

/* 1. We import the instanced Counter State */
import CounterState from '../states/counter'

/* 2. Let's prototype our counter controller class extending it with Controller */
class CounterController extends Controller {
    
    /* 
        3. A Controller is built from an instanced State
    */
    constructor(stateClass: State){
        super(stateClass)
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
            (state: any) => {
                isIncrementing ? state.increment() : state.decrement()
            }
        )
    }

}

/* 
    4. We export from our counter.ts file the instanced Controller initialized 
    with the instanced State
*/
export default new CounterController(CounterState)

