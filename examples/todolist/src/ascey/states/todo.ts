import { State } from 'react-ascey'
import TodoCollection from '../collections/todo'

const DEFAULT_DATA = {
    todolist: []
}

class TodoState extends State {

    constructor(data = DEFAULT_DATA){
        super({
            todolist: new TodoCollection(data.todolist)
        })
    }

    getTodolist = (): TodoCollection => this.get().todolist
}

export default TodoState