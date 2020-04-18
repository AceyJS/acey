import _ from 'lodash'
import Model, { IAction, IOptions, DEFAULT_OPTIONS} from './model'

type Constructor<T> = new(...args: any[]) => T;

interface IBounce {
    value: any
    save(): any
}

//  i) this class can be improved by adding more than you can usually find in lists.
//It aims to be the parent of any model class representing a list of object/classes
//for example in a todolist it would be the parent of the TodoList class containing a list of Todos
//This can be useful to avoid redundant functions like sorting, filtering, pushing, deleting, updating etc...

export default class Collection extends Model  {
    private nodeClass: Constructor<any>

    constructor(list: any[] = [], nodeClass: Constructor<Model>, ...props: any){
        super([], ...props)
        this.nodeClass = nodeClass
        this.setState(this.toListClass(list))
    }
    private _getBounce = (value: any): IBounce => {
        const { save } = this.options
        return {
            value,
            save: this.isConnected() ? this.setState(undefined).save : () => save ? save() : null
        }
    }

    //Return the number of element in the array
    public count = (): number => this.state.length

    /*
        Transform an array of object into an array of instancied Model
        Exemple => 
        [{content: '123', id: 'abc'}, {content: '456', id: 'def'}]
        to
        [new Model(content: '123', id: 'abc'}), new Model({content: '456', id: 'def'})]
        the class used to instance the objects is the one passed in parameters as nodeClass in the constructor.

    */
    public toListClass = (elem: any[] = []): Model[] => {
        let ret: Model[] = []
        for (let i = 0; i < elem.length; i++){
            if (!this._isNodeModel(elem[i]))
                ret.push(new (this._getNodeModel())(elem[i]))
            else 
                ret.push(elem[i])
            
        }
        return ret
    }

    //add an element to the list
    public push = (v: Model): IBounce => this._getBounce(this.state.push(v))

    // Update the element at index or post it.
    public update = (v: Model, index: number): IBounce => {
       if (this.state[index])
           this.state[index] = v
       else 
           this.push(v)
       
       return this._getBounce(v)
    }

    //return a sorted array upon the parameters passed. see: https://lodash.com/docs/4.17.15#orderBy
    public orderBy = (iteratees: any[] = [], orders: any[] = []): any[] => {
        const ret = _.orderBy(this.toPlain(), iteratees, orders)
        return this.toListClass(ret)
    }

    public map = (callback: (v: Model, index: number) => any) => { 
        const array = this.state
        let ret = []
        for (let i = 0; i < array.length; i++){
            const v = callback(array[i], i)
            v && ret.push(v)
        }
        return ret
    }

    public concat = (list: any[] = []): IBounce => {
        this.setState(this.state.concat(this.toListClass(list)))
        return this._getBounce(null)
    }

    public reverse = (): IBounce => this._getBounce(this.state.reverse())
    public pop = (): IBounce => this._getBounce(this.state.pop())
    public shift = (): IBounce => this._getBounce(this.state.shift())

    //pick up a list of node matching the predicate. see: https://lodash.com/docs/4.17.15#filter
    public filter = (predicate: any) => this.toListClass(_.filter(this.toPlain(), predicate))
    
    //find the first node matching the predicate see: https://lodash.com/docs/4.17.15#find
    public find = (predicate: any) => {
        const o = _.find(this.toPlain(), predicate)
        return o ? new (this._getNodeModel())(o) : o
    }

    //return the index of the first element found matching the predicate. see https://lodash.com/docs/4.17.15#findIndex
    public findIndex = (predicate: any): number => _.findIndex(this.toPlain(), predicate)

    //delete all the nodes matching the predicate. see https://lodash.com/docs/4.17.15#remove
    public deleteAll = (predicate: any): IBounce => {
        return this._getBounce(this.toListClass(_.remove(this.toPlain(), predicate)))
    }

    //delete a node if it exists in the list.
    public delete = (v: Model): IBounce => {
        const index = this.indexOf(v)
        if (index > -1){
            const v = this.state.splice(index, 1)
            if (v)
                return this._getBounce(v[0])
        }
        return this._getBounce(null)
    }

    public deleteIndex = (index: number): IBounce => {
        const v = this.state.splice(index, 1)
        return this._getBounce(v ? v[0] : null)
    }

    //return the index of the element passed in parameters if it exists in the list.
    public indexOf = (v: Model): number => _.findIndex(this.toPlain(), v.state)

    private _isNodeModel = (value: any) => value instanceof this._getNodeModel()
    private _getNodeModel = () => this.nodeClass
}