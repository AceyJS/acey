import { Collection } from 'acey'
import Todo from './todo'

class Todolist extends Collection {

    constructor(data = [], options: any){
        super(data, Todo, options)
    }

    add = () => this.push({content: Math.random().toString(), id: Math.random()}).save()
    deleteLast = () => this.deleteIndex(this.count() - 1).save()
    deleteFirst = () => this.deleteIndex(0).save()
    toZZZLast = () => this.nodeAt(this.count() - 1).setState({content: 'ZZZ', id: 'ZZZ'}).save()
}

export default Todolist