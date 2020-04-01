import { State } from 'react-ascey'

/* 
    1. Let's create a default data object for our state 
    /!\ Must always be an object. /!\
*/
const DEFAULT_DATA = {
    counter: 0
}

/* 2. Let's prototype our counter state class extending it with State */
class CounterState extends State {

    /* 3. A State is built from an object of data */
    constructor(data = DEFAULT_DATA){
        /* 4. The parent (State) is built from the data and an uniq string key identyfing it */ 
        super(data, 'counter')
    }

    /* 
        5. This method is the only boilerplate of a State.
        It is used in the background of the Controller to generate a new fresh State each time 
        the Ascey Store is updated in order to deliver an update in your components.
        ----
        This function is just taking the same parameter than the constructor 
        and return a new instanced State with it.
    */
    new = (data = DEFAULT_DATA) => new CounterState(data)

    increment = () => this.get().counter++
    decrement = () => this.get().counter--
    getCounter = () => this.get().counter
}

/* 
    6. We export from our counter.ts file the instanced State initialized 
    with the default data. 
*/
export default new CounterState(DEFAULT_DATA)