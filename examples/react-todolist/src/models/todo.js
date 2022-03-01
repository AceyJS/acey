import { Collection, Model } from 'acey'
import moment from 'moment'

const DEFAULT_STATE = {
    id: '',
    content: '',
    created_at: new Date()
}

export class TodoModel extends Model {

    constructor(initialState = DEFAULT_STATE, options){
        super(initialState, options)
    }

    ID = () => this.state.id
    content = () => this.state.content
    createdAt = () => this.state.created_at

    formatedCreationDate = () => moment(this.createdAt()).format("LL");
    updateContent = (content) => this.setState({content}).save().store()
}

export class TodoCollection extends Collection {

    constructor(initialState = [], options){
        super(initialState, [TodoModel, TodoCollection], options)
    }

    create = (content) => {
        this.push({
            id: Math.random().toString(), 
            content,
            created_at: new Date()
        }).save().store()
    }

    sortByCreationDate = () => this.orderBy(['created_at'], ['desc'])
}