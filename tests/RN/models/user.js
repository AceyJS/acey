import { Model } from 'acey'
import Counter from './counter'
import Todolist from './todolist'

const DEFAULT_DATA = {
    first_name: '',
    counter: 0
}

class User extends Model {

    constructor(data = DEFAULT_DATA, options){
        super(data, options)
        this.setState({
            counter: new Counter({counter: data.counter}, this.__childOptions),
            todolist: new Todolist([], this.__childOptions), 
        }).save()
    }

    counter = () => this.state.counter
    todolist = () => this.state.todolist
    firstName = () => this.state.first_name
}

export default User