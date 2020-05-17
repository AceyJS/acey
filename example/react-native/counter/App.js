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
config.setStoreEngine(AsyncStorage)
config.done()

class CounterModel extends Model {

  constructor(data, options){
    super(data, options)
  }

  get = () => this.state.counter
  increment = () => this.setState({counter: this.get() + 1}).save()
  decrement = () => this.setState({counter: this.get() - 1}).save()
}

const Counter = new CounterModel({counter: 0}, {connected: true, key: 'counter'})


const App = () => {

  useAcey([
    Counter
  ])

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
