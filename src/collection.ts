/* Lodash imports */
import remove from 'lodash.remove'
import findIndex from 'lodash.findindex'
import filter from 'lodash.filter'
import orderBy from 'lodash.orderby'
import uniqBy from 'lodash.uniqby'
import groupBy from 'lodash.groupby'

import Model, {IAction}  from './model'
import Errors from './errors'

type Constructor<T> = new(...args: any[]) => T;

import { 
    chunk,
    nth,
    IGrouped,
    collectionPredictor,
    treatPredicatePickNode,
    treatPredicateSortNode,
    TPredicatePickNode,
    TPredicatePickKey,
    TOrderSort,
    TPredicateSort
} from './lodash-utils'
import { isCollectionInstance, isModelInstance } from './lib'

//  i) this class can be improved by adding more than you can usually find in lists.
//It aims to be the parent of any model class representing a list of object/classes
//for example in a todolist it would be the parent of the TodoList class containing a list of Todos
//This can be useful to avoid redundant functions like sorting, filtering, pushing, deleting, updating etc...


export default class Collection extends Model  {
    
    constructor(list: any[] = [], models: [Constructor<Model>, Constructor<Collection>], ...props: any){
        super([], Object.assign({}, ...props, { nodeModel: models[0], collectionModel: models[1] }))

        //check if nodeModel is not a Collection
        if (isCollectionInstance(this.newNode(undefined)))
            throw Errors.forbiddenMultiDimCollection()
        
        const assignWithStorage = async () => {

            /* COOKIE ENABLE */
            //if (!this.is().connected() || (!this.cookie().get() && !(await this.localStore().get()))){
            if (!this.is().connected() || !(await this.localStore().get())){
                this.setState(list)
            }
        }

        assignWithStorage()
    }

    public arrayOf = (key: string): any[] => this.map((m: Model) => m.state[key])

    public append = (values: any[]): IAction => this.concat(values)
    
    public chunk = (nChunk: number): Collection[] => {
        const list: any[] = chunk(this.state, nChunk)
        for (let i = 0; i < list.length; i++){
            list[i] = this.newCollection(list[i]) as Collection
        }
        return list
    }

    public concat = (list: any[]): IAction => {
        const newList = this.state.slice().concat(this.to().listClass(list))
        this.setState(newList)
        return this.action(list.length)
    }
    
    //Return the number of element in the array
    public count = (): number => this.state.length

    public copy = (): Collection => this.newCollection(this.state.slice())

    //delete a node if it exists in the list.
    public delete = (v: any): IAction => {
        const index = this.indexOf(v)
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

    public deleteAll = (list: any[] = this.state) => {
        let count = 0;
        list.map((e: any) => this.indexOf(e) != -1 && this.delete(e) && count++)
        return this.action(count)
    }

    //delete all the nodes matching the predicate. see https://lodash.com/docs/4.17.15#remove
    public deleteBy = (predicate: TPredicatePickNode): IAction => {
        const futureState = collectionPredictor(predicate, this)
        const e = remove(futureState, predicate)
        !!e.length && this.setState(futureState)
        return this.action()
    }

    public deleteIndex = (index: number): IAction => {
        const { value } = this.splice(index, 1)
        return this.action(!!value.length ? value[0] : undefined)
    }

    //find the first node matching the predicate see: https://lodash.com/docs/4.17.15#find
    public find = (predicate: TPredicatePickNode): Model | undefined => {
        const index = this.findIndex(predicate)
        if (index == -1)
            return undefined
        return this.nodeAt(index)
    }

    //return the index of the first element found matching the predicate. see https://lodash.com/docs/4.17.15#findIndex
    public findIndex = (predicate: TPredicatePickNode): number => findIndex(collectionPredictor(predicate, this), predicate)

    //pick up a list of node matching the predicate. see: https://lodash.com/docs/4.17.15#filter
    public filter = (predicate: TPredicatePickNode): Collection => this.newCollection(filter(this.state, treatPredicatePickNode(predicate)))

    public filterIn = (predicate: TPredicatePickKey, arrayElems: any[]): Collection => {
        const value = (m: Model, index: number) => typeof predicate === 'string' ? m.state[predicate] : predicate(m, index)
        return this.filter((m: Model, index: number) => arrayElems.indexOf(value(m, index)) != -1)
    }

    public first = (): Model | undefined => this.nodeAt(0)

    public forEach = (callback: (m: any, index: number) => any) => {
        for (let i = 0; i < this.count(); i++)
            callback(this.state[i], i)
    }

    public groupBy = (predicate: TPredicatePickKey): IGrouped => {
        const d = groupBy(this.state, treatPredicatePickNode(predicate))
        const ret: IGrouped = {}
        Object.keys(d).map((key: string) => {
            ret[key] = this.newCollection(d[key])
        })
        return ret
    }

    //return the index of the element passed in parameters if it exists in the list.
    public indexOf = (v: any): number => findIndex(this.to().plain(), this.newNode(v).to().plain())

    public last = (): Model | undefined => this.nodeAt(this.count() - 1)

    public limit = (limit: number): Collection => this.slice(0, limit)

    public map = (callback: (v: any, index: number) => any): any[] => { 
        let ret: any[] = []
        this.forEach((m: Model, index: number) => {
            const v = callback(m, index)
            v && ret.push(v)
        })
        return ret
    }

    public newCollection = (v: any): Collection => this._isCollectionModel(v) ? v : this._newCollectionModelInstance(v)
    public newNode = (v: any): Model => this._isNodeModel(v) ? v : this._newNodeModelInstance(v)
    
    public nodeAt = (index: number): Model | undefined => this.state[index] ? this.state[index] : undefined

    public nth = (index: number): Model | undefined => this.count() == 0 ? undefined : (nth(this.state, index) as Model)

    public offset = (offset: number): Collection => this.slice(offset)

    //return a sorted array upon the parameters passed. see: https://lodash.com/docs/4.17.15#orderBy
    public orderBy = (predicate: TPredicateSort, order: TOrderSort): Collection => {
        return this.newCollection(
            orderBy(this.state, treatPredicateSortNode(predicate), order)
        )
    }

    public pop = (): IAction => {
        const list = this.state.slice()
        const poped = list.pop()
        poped && this.setState(list)
        return this.action(poped)
    }

    public prepend = (list: any[]): IAction => {
        const newList = this.to().listClass(list).concat(this.state.slice())
        this.setState(newList)
        return this.action(list.length)
    }
    
    //add an element to the list
    public push = (v: any): IAction => {
        const list = this.state.slice()
        const n = list.push(this.newNode(v))
        n && this.setState(list)
        return this.action(n)
    }

    public reduce = (callback: (accumulator: any, currentValue: any) => any, initialAccumulator: any = this.count() ? this.nodeAt(0) : null) => {
        this.forEach((m: Model) => initialAccumulator = callback(initialAccumulator, m))
        return initialAccumulator
    }

    public reverse = (): Collection => this.newCollection(this.state.slice().reverse())

    public shift = (): IAction => {
        const list = this.state.slice()
        const shifted = list.shift()
        shifted && this.setState(list)
        return this.action(shifted)
    }

    public slice = (...indexes: any): Collection => this.newCollection(this.state.slice(...indexes))

    public splice = (...args: any): IAction => {
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

    public updateAll = (toSet: Object): IAction => {
        this.forEach((m: Model) => m.setState(toSet))
        return this.action(this.count())
    }

    // Update the element at index or post it.
    public updateAt = (v: any, index: number): IAction => {
        const vCopy = this.newNode(v)
        const list = this.state.slice()
        if (list[index]){
            list[index] = vCopy
            return this.setState(list)
        }
        return this.push(vCopy)
    }

    // Update the element at index or post it.
    public updateWhere = (predicate: TPredicatePickNode, toSet: Object): IAction => {
        const list = this.filter(predicate)
        list.forEach((m: Model) => m.setState(toSet))
        return list.action(list.count())
    }

    public uniq = (): Collection => {
        let ret = this.newCollection([])
        this.forEach((m: Model) => !ret.find(m.to().plain()) && ret.push(m))
        return ret
    }

    public uniqBy = (predicate: TPredicatePickKey): Collection => this.newCollection(uniqBy(collectionPredictor(predicate, this), predicate))


    private _getCollectionModel = (): any => this.super().option().collectionModel() as Collection
    private _getNodeModel = (): any => this.super().option().nodeModel() as Model

    private _isCollectionModel = (value: any): boolean => isCollectionInstance(value)
    private _isNodeModel = (value: any): boolean => isModelInstance(value)

    private _newCollectionModelInstance = (defaultState: any) => new (this._getCollectionModel())(defaultState, this.kids())
    private _newNodeModelInstance = (defaultState: any) => new (this._getNodeModel())(defaultState, this.kids())  
}