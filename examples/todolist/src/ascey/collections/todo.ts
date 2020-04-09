import { Collection } from 'react-ascey'
import TodoModel from '../models/todo'

const DEFAULT_DATA = [
    {
        content: 'Hello', 
        created_at: new Date()
    },
    {
        content: 'World', 
        created_at: new Date()
    }
]


class TodoCollection extends Collection {

    constructor(list = DEFAULT_DATA){
        super(list, TodoModel)
    }

    public sortByCreateDate = (sortType = 'asc') => {
        return new TodoCollection(this.orderBy(['created_at'], [sortType]))
    }
}

export default TodoCollection