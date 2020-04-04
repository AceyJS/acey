import { State } from 'react-ascey'
/*
    1. Let's create a default data object for our state
   /!\ Must always be an object. /!\
*/
const DEFAULT_DATA = {
    counter: 0
}
/* 
    2. Let's prototype our counter state class extending 
       it with State 
*/
class CounterState extends State {
    /* 3. A State is built from an object of data */
    constructor(data = DEFAULT_DATA){
        super(data)
    }

    increment = () => {
        this.setState({ counter: this.getCounter() + 1 })
     }
     
     decrement = () => {
        this.setState({ counter: this.getCounter() - 1 })
     }
     
     getCounter = () => this.get().counter

}


export default CounterState