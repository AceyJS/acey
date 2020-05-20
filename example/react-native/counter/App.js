/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import { config, Model, useAcey } from 'acey'
/* 
    Step 1:
      - Define the store engine (for localStorage feature) as AsyncStore 
      - Set the Acey configuration done.
      i)  All of this once at the entry point of the project
 */
config.setStoreEngine(AsyncStorage) 
config.done()

/* STEP 2: Let's create a model to handle the counter state */
class CounterModel extends Model {

  constructor(initialState: any, options: any){
    super(initialState, options)
  }

  /*  STEP 3: Add a getter for the counter number */
  get = () => this.state.counter
  
  /* 
      STEP 4: Add incrementer/decrementer actions to update the counter's state
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
   STEP 5: Instance the Counter Model, and define it as `connected Model 
           with the Acey Store` 
   
   i) connected Model have the ability to re-render the components they are bound with
      when their state change.
*/
const Counter = new CounterModel({counter: 0}, {connected: true, key: 'counter'})

const App = () => {

  /* STEP 6: Bind the Counter Model with the App components. */
  useAcey([ Counter ])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{flexDirection: 'row', margin: 50, alignItems: 'center', }}>     
          <TouchableOpacity onPress={Counter.decrement} style={styles.touchable}><Text>decrement</Text></TouchableOpacity>    
          <Text style={{margin: 10}}>{Counter.get()}</Text>
          <TouchableOpacity onPress={Counter.increment} style={styles.touchable}><Text>increment</Text></TouchableOpacity>    
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  touchable: {
    padding: 10,
    borderWidth: 1
  }
});

export default App;
