import { Model, useAcey} from 'acey'

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
      
        setState: works like setState in React Class Components, 
                  it updates the current state of the Model
                
        save:     dispatch the new state to the store and re-render 
                  all the components bound with the Model
                
        cookie:   Store the Model's state in the cookies. (OPTION)
  */
  increment = () => this.setState({counter: this.get() + 1}).save().cookie()
  decrement = () => this.setState({counter: this.get() - 1}).save().cookie()
}

/* 
   STEP 4: Instance the Counter Model, and define it as `connected Model 
           with the Acey Store` 
   
   i) connected Model have the ability to re-render the components they are bound with
      when their state change.
*/
const Counter = new CounterModel({counter: 0}, {connected: true, key: 'counter'})

export default function Home() {

  /* STEP 5: Bind the Counter Model with the App components. */
  useAcey([ Counter ])

  return (
    <div>
      <button onClick={Counter.decrement}>decrement</button>
      {Counter.get()}
      <button onClick={Counter.increment}>increment</button>
    </div>
  )
}

/* 
    STEP 6: We set the counter state at 10 before being executed on the client. 
    i) It's going to be displayed at 10 on the client.
*/
Home.getInitialProps = ({ query }) => {
  Counter.setState({counter: 10}).save()
}
