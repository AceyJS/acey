import Model from './model'
import _ from 'lodash'

interface IAction {
    payload: any
    type: string
}

class Store {
    private _models: Map<string, Model> = new Map()
    private _transitions: Map<string, Function> = new Map()
    private _store: any = {}
    private _subscribers: Function[] = []
    private _pendingHydrationStore: any = {}

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
        this.transitions().forEach((transition, key) => {
            this._store[key] = transition(this._store[key], action)
        })
    }

    public connectModel = (m: Model) => {
        const { key } = m.options
        const { defaultState } = m

        this.transitions().set(key, this._newTransition(defaultState, key))
        this._models.set(key, m)
        this._store[key] = defaultState

        this._privateExecPendingHydration()
    }

    public reset = () => {
        this._models = new Map()
        this._transitions = new Map()
        this._store = {}
        this._pendingHydrationStore = {}
        this._subscribers = []
    }

    public exist = (key: string): boolean => this.models().get(key) !== undefined

    public models = (): Map<string, Model> => this._models
    public transitions = (): Map<string, Function> => this._transitions
    public store = (): Object => this._store

    public addPendingHydration = (store: any) => {
        this._pendingHydrationStore = Object.assign({}, this._pendingHydrationStore, store)
        this._privateExecPendingHydration()
    }

    public hydrateCookies = (cookies: any) => {
        for (let key in cookies){
            const m = this.models().get(key)
            if (m && m.isCookiesEnabled()){
                m.hydrate(JSON.parse(cookies[key])).save()
            }
        }
    }

    public hydrate = (store: any) => {
        this.models().forEach((m, key) => {
            m.hydrate(store[key]).save()
        })
    }

    _privateExecPendingHydration = () => {
        for (let key in this._pendingHydrationStore) {
            const m = this.models().get(key)
            if (m){
                m.hydrate(this._pendingHydrationStore[key]).save()
                delete this._pendingHydrationStore[key]
            }            
        }
    }
}

export default new Store()