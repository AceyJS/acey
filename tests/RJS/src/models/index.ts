import UserModel from './user'
import TodoCollection from './todolist'
import CounterModel from './counter'

export const Counter = new CounterModel(undefined, {connected: true, key: 'counter'})
export const User = new UserModel(undefined, {connected: true, key: 'user'})
export const Todolist = new TodoCollection([], {connected: true, key: 'todolist'})