import React from 'react';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';

import { useAcey } from 'acey'
import { Counter, Todolist, User } from './models'

const STORE_TYPE = ''

const Home = (props) => {
  
  const todolists = [Todolist, User.todolist()]
  const counters = [Counter, User.counter()]

  useAcey([
    Counter,
    Todolist,
    User
  ])

  const method = (list = [], method = '', then = '' | 'coookie' | 'localStore') => {
    list.forEach((v) => {
      const ret = v[method]()
      then && ret[then]()
    })
  }
  
  const increment = (then = '' | 'coookie' | 'localStore') => {
    method(counters, 'increment', then)
    const list = []
    todolists.map((l) => l.map((t) => list.push(t.counter())))
    method(list, 'increment', then)
  }
  const decrement = (then = '' | 'coookie' | 'localStore') => {
    method(counters, 'decrement', then)
    const list = []
    todolists.map((l) => l.map((t) => list.push(t.counter())))
    method(list, 'decrement', then)
  }
  const addTodo = (then = '' | 'coookie' | 'localStore') => method(todolists, 'add', then)
  const deleteFirst = (then = '' | 'coookie' | 'localStore') => method(todolists, 'deleteFirst', then)
  const deleteLast = (then = '' | 'coookie' | 'localStore') => method(todolists, 'deleteLast', then)
  const toZZZLast = (then = '' | 'coookie' | 'localStore') => method(todolists, 'toZZZLast', then)

  const clearLocalStore = () => {
    Todolist.removeLocalStore()
    Counter.removeLocalStore()
    User.removeLocalStore()
  }

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row'}}>
        <Text>{props.id}</Text>
        <TouchableOpacity onPress={clearLocalStore} style={styles.touchable}><Text>clear local stores</Text></TouchableOpacity>
      </View>
      <Text>{'\n'}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.touchable} onPress={() => decrement(STORE_TYPE)}><Text>decrement</Text></TouchableOpacity>
        {counters.map((v, index) => <Text style={{marginLeft: 10, marginRight: 10}} key={index}>{v.get()}</Text>)}
        <TouchableOpacity style={styles.touchable} onPress={() => increment(STORE_TYPE)}><Text>increment</Text></TouchableOpacity>
        <Text>{'\n'}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.touchable} onPress={() => addTodo(STORE_TYPE)}><Text>Add element</Text></TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={() => deleteFirst(STORE_TYPE)}><Text>Del 1st element</Text></TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={() => deleteLast(STORE_TYPE)}><Text>Del last element</Text></TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={() => toZZZLast(STORE_TYPE)}><Text>ToZZ last</Text></TouchableOpacity>
      </View>
      <View>
          {todolists.map((list, index) => {
            return <View key={index}>
              <Text style={styles.title}>Todolist {index}</Text>
              {list.map((todo, index) => {
                return <View key={index} style={{flexDirection: 'row'}}>
                  <Text>{todo.content()}</Text>
                  <Text> : </Text>
                  <Text>{todo.ID()}</Text>
                  <Text> = </Text>
                  <Text style={{color: 'red'}}>{todo.counter().get()}</Text>
                </View>
              })}
            </View>
          })}
      </View>

    </SafeAreaView>
  )
}

const styles = {

  touchable: {
    margin: 5,
    padding: 5,
    borderWidth: 1
  },
  title: {
    color: 'red',
    fontSize: 21
  }
}

export default Home;
