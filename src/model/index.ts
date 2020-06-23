import _ from 'lodash'
import Manager from '../manager'

import Errors from '../errors'
import { hydrate, toPlain, ParseJSONLocallyStored } from './utils'
import {  verifyAllModel } from '../verify'

import CookieManager from './cookie'
import LocalStoreManager from './local-store'
import IsManager from './is'
import OptionManager from './option'
import WatchManager, {IWatchAction} from './watch'


export interface IAction {
    save(): IAction
    cookie(): IAction,
    localStore(): IAction,
    value: any
}

export default class Model {

    private _state: any = null
    private _prevState: any = null
    private _defaultState: any = null

    private _cookie: CookieManager
    private _localStore: LocalStoreManager
    private _is: IsManager
    private _option: OptionManager
    private _watch: WatchManager

    constructor(state: any, ...props: any){
        this._is = new IsManager(this)
        this._option = new OptionManager(this, Object.assign({}, props[0], props[1]))
        this._cookie = new CookieManager(this)
        this._localStore = new LocalStoreManager(this)
        this._watch = new WatchManager(this)
        this._set(state)
        this._setDefaultState(this.toPlain())
        this.is().connected() && Manager.prepareModel(this)
    }

    private _set = (state: any = this.state): IAction => {
        if (Model._isObject(state) || Model._isArray(state)){
            this._state = this.is().collection() ? this.toListClass(state) : state
        } else {
            if (!this.is().collection())
                throw Errors.onlyObjectOnModelState()
            else 
                throw Errors.onlyArrayOnCollectionState()
        }
        return this.action()
    }

    private _watchManager = () => this._watch


    private _handleStateChanger = (prevStatePlain: any) => {
        if (JSON.stringify(prevStatePlain) === this.toString())
            return
        this._watchManager().onStateChanged()
        this._prevState = prevStatePlain
        if (!this.is().collection()){
            verifyAllModel(this)
        }
    }

    protected _setDefaultState = (state: any) => this._defaultState = state
    protected _setPrevState = (state: any) => this._prevState = state


    public get state(){
        return this._state
    }

    public get prevState(){
        return this._prevState
    }

    public get defaultState(){
        return this._defaultState
    }

    public cookie = (): CookieManager => this._cookie
    public localStore = (): LocalStoreManager => this._localStore
    public is = (): IsManager => this._is
    public option = (): OptionManager => this._option
    public watch = (): IWatchAction => this._watchManager().action()
    
    public action = (value: any = undefined): IAction => {
        const { save, cookie, localStore } = this.option().get()

        return { 
            cookie: !cookie ? this.cookie().set : cookie,
            save: !save ? this.save : save,
            localStore: !localStore ? this.localStore().set : localStore,
            value
        }
    }
    
    public save = () => {
        if (this.is().connected()){
            Manager.store().dispatch({ payload: this.toPlain(), type: this.option().key() })
            this._watchManager().onStoreChanged()
        }
        else 
            throw Errors.unauthorizedSave(this)
        return this.action()
    }

    //Only usable in 
    public setState = (o = this.state): IAction => {
        const prevStatePlain = this.toPlain()
        
        if (this.is().collection()){
            let action = this._set(o)
            this._handleStateChanger(prevStatePlain)
            return action
        } else if (!Model._isObject(o))
            throw new Error("You can only set an object to setState on a Model")

        this._set(Object.assign({}, this.state, o))
        this._handleStateChanger(prevStatePlain)
        return this.action()
    }

    //Only usable in a Model
    public deleteKey = (key: string): IAction => {
        if (this.is().collection())
            throw new Error(`deleteKey can't be used in a Collection`)

        const prevStatePlain = this.toPlain()
        key in this.state && delete this.state[key] && this._handleStateChanger(prevStatePlain)
        return this.action()
    }

    //Only usable in a Model
    public deleteMultiKey = (...keys: string[]): IAction => {
        if (this.is().collection())
            throw new Error(`deleteMultiKey can't be used in a Collection`)
        const prevStatePlain = this.toPlain()
        let inCount = 0
        for (let i = 0; i < keys.length; i++)
            delete this.state[keys[i]] && inCount++
        !!inCount && this._handleStateChanger(prevStatePlain)
        return this.action()
    }

    //Return the state to a JSONified object.
    public toPlain = (...args: any): any => toPlain(this, args[0])
    
    public hydrate = (state: any): IAction => {
        hydrate(state, this)
        if (!this.is().empty())
            verifyAllModel(this)
        return this.setState()
    }

    /*
        Transform an array of object into an array of instancied Model
        Exemple => 
        [{content: '123', id: 'abc'}, {content: '456', id: 'def'}]
        to
        [new Model(content: '123', id: 'abc'}), new Model({content: '456', id: 'def'})]
        the class used to instance the objects is the one passed in parameters in the constructor.

    */
    public toListClass = (elem: any[] = []): Model[] => {
        const nodeModel = this.option().nodeModel()
        if (!this.is().collection() || nodeModel == null)
            throw new Error("toListClass can only be called from a Collection")

        let ret: Model[] = []
        for (let i = 0; i < elem.length; i++){
            if (!(elem[i] instanceof Model))
                ret.push(new (<any>nodeModel)(elem[i], this.option().kids()))
            else 
                ret.push(elem[i])
        }
        return ret
    }

    public toLocallyStorableString = (): string => JSON.stringify(this.toPlain('store'))
    public toString = (): string => JSON.stringify(this.toPlain())

    static ParseStoredJSON = (data: string) => ParseJSONLocallyStored(data)

    static _isArray = (value: any): boolean => Array.isArray(value)
    static _isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Model) && !(value instanceof Date)
    static _isCollection = (value: any): boolean => value instanceof Model && value.is().collection()
}
