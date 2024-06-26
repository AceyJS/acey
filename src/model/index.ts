import _ from 'lodash'
import Manager from '../manager'

import Errors from '../errors'
import { hydrate, toPlain, ParseJSONLocallyStored } from './utils'
import {  verifyAllModel } from '../verify'

import LocalStoreManager from './local-store'
import IsManager from './is'
import OptionManager, { IOptions } from './option'
import WatchManager, {IWatchAction} from './watch'
import { isCollectionInstance, isModelInstance } from '../lib'

export interface IAction {
    save(): IAction
    store(expires: number | void): Promise<void>
    value: any
}

export type IPlainState = { [key: string]: any }

export default class Model {

    private _prevStateStore: any = null
    private _state: any = null
    private _prevState: any = null
    private _defaultState: any = null

    private _localStore: LocalStoreManager
    private _is: IsManager
    private _option: OptionManager
    private _watch: WatchManager

    super = () => {
        const option = (): OptionManager => this._option

        return {
            option,
            prevState: this._prevState,
            prevStateStore: this._prevStateStore,
            defaultState: this._defaultState,
            watchManager: this._watch
        }
    }

    constructor(state: IPlainState, options: IOptions | void){
        this._is = new IsManager(this)
        this._option = new OptionManager(this, options)
        
        const defaultState = typeof state === 'undefined' ? (this.is().collection() ? [] : {}) : state
        this._defaultState = toPlain(defaultState)

        this._localStore = new LocalStoreManager(this)
        this._watch = new WatchManager(this)

        this._set(defaultState)
        this.is().connected() && Manager.prepareModel(this)
    }

    private _set = (state: any = this.state): IAction => {
        if (Model._isObject(state) || Model._isArray(state)){
            this._state = this.is().collection() ? this.to().listClass(state) : state
        } else {
            if (!this.is().collection()){
                if (Model.IsModel(state))
                    return this._set(state.to().plain())
                throw Errors.onlyObjectOnModelState()
            }
            else 
                throw Errors.onlyArrayOnCollectionState()
        }
        return this.action()
    }

    private _handleStateChanger = (prevStatePlain: any) => {
        const newStatePlain = this.to().plain()
        if (JSON.stringify(prevStatePlain) === JSON.stringify(newStatePlain))
            return
        this._setPrevState(prevStatePlain)
        this.super().watchManager.onStateChanged(this.super().prevState, newStatePlain)
        if (!this.is().collection()){
            verifyAllModel(this)
        }
    }

    private _setPrevState = (state: any) => this._prevState = state
    private _setPrevStateStore = (state: any) => this._prevStateStore = state

    public get state(){
        return this._state
    }

    public localStore = (): LocalStoreManager => this._localStore
    public is = (): IsManager => this._is
    public watch = (): IWatchAction => this.super().watchManager.action()
    
    public action = (value: any = undefined): IAction => {
        const { save, store } = this.super().option().get()

        return { 
            save: !save ? this.save : save,
            store: !store ? this.localStore().set : store,
            value
        }
    }
    
    public save = () => {
    
        if (this.is().connected()){
            const prevStateStore = Manager.store().node(this.super().option().key())
            const newStorePlain = this.to().plain()

            if (!_.isEqual(prevStateStore, newStorePlain)){
                Manager.store().dispatch({ payload: newStorePlain, type: this.super().option().key() })
                this._setPrevStateStore(prevStateStore)
                this.super().watchManager.onStoreChanged(prevStateStore, newStorePlain)
            }
        }
        else {
            const { save } = this.super().option().get()
            if (save) 
                return save()
            throw Errors.unauthorizedSave(this)
        }
        return this.action()
    }

    //Only usable in 
    public setState = (o = this.state): IAction => {
        const prevStatePlain = this.to().plain()
        
        if (this.is().collection()){
            let action = this._set(o)
            this._handleStateChanger(prevStatePlain)
            return action
        } else if ((!Model._isObject(o) && o != null) || o == null)
            throw new Error("You can only set an object to setState on a Model")

        this._set(Object.assign({}, this.state, o))
        this._handleStateChanger(prevStatePlain)
        return this.action()
    }

    //Only usable in a Model
    public deleteKeys = (...keys: string[]): IAction => {
        if (this.is().collection())
            throw new Error(`deleteKey can't be used in a Collection`)

        const one = (key: string): IAction => {
            const prevStatePlain = this.to().plain()
            key in this.state && delete this.state[key] && this._handleStateChanger(prevStatePlain)
            return this.action()            
        }

        const multi = (keys: string[]): IAction => {
            const prevStatePlain = this.to().plain()
            let inCount = 0
            for (let i = 0; i < keys.length; i++)
                delete this.state[keys[i]] && inCount++
            !!inCount && this._handleStateChanger(prevStatePlain)
            return this.action()
        }

        return keys.length === 1 ? one(keys[0]) : multi(keys)
    }
    
    public hydrate = (state: any): IAction => {
        hydrate(state, this)
        if (!this.is().empty())
            verifyAllModel(this)
        return this.action()
    }

    public kids = () => this.super().option().kids()

    public to = () => {
        /*
            Transform an array of object into an array of instancied Model
            Exemple => 
            [{content: '123', id: 'abc'}, {content: '456', id: 'def'}]
            to
            [new Model(content: '123', id: 'abc'}), new Model({content: '456', id: 'def'})]
            the class used to instance the objects is the one passed in parameters in the constructor.

        */
        const listClass = (elem: any[] = []): Model[] => {
            const nodeModel = this.super().option().nodeModel()
            if (!this.is().collection() || nodeModel == null)
                throw new Error("listClass can only be called from a Collection")
    
            let ret: Model[] = []
            for (let i = 0; i < elem.length; i++){
                if (!Model.IsModel(elem[i]))
                    ret.push(new (<any>nodeModel)(elem[i], this.super().option().kids()))
                else 
                    ret.push(elem[i])
            }
            return ret
        }

        const locallyStorableString = (): string => JSON.stringify(plain('store'))
        const string = (): string => JSON.stringify(plain())

        //Return the state to a JSONified object.
        const plain = (...args: any): any => toPlain(this.state, args[0])

        return {
            listClass,
            locallyStorableString,
            string,
            plain
        }
    }

    static ParseStoredJSON = (data: string) => ParseJSONLocallyStored(data)
    static IsModel = (value: any): boolean => isModelInstance(value)
    static IsCollection = (value: any): boolean => isCollectionInstance(value)

    static _isArray = (value: any): boolean => Array.isArray(value)
    static _isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value) && !Model.IsModel(value) && !(value instanceof Date)
}
