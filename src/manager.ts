import Model from './model'
import _ from 'lodash'
import config from './config'

import LocalStoreManager from './local-store-manager'
import CookieManager from './cookie-manager'

interface IAction {
    payload: any
    type: string
}

class Manager {
    private _modelsManager: Map<string, Model> = new Map()
    private _transitionsManager: Map<string, Function> = new Map()
    private _store: any = {}
    private _subscribers: Function[] = []
    private _pendingHydrationStore: any = {}
    private _localStoreManager: any = null
    private _cookieManager: any = null;
    private _hasBeenInitialized: boolean = false
    private _pendingModelConnexion: any[] = []

    constructor(){}

    public reset = () => {
        this._modelsManager = new Map()
        this._transitionsManager = new Map()
        this._store = {}
        this._pendingHydrationStore = {}
        this._subscribers = []
        this._hasBeenInitialized = false
        this._pendingModelConnexion = []
    }

    public init = async () => {
        if (!this.isInitialized()){
            this._hasBeenInitialized = true
            this._localStoreManager = new LocalStoreManager()
            this._cookieManager = new CookieManager(this._localStoreManager)
            for (let o of this.pendingModelConnexion()){
                await o.connect(o.model)
            }
            this._pendingModelConnexion = []
            this._privateExecPendingHydration()
        }
    }

    public localStoreManager = (): LocalStoreManager => this._localStoreManager
    public cookieManager = (): CookieManager => this._cookieManager
    public modelsManager = (): Map<string, Model> => this._modelsManager
    public transitionManager = (): Map<string, Function> => this._transitionsManager
    public subscribers = (): Function[] => this._subscribers
    public pendingHydrationStore = (): any => this._pendingHydrationStore
    public store = (): Object => this._store
    public pendingModelConnexion = (): any => this._pendingModelConnexion

    public isInitialized = () => this._hasBeenInitialized

    private _setPendingHydrationStore = (store: any) => {
        this._pendingHydrationStore = Object.assign({}, this.pendingHydrationStore(), store)
    }

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
        this.transitionManager().forEach((transition, key) => {
            this._store[key] = transition(this._store[key], action)
        })
    }

    public dispatch = (action: IAction) => {
        this._updateStore(action)
        this.notifySubscribers()
    }

    public notifySubscribers = () => {
        if (this.isInitialized())
            this.subscribers().forEach((e) => e())
        else if (config.isReactNative())
            throw new Error(`You need to specify the config has done at the root of your project: "config.done()" to run Acey.`)
    }

    public subscribe = (callback: Function) => {
        callback()
        this.subscribers().push(callback)
        this._privateExecPendingHydration()
    }

    public connectModel = (m: Model) => {
        
        const callback = async (m: Model) => {
            const { key } = m.options
            const { defaultState } = m

            this.transitionManager().set(key, this._newTransition(defaultState, key))
            this.modelsManager().set(key, m)
            this._store[key] = defaultState

            let storedData;
            if (m.areCookiesEnabled())
                storedData = m.fetchCookies()
            if (!storedData && m.isStorageEnabled())
                storedData = await m.fetchLocalStore()
            storedData && this._setPendingHydrationStore({[key]: storedData}) 
        }

        this.isInitialized() ? callback(m) : this.pendingModelConnexion().push({
            model: m,
            connect: callback
        })
    }

    public exist = (key: string): boolean => this.modelsManager().get(key) !== undefined

    public addPendingHydration = (store: any) => {
        this._setPendingHydrationStore(store)
        this._privateExecPendingHydration()
    }

    public hydrateCookies = (cookies: any) => {
        if (config.isReactNative())
            throw new Error("cookie management are not available on React-Native");
        this.modelsManager().forEach((m, key) => {
            key in cookies && m.areCookiesEnabled() && m.hydrate(cookies[key]).save()
        })
    }

    public hydrate = (store: any) => this.modelsManager().forEach((m, key) => m.hydrate(store[key]).save())

    _privateExecPendingHydration = () => {
        for (let key in this.pendingHydrationStore()) {
            const m = this.modelsManager().get(key)
            if (m){
                m.hydrate(this.pendingHydrationStore()[key]).save()
                delete this.pendingHydrationStore()[key]
            }
        }
    }
}

export default new Manager()