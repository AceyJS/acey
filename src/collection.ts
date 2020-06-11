import _ from 'lodash'
import Model, {IAction}  from './model'
import Errors from './errors'


type Constructor<T> = new(...args: any[]) => T;

//  i) this class can be improved by adding more than you can usually find in lists.
//It aims to be the parent of any model class representing a list of object/classes
//for example in a todolist it would be the parent of the TodoList class containing a list of Todos
//This can be useful to avoid redundant functions like sorting, filtering, pushing, deleting, updating etc...

export default class Collection extends Model  {
    private nodeModel: Constructor<any>

    constructor(list: any[] = [], nodeModel: Constructor<Model>, ...props: any){
        super([], ...Collection.assignInternalOptions(props, nodeModel))
        this.nodeModel = nodeModel

        //check if nodeModel is a collection
        if (new (this._getNodeModel())(undefined, this.option().kids()) instanceof Collection){
            throw Errors.forbiddenMultiDimCollection()
        }

        const assignWithStorage = async () => {
            if (!this.is().connected() || (!this.cookie().get() && !(await this.localStore().get()))){
                this.setState(this.toListClass(list))
            }
        }
        assignWithStorage()
    }

    static assignInternalOptions = (options: any[], nodeModel: Constructor<Model>) => {
        if (options[1]){
            options[1] = { nodeModel: nodeModel}
        } else {
            options.push({nodeModel: nodeModel})
        }
        return options
    }

    //Return the number of element in the array
    public count = (): number => this.state.length

    //add an element to the list
    public push = (v: any): IAction => this.action(this.state.push(this.newNode(v)))

    // Update the element at index or post it.
    public update = (v: any, index: number): IAction => {
        const vCopy = this.newNode(v)
        
        if (this.state[index])
           this.state[index] = vCopy
       else 
           this.push(vCopy)
       
       return this.action(vCopy)
    }

    //return a sorted array upon the parameters passed. see: https://lodash.com/docs/4.17.15#orderBy
    public orderBy = (iteratees: any[] = [], orders: any[] = []): any[] => {
        const list = _.orderBy(this.toPlain(), iteratees, orders)
        const ret = []
        for (let elem of list){
            const m = this.find(elem)
            m && ret.push(m)
        }
        return ret
    }

    public map = (callback: (v: any, index: number) => any) => { 
        const array = this.state
        let ret = []
        for (let i = 0; i < array.length; i++){
            const v = callback(array[i], i)
            v && ret.push(v)
        }
        return ret
    }

    public reduce = (callback: (accumulator: any, currentValue: any) => any, initialAccumulator: any = this.count() ? this.nodeAt(0) : null) => {
        const array = this.state
        for (let i = 0; i < array.length; i++)
            initialAccumulator = callback(initialAccumulator, array[i])
        return initialAccumulator
    }

    public concat = (list: any[] = []): IAction => {
        this.setState(this.state.concat(this.toListClass(list)))
        return this.action(null)
    }

    public reverse = (): IAction => this.action(this.state.reverse())
    public pop = (): IAction => this.action(this.state.pop())
    public shift = (): IAction => this.action(this.state.shift())

    //pick up a list of node matching the predicate. see: https://lodash.com/docs/4.17.15#filter
    public filter = (predicate: any) => {
        const list = _.filter(this.toPlain(), predicate)
        const ret = []
        for (let elem of list){
            const m = this.find(elem)
            m && ret.push(m)
        }
        return ret
    }
    
    //find the first node matching the predicate see: https://lodash.com/docs/4.17.15#find
    public find = (predicate: any) => {
        const o = _.find(this.toPlain(), predicate)
        if (o){
            const index = this.findIndex(o)
            return index < 0 ? undefined : this.state[index]
        }
        return undefined
    }

    //return the index of the first element found matching the predicate. see https://lodash.com/docs/4.17.15#findIndex
    public findIndex = (predicate: any): number => _.findIndex(this.toPlain(), predicate)

    //delete all the nodes matching the predicate. see https://lodash.com/docs/4.17.15#remove
    public deleteAll = (predicate: any): IAction => {
        return this.action(this.toListClass(_.remove(this.toPlain(), predicate)))
    }

    //delete a node if it exists in the list.
    public delete = (v: any): IAction => {
        const index = this.indexOf(this.newNode(v))
        if (index > -1){
            const v = this.state.splice(index, 1)
            if (v)
                return this.action(v[0])
        }
        return this.action()
    }

    public deleteIndex = (index: number): IAction => {
        const v = this.state.splice(index, 1)
        return this.action(v ? v[0] : null)
    }

    public nodeAt = (index: number) => this.state[index] && this._isNodeModel(this.state[index]) ? this.state[index] : undefined

    //return the index of the element passed in parameters if it exists in the list.
    public indexOf = (v: any): number => _.findIndex(this.toPlain(), this.newNode(v).toPlain())

    public newNode = (v: any): Model => this._isNodeModel(v) ? v : new (this._getNodeModel())(v, this.option().kids())

    private _isNodeModel = (value: any): boolean => value instanceof this._getNodeModel()
    private _getNodeModel = () => this.nodeModel
}