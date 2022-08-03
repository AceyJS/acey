import { size } from 'lodash'
import Model from '../'
import { hash } from '../../lib'

export class SubscribeAction {
    private _id: string
    private _stopAction: Function

    constructor(id: string, stopAction: Function){
        this._id = id
        this._stopAction = stopAction        
    }

    public ID = () => this._id
    public stop = () => this._stopAction()
}


export default class SubscriberManager {
    private _subscribers: any = {}
    private _m: Model

    private _kidsSubscribersActions: any = {} //for the node of a collection
    private _watchActionKids: Function | null = null
    
    constructor(m: Model, watchActionKids: Function | null) {
        this._m = m
        this._watchActionKids = watchActionKids
    }

    private _model = () => this._m
    get = () => this._subscribers

    count = (): number => size(this.get())

    add = (callback: Function): SubscribeAction => {
        const ID = hash(Math.random().toString()).toString()
        this.get()[ID] = callback
        this._isKidsActionsEnabled() && this._addKidsSubscriberActions(ID, callback)

        return new SubscribeAction(ID, () => {
            this._isKidsActionsEnabled() && this._stopKidsSubscriberActions(ID)
            return this.stop(ID)
        })
    }

    stop = (id: string) => {
        delete this.get()[id]
        return this.count()
    }

    forEach = (callback: (f: Function, key: string) => void): number => {
        for (let key in this.get()){
            callback(this.get()[key], key)
        }
        return this.count()
    }

    notify = (...props: any): number => {
        this.forEach((f) => f(...props))
        this._isKidsActionsEnabled() && this._refreshKidsSubscriberActions()
        return this.count()
    }

    reset = (): number => {
        const count = this.count()
        this.forEach((f, key: string) => delete this.get()[key])
        return count
    }

    private _allKidsSubscriberActions = () => this._kidsSubscribersActions
    private _subscriberKidsActions = (key: string) => this._allKidsSubscriberActions()[key]
    private _isKidsActionsEnabled = (): boolean => this._watchActionKids !== null && this._model().is().collection()
    private _watchSelector = (m: Model): Function => (this._watchActionKids as Function)(m)

    private _addKidsSubscriberActions = (id: string, callback: Function) => {
        if (this._isKidsActionsEnabled()){
            const ret: Function[] = []
            const list = this._model().state as Array<Model>
            for (let e of list)
                ret.push(this._watchSelector(e)(callback)) 
            this._allKidsSubscriberActions()[id] = ret
        }
    }

    private _refreshKidsSubscriberActions = () => {
        for (let key in this._allKidsSubscriberActions()){
            this._stopKidsSubscriberActions(key)
            this._addKidsSubscriberActions(key, this.get()[key])
        }
    }

    private _stopKidsSubscriberActions = (id: string) => {
        const list = this._subscriberKidsActions(id)
        if (list){
            for (let i = 0; i < list.length; i++)
                list[i].stop()
            list.length = 0
            delete this._allKidsSubscriberActions()[id]
        }
    }

}
