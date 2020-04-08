import React from 'react';
import './App.css';
import _ from 'lodash'

import CounterController from './ascey/controllers/counter'
import { connect } from 'react-ascey'

function App(props: any) {
  const {
    counter
  } = props

  /* 
    You can call your Controller's methods everywhere in your app; 
    contrary to Redux, you don't have to bind your actions.
  */
  return (
    <div className="App">
      <button onClick={CounterController.decrement}>decrement</button>
      {counter.getCounter()}
      <button onClick={CounterController.increment}>increment</button>
    </div>
  );
}

/* 
  Same working system than redux, you need to select the data 
  you want to pick up from your states
*/

const mapStateToProps = () => {
  return {
    /* Get the instanced Model/Collection bound with the controller. */
    counter: CounterController.getState()
  }
}

/* Connect the component with Ascey. */ 
export default connect(mapStateToProps)(App)
