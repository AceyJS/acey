import { createStore, bindControllers } from 'react-ascey'
import TodoController from '../ascey/controllers/todo'

export default createStore(bindControllers([
    TodoController
]))