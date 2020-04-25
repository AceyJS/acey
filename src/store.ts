import Model from './model'
import _ from 'lodash'

interface IAction {
    payload: any
    type: string
}

class Store {
    private _models: any = {}
    private _transitions: any = {}
    private _store: any = {}
    private _subscribers: Function[] = []

    constructor(){}

    public dispatch = (action: IAction) => {
        this._updateStore(action)
        this.notifySubscribers()
    }

    public notifySubscribers = () => {
        for (let elem of this._subscribers)
            elem()
    }

    public subscribe = (callback: Function) => this._subscribers.push(callback)

    private _newTransition = (DEFAULT_DATA: any = {}, STORE_KEY: string = '') => {
        return (state = DEFAULT_DATA, action: IAction) => {
            const { payload, type } = action			
            let s = state
            if (type == STORE_KEY)
                s = payload || state
            return s
        }
    }

    private _updateStore = (action: IAction) => {
        for (let key in this._transitions){
            const { payload, type } = action
            this._store[key] = this._transitions[key](this._store[key], {payload, type})
        }
    }

    public connectModel = (m: Model) => {
        const { key } = m.options
        const { defaultState } = m

        this._transitions[key] = this._newTransition(defaultState, key)
        this._models[key] = m
        this._store[key] = defaultState
    }

    public reset = () => {
        this._models = []
        this._transitions = {}
        this._store = {}
        this.notifySubscribers()
    }

    public exist = (key: string): boolean => key in this._models

    public models = () => this._models
    public transitions = () => this._transitions
    public store = (): Object => this._store

    hydrate = (store: any) => {
        for (let key in this.models())
            this.models()[key].hydrate(store[key])
    }
}

export default new Store()