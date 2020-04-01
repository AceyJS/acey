import React from 'react';
import './App.css';

import CounterController from './ascey/controllers/counter'
import { connect } from 'react-ascey'

function App(props: any) {

  /* 
    You can call your Controller's methods everywhere in your app; 
    contrary to Redux, you don't have to bind them.
  */
  const onClickDecrement = () => {
    CounterController.updateCounter(false)
  }
  const onClickIncrement = () => {
    CounterController.updateCounter(true)
  }

  return (
    <div className="App">
      <button onClick={onClickDecrement}>decrement</button>
      {props.counter}
      <button onClick={onClickIncrement}>increment</button>
    </div>
  );
}

/* 
  Same working system than redux, you need to select the data you want to pick up
  from your store, add them in the return object.

*/ 
const mapStateToProps = (storeObject: Object) => {
  return {
      /*
        The extend method is native from the Controller class.
        This methods pick up in the whole state, the right object and then transform 
        it into the instanced State class, bound with the Controller called from.
      */
      counter: CounterController.extend(storeObject).getCounter()
  }
}

/* Connect the component with Ascey. */ 
export default connect(mapStateToProps)(App)
