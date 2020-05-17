import React from 'react';
import { Model, config, useAcey } from 'acey'
config.done()

class CounterModel extends Model {

  constructor(data: any, options: any){
    super(data, options)
  }

  get = () => this.state.counter
  incremente = () => this.setState({counter: this.get() + 1}).save().localStore()
  decremente = () => this.setState({counter: this.get() - 1}).save().localStore()
}

const Counter = new CounterModel({counter: 0}, {connected: true, key: 'counter'})

function App() {

  useAcey([
    Counter
  ])

  return (
    <div>
      <button onClick={Counter.decremente}>decrement</button>
      {Counter.get()}
      <button onClick={Counter.incremente}>increment</button>
    </div>
  );
}

export default App;
