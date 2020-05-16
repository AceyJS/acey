import { Model } from 'acey'
import Counter from './counter'

const DEFAULT_DATA ={
    content: '',
    id: 0,
    counter: {
        counter: 0
    }
}

class Todo extends Model {

    constructor(data = DEFAULT_DATA, options: any){
        super(data, options)
        this.setState({
            counter: new Counter(data.counter, this.__childOptions)
        })
    }

    counter = () => this.state.counter
    content = () => this.state.content
    ID = () => this.state.id
}

export default Todo