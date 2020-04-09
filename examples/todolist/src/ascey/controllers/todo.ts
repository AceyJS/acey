import { Controller } from 'react-ascey'
import TodoCollection from '../collections/todo'
import TodoModel from '../models/todo'


class TodoController extends Controller {

    constructor(){
        super(TodoCollection, 'todolist')
    }

    addTodo = (content: string) => {
        const t = new TodoModel({
            content,
            created_at: new Date()
        })
        this.dispatch((collection: TodoCollection) => {
            collection.push(t)
        })
        return t
    }

    removeTodo = (todo: TodoModel) => {
        this.dispatch((collection: TodoCollection) => {
            collection.delete(todo)
        })
    }



}

export default new TodoController()
