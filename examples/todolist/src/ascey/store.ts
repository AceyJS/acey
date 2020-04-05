import { createStore, bindControllers } from 'react-ascey'
import TodoController from './controllers/todo'

export default createStore(bindControllers([
    TodoController
]))