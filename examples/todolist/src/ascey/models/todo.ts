import { Model } from 'react-ascey'

const DEFAULT_DATA = {
    content: '',
    created_at: new Date()
}


class TodoModel extends Model {

    constructor(todo = DEFAULT_DATA){
        super(todo)
    }

    getContent = () => this.get().content
    getCreatedAt = () => this.get().created_at
}

export default TodoModel