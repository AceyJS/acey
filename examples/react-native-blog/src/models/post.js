import { Model, Collection } from 'acey'
import moment from 'moment'

const DEFAULT_STATE = {
    id: '',
    content: '',
    created_at: new Date()
}

export class PostModel extends Model {

    constructor(initialState = DEFAULT_STATE, options){
        super(initialState, options)
    }

    ID = () => this.state.id
    content = () => this.state.content
    createdAt = () => new Date(this.state.created_at)
    formatedCreationDate = () => moment(this.createdAt()).format("MMM Do");

    updateContent = (content) => this.setState({content}).save().store()
}

export class PostCollection extends Collection {
    constructor(initialState = [], options){
        super(initialState, [PostModel, PostCollection], options)
    }

    sortByCreationDate = () => this.orderBy(['created_at'], ['desc'])
}