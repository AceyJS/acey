import { createStore as createStoreNative, combineReducers } from 'redux'
import Model from './model'

class Store {

    private _store: any = {}
    private _reduxStore: any
    private _shouldRemoveDefault: boolean = false
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

    addModels = (models: Model[]) => this._assign({ models })    
    addStore = (store: any) => {
        this._reduxStore = store
        this._assign({
            ...store
        })
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
        this._assign({ reducers })
    }

    getModels = () => this._store.models
    dispatch = (...props: any) => this._store.dispatch(...props)
    getState = () => this._store.getState()
    getReducers = () => this._store.reducers
    getReduxStore = () => this._reduxStore
    refreshReducer = () => this.getReduxStore().replaceReducer(this.createReducer())

    createReducer = () => combineReducers(this.getReducers())

    hydrate = (store: any) => this.getModels().map((m: Model) => m.isConnected() && m.hydrate(store))

    private _assign = (d: any) => {
        this._store = Object.assign({}, this._store, d)
    }
}

export const STORE = new Store({})
STORE.addStore(createStoreNative(STORE.createReducer()))
export default STORE.getReduxStore()