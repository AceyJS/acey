import React from 'react';
import './App.css';
import _ from 'lodash'

import CounterController from './ascey/controllers/counter'
import { connect } from 'react-ascey'

function App(props: any) {

  /* 
    You can call your Controller's methods everywhere in your app; 
    contrary to Redux, you don't have to bind your actions.
  */
  const onClickDecrement = () => CounterController.updateCounter(false)
  const onClickIncrement = () => CounterController.updateCounter(true)

  return (
    <div className="App">
      <button onClick={onClickDecrement}>decrement</button>
      {props.counter.getCounter()}
      <button onClick={onClickIncrement}>increment</button>
    </div>
  );
}

/* 
  Same working system than redux, you need to select the data 
  you want to pick up from your states
*/

const mapStateToProps = () => {
  return {
    /* get the instanced state bound with the controller. */
    counter: CounterController.getState()
  }
}

/* Connect the component with Ascey. */ 
export default connect(mapStateToProps)(App)
