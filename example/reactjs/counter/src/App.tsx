import React from 'react';
import { Model, config, useAcey } from 'acey'
/* Set the Acey configuration done, once, at the entry point of the project. */
config.done()

/* STEP 1: Let's create a model to handle the counter state */
class CounterModel extends Model {

  constructor(initialState: any, options: any){
    super(initialState, options)
  }

  /*  STEP 2: Add a getter for the counter number */
  get = () => this.state.counter
  
  /* 
      STEP 3: Add incrementer/decrementer actions to update the counter's state
      _________________________________________________________________________
      
        setState:     works like setState in React Class Components, 
                      it updates the current state of the Model
                
        save:         dispatch the new state to the store and re-render 
                      all the components bound with the Model
                
        localStore:   Store the Model's state in the localStore. (OPTION)
                      i) The default Model state at the next app load is going 
                         to be the last state stored.
  */
  increment = () => this.setState({counter: this.get() + 1}).save().localStore()
  decrement = () => this.setState({counter: this.get() - 1}).save().localStore()
}

/* 
   STEP 4: Instance the Counter Model, and define it as `connected Model 
           with the Acey Store` 
   
   i) connected Model have the ability to re-render the components they are bound with
      when their state change.
*/
const Counter = new CounterModel({counter: 0}, {connected: true, key: 'counter'})


function App() {

  /* STEP 5: Bind the Counter Model with the App components. */
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
