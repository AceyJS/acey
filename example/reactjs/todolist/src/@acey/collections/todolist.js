import { Collection } from 'acey'
import TodoModel from '../models/todo'

class TodoCollection extends Collection {

    constructor(initialState = [], options){
        super(initialState, TodoModel, options)
    }

    sortByCreationDate = () => new TodoCollection(this.orderBy(['created_at'], ['desc']), this.__childOptions)
}

export default TodoCollection
