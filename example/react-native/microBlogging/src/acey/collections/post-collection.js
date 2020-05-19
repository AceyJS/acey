import { Collection } from 'acey'
import PostModel from '../models/post'

class PostCollection extends Collection {
    constructor(initialState = [], options){
        super(initialState, PostModel, options)
    }

    sortByCreationDate = () => {
        return new PostCollection(this.orderBy(['created_at'], ['desc']), this.__childOptions)
    }


}

export default PostCollection
