import _ from 'lodash'
import Manager from '../manager'

import Errors from '../errors'
import { hydrate, toPlain } from './utils'
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
        this._option = new OptionManager(this).init(Object.assign({}, props[0], props[1]))
        this._cookie = new CookieManager(this)
        this._localStore = new LocalStoreManager(this)
        this._watch = new WatchManager(this)
        this._set(state)

        this._setDefaultState(this.toPlain())


        this.is().connected() && Manager.prepareModel(this)
    }

    private _set = (state: any = this.state): IAction => {
        if (Model._isObject(state) || Model._isArray(state)){
            this._prevState = this.state
            this._state = this.is().collection() ? this.toListClass(state) : state
        } else {
            if (!this.is().connected())
                throw Errors.onlyObjectOnModelState()
            else 
                throw Errors.onlyArrayOnCollectionState()
        }
        return this.action()
    }

    public get state(){
        return this._state
    }

    public get prevState(){
        return this._prevState
    }

    protected _setDefaultState = (state: any) => this._defaultState = state
    private _watchManager = () => this._watch

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

    //Only usable in a Model/State
    public setState = (o = this.state): IAction => {
        if (this.is().collection()){
            const action = this._set(o)
            this._watchManager().onStateChanged()
            return action
        } else if (!Model._isObject(o))
            throw new Error("You can only set an object to setState on a Model")

        this._set(Object.assign({}, this.state, o))
        this._watchManager().onStateChanged()

        verifyAllModel(this)
        return this.action()
    }

    //Only usable in a Model/State
    public deleteKey = (key: string): IAction => {
        if (this.is().collection())
            throw new Error(`deleteKey can't be used in a Collection`)

        const isIn = key in this.state
        isIn && delete this.state[key]
        return isIn ? this.setState() : this.action()
    }

    public deleteMultiKey = (...keys: string[]): IAction => {
        if (this.is().collection())
            throw new Error(`deleteMultiKey can't be used in a Collection`)
        let isIn = false
        for (let i = 0; i < keys.length; i++){
            if (!isIn){
                isIn = keys[i] in this.state
            }
            delete this.state[keys[i]]
        }
        return isIn ? this.setState() : this.action()
    }

    //Return the state to JSONified object.
    //It implies that the state is an array, an object or a Model typed class (model or extended from Model)
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
        the class used to instance the objects is the one passed in parameters as nodeModel in the constructor.

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

    static _isArray = (value: any): boolean => Array.isArray(value)
    static _isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Model) && !(value instanceof Date)
    static _isCollection = (value: any): boolean => value instanceof Model && value.is().collection()
}
