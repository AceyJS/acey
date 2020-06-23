import _ from 'lodash'
import Model, {IAction}  from './model'
import Errors from './errors'


type Constructor<T> = new(...args: any[]) => T;

//  i) this class can be improved by adding more than you can usually find in lists.
//It aims to be the parent of any model class representing a list of object/classes
//for example in a todolist it would be the parent of the TodoList class containing a list of Todos
//This can be useful to avoid redundant functions like sorting, filtering, pushing, deleting, updating etc...

export default class Collection extends Model  {
    
    constructor(list: any[] = [], models: [Constructor<Model>, Constructor<Collection>], ...props: any){
        super([], Object.assign({}, ...props, { nodeModel: models[0], collectionModel: models[1] }))
        this._setDefaultState(list)

        //check if nodeModel is not a Collection
        if (this._newNodeModelInstance(undefined) instanceof Collection)
            throw Errors.forbiddenMultiDimCollection()
        
        const assignWithStorage = async () => {
            if (!this.is().connected() || (!this.cookie().get() && !(await this.localStore().get()))){
                this.setState(this.toListClass(list))
            }
        }

        assignWithStorage()
    }
    
    public concat = (list: any[] = []) => this._newCollectionModelInstance(this.state.slice().concat(this.toListClass(list)))
    
    //Return the number of element in the array
    public count = (): number => this.state.length

    public defaultNodeState = () => this._newNodeModelInstance(undefined).defaultState

    //delete a node if it exists in the list.
    public delete = (v: any): IAction => {
        const index = this.indexOf(this.newNode(v))
        const list = this.state.slice()
        if (index > -1){
            const v = list.splice(index, 1)
            if (!!v.length){
                this.setState(list)
                return this.action(v[0])
            }
        }
        return this.action()
    }

    //delete all the nodes matching the predicate. see https://lodash.com/docs/4.17.15#remove
    public deleteBy = (predicate: any): IAction => {
        const statePlain = this.toPlain()
        const e = _.remove(statePlain, predicate)
        !!e.length && this.setState(this.toListClass(statePlain))
        return this.action()
    }

    public deleteIndex = (index: number): IAction => {
        const { value } = this.splice(index, 1)
        return this.action(!!value.length ? value[0] : undefined)
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

    //pick up a list of node matching the predicate. see: https://lodash.com/docs/4.17.15#filter
    public filter = (predicate: any) => {
        const list = _.filter(this.toPlain(), predicate)
        const ret = []
        for (let elem of list){
            const m = this.find(elem)
            m && ret.push(m)
        }
        return this._newCollectionModelInstance(ret)
    }

    //return the index of the element passed in parameters if it exists in the list.
    public indexOf = (v: any): number => _.findIndex(this.toPlain(), this.newNode(v).toPlain())

    public limit = (limit: number) => this.slice(0, limit)

    public map = (callback: (v: any, index: number) => any) => { 
        const array = this.state
        let ret = []
        for (let i = 0; i < array.length; i++){
            const v = callback(array[i], i)
            v && ret.push(v)
        }
        return ret
    }

    public newCollection = (v: any): Collection => this._isCollectionModel(v) ? v : this._newCollectionModelInstance(v)
    public newNode = (v: any): Model => this._isNodeModel(v) ? v : this._newNodeModelInstance(v)
    
    public nodeAt = (index: number) => this.state[index] && this._isNodeModel(this.state[index]) ? this.state[index] : undefined

    public offset = (offset: number) => this.slice(offset)

    //return a sorted array upon the parameters passed. see: https://lodash.com/docs/4.17.15#orderBy
    public orderBy = (iteratees: any[] = [], orders: any[] = []): any[] => {
        const list = _.orderBy(this.toPlain(), iteratees, orders)
        const ret = []
        for (let elem of list){
            const m = this.find(elem)
            m && ret.push(m)
        }
        return this._newCollectionModelInstance(ret)
    }

    public pop = (): IAction => {
        const list = this.state.slice()
        const poped = list.pop()
        poped && this.setState(list)
        return this.action(poped)
    }
    //add an element to the list
    public push = (v: any): IAction => {
        const list = this.state.slice()
        const n = list.push(this.newNode(v))
        n && this.setState(list)
        return this.action(n)
    }

    public reduce = (callback: (accumulator: any, currentValue: any) => any, initialAccumulator: any = this.count() ? this.nodeAt(0) : null) => {
        const array = this.state
        for (let i = 0; i < array.length; i++)
            initialAccumulator = callback(initialAccumulator, array[i])
        return initialAccumulator
    }

    public reverse = () => {
        const state = this.state.slice().reverse()
        return new (this._getCollectionModel())(state, this.option().kids())
    }

    public shift = (): IAction => {
        const list = this.state.slice()
        const shifted = list.shift()
        shifted && this.setState(list)
        return this.action(shifted)
    }

    public slice = (...indexes: any) => new (this._getCollectionModel())(this.state.slice(...indexes), this.option().kids())

    public splice = (...args: any) => {
        const start = args[0]
        const deleteCount = args[1]
        const items = args.slice(2, args.length)

        const internalSplice = (...args: any) => {
            const list = this.state.slice()
            const value = list.splice(...args)
            this.setState(list)
            return this.action(value)
        }

        if (typeof start !== 'number')
            throw new Error("splice start parameter must be a number")

        if (!deleteCount)
            return internalSplice(start)

        if (typeof deleteCount !== 'number')
            throw new Error("splice deleteCount parameter must be a number")

        if (items.length == 0)
            return internalSplice(start, deleteCount)

        for (let i = 0; i < items.length; i++){
            if (!this._isNodeModel(items[i]) && !Model._isObject(items[i]))
                throw new Error("items parameter must be an Objet or the same Model than collection's nodes")
            else 
                items[i] = this.newNode(items[i])
        }

        return internalSplice(start, deleteCount, ...items)
    }

    // Update the element at index or post it.
    public update = (v: any, index: number): IAction => {
        const vCopy = this.newNode(v)
        const list = this.state.slice()
        if (list[index]){
            list[index] = vCopy
            this.setState(list)
            return this.action(vCopy)
        }
        return this.push(vCopy)
    }

    private _getCollectionModel = (): any => this.option().collectionModel() as Collection
    private _getNodeModel = (): any => this.option().nodeModel() as Model

    private _isCollectionModel = (value: any): boolean => value instanceof this._getCollectionModel()
    private _isNodeModel = (value: any): boolean => value instanceof this._getNodeModel()

    private _newCollectionModelInstance = (defaultState: any) => new (this._getCollectionModel())(defaultState, this.option().kids())  
    private _newNodeModelInstance = (defaultState: any) => new (this._getNodeModel())(defaultState, this.option().kids())  


}