import { createStore as createStoreNative, combineReducers } from 'redux'
import Model from './model'
import _ from 'lodash'

class Store {

    private _store: any = {}
    private _pendingHydration: any = {}
    private _reduxStore: any
    private _shouldRemoveDefault: boolean = false
    private _models: any = []

    constructor(data: any){
        this._store = data
        this.addReducers({
            _default: (state: any = {}, action: any = {}): any => {
                return state
            }
        })
        this._shouldRemoveDefault = true
    }

    private _removeDefaultReducer = () => {
        const reducers = this.getReducers()
        delete reducers['_default']
        this.addReducers(reducers)
    }


    addPendingHydration = (storeData: any) => {
        this._pendingHydration = Object.assign({}, this._pendingHydration, storeData)
        if (this.getModels().length > 0){
            for (let m of this.getModels()){
                m.isConnected() && 
                m.options.key in this._pendingHydration && 
                m.hydrate(this._pendingHydration) &&
                delete this._pendingHydration[m.options.key]
            }
        }
    }

    clearModels = () => {
        this._models = []
    }

    addModels = (m: Model) => {
        this._models.push(m)
    }

    addStore = (store: any) => {
        this._reduxStore = store
        this._assign({
            ...store
        })
    }

    isModelExist = (key: any) => {
        const models = this.getModels()
        if (!models)
            return false
        
        for (let m of models){
            if (m.options.key === key)
                return true
        }
        return false
    }

    isReducerExist = (key: any) => {
        for (let k in this.getReducers()){
            if (k === key)
                return true
        }
        return false
    }

    addReducers = (reducers: any) => {
        if (this._shouldRemoveDefault == true){
            this._shouldRemoveDefault = false
            this._removeDefaultReducer()
        }

        const pendingHydratingData = this.getPendingHydration()
        if (!_.isEmpty(pendingHydratingData)){
            const currentReducers = this.getReducers()
            const toHydrate: any = {}

            for (let key in reducers){
                if (!currentReducers.hasOwnProperty(key) && 
                    pendingHydratingData.hasOwnProperty(key)
                )
                toHydrate[key] = pendingHydratingData[key]
            }
            if (!_.isEmpty(toHydrate))
                this._pendingHydration = Object.assign({}, this._pendingHydration, toHydrate)
        }
        this._assign({ reducers })
    }



    getModels = () => this._models
    dispatch = (...props: any) => this._store.dispatch(...props)
    getState = () => this._store.getState()
    getReducers = () => this._store.reducers
    getReduxStore = () => this._reduxStore
    getPendingHydration = () => this._pendingHydration
    refreshReducer = () => {
        this.getReduxStore().replaceReducer(this.createReducer())
        if (!_.isEmpty(this._pendingHydration)){
            for (let m of this.getModels()){
                console.log('key', m.options.key)
                m.isConnected() && 
                m.options.key in this._pendingHydration && 
                m.hydrate(this._pendingHydration) &&
                delete this._pendingHydration[m.options.key]

            }
        }
    }

    createReducer = () => combineReducers(this.getReducers())

    hydrate = (store: any) => this.getModels().map((m: Model) => m.isConnected() && m.hydrate(store))

    private _assign = (d: any) => {
        this._store = Object.assign({}, this._store, d)
    }
}

const STORE = new Store({})
STORE.addStore(createStoreNative(STORE.createReducer()))
export default STORE