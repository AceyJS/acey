import { Controller } from 'react-ascey'
import TodoState from '../states/todo'
import TodoModel from '../models/todo'

class TodoController extends Controller {

    constructor(todoState: any){
        super(todoState, 'todo')
    }

    createTodo = (content: string): TodoModel => {        
        const todo = new TodoModel({
            content,
            created_at: new Date()
        })
        
        this.dispatch((state: TodoState) => {
            state.getTodolist().push(todo)
        })
        return todo
    }

    deleteTodo = (index: number): TodoModel => {
        let v: any;
        this.dispatch((state: TodoState) => {
            v = state.getTodolist().deleteIndex(index)
        })
        return v
    }

}

export default new TodoController(TodoState)