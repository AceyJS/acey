import { Collection } from 'acey'
import TodoModel from '../models/todo'

class TodoCollection extends Collection {

    constructor(initialState = [], options){
        super(initialState, [TodoModel, TodoCollection], options)
    }

    sortByCreationDate = () => this.orderBy(['created_at'], ['desc'])
}

export default TodoCollection
