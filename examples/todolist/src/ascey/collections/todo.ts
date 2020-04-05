import _ from 'lodash'
import { Collection } from 'react-ascey'
import TodoModel from '../models/todo'

class TodoCollection extends Collection {

    constructor(list: any = []){
        super(list, TodoModel)
    }

    // sortByContent = (sortType: string = 'asc' || 'desc') => {
    //     return new TodoCollection(
    //         this.orderBy(['content'], [sortType])
    //     )
    // }
    sortByCreateDate = (sortType: any = 'asc' || 'desc') => {
        /*
            - orderBy sort the list by data and return an array
            of model.
            - We return a fresh instance of a collection with the array
            returned by orderBy
        */
        return new TodoCollection(
            this.orderBy(['created_at'], [sortType])
        )
    }
}

export default TodoCollection