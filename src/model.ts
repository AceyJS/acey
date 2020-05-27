import objectPath from "object-path"
import _ from 'lodash'
import Manager from './manager'
import Config from './config'

import { hydrate } from './hydrate'

import { 
    verifyIfContainArrayOfModel,
    verifyIfContainAConnectedModel
} from './verify'

type TOptionFunc = (() => IAction) | null

export interface IOptions {
    key: string
    connected: boolean
    save: TOptionFunc
    localStore: TOptionFunc
    cookie: TOptionFunc
}

interface IInternalOptions {
    nodeModel: Model | undefined
}

const DEFAULT_OPTIONS: IOptions = {
    key: '',
    connected: false,
    save: null,
    cookie: null,
    localStore: null
}

const DEFAULT_INTERNAL_OPTIONS: IInternalOptions = {
    nodeModel: undefined
}

export interface IAction {
    save(): IAction
    cookie(): IAction,
    localStore(): IAction,
    value: any
}

export default class Model {

    private _state: any = null
    private _defaultState: any = null
    private _options: IOptions = DEFAULT_OPTIONS
    private _internalOptions: IInternalOptions = DEFAULT_INTERNAL_OPTIONS
    
    protected __childOptions: IOptions = this._options
    private _isKeyGenerated = false

    constructor(state: any, ...props: any){
        this._set(state)
        this._defaultState = this.toPlain()
        this._setOptions(props[0])
        this._setInternalOptions(props[1])
        this._setChildOptions()

        this._initialize()
    }

    private _initialize = () => {
        const { key } = this.options

        if (this.isConnected()){
            if (Config.isNextJS() && !key)
                throw new Error("In a NextJS environment you need to manually setup a unique key for every connected Model and Collection you instance.")
            if (key && Manager.exist(key) && !Config.isNextJSServer())
                throw new Error(`You have 2 connected Models/Collections using the same key: ${key}.`)
            if (!key){
                this._setOptions({key: this._generateKey()})
                this._isKeyGenerated = true
            }
            Manager.connectModel(this)
        }
    }

    public get options(){
        return _.cloneDeepWith(this._options)
    }

    public get internalOptions(){
        return this._internalOptions
    }

    public get state(){
        return this._state
    }

    public get defaultState(){
        return this._defaultState
    }

    protected _getConnectedActions = (value: any = undefined): IAction => {
        const { save, cookie, localStore } = this.options

        return { 
            cookie: !cookie ? this._cookie : cookie,
            save: !save ? this._save : save,
            localStore: !localStore ? this._localStore : localStore,
            value
        }
    }
    
    private _setOptions = (o: any) => this._options = Object.assign({}, this.options, o)

    private _setInternalOptions = (options = DEFAULT_INTERNAL_OPTIONS) => {
        this._internalOptions = Object.assign(this._internalOptions, options)
    }

  /*    _setChildOptions is setting the options that any nested Model, the current one could have.
        It makes the nested one using the same connected methods than the model that welcomes it.
        Example: 
        We assume that we have a connected Model called `User` with a state Object that contains 
        a non-connected Model called `Device`.

        Here is the state
        {
            first_name: ''
            device: new Device({id: 'iPhone X'})
        }

        If we want to call some Device's method and save the state to refresh the components, it won't work by default.
        Because Device is not connected.

        so we are copying the reference of the key methods of User into the options that we are going to pass
        to device after the instance.
        this way:

        {
            first_name: ''
            device: new Device({id: 'iPhone X'}, this.__childOptions)
        }
    */

    private _setChildOptions = () => {
        this.__childOptions = Object.assign({}, this.__childOptions, {
            save: this._getConnectedActions().save,
            cookie: this._getConnectedActions().cookie,
            localStore: this._getConnectedActions().localStore,
        })
    }

    private _set = (state: any = this.state): IAction => {
        if (Model._isObject(state) || Model._isArray(state)){
            this._state = this.isCollection() ? this.toListClass(state) : state
        } else {
            if (!this.isCollection())
                throw new Error(`The state of a Model, can only be instanced and replaced with an object type.`)
            else 
                throw new Error(`The state of a Collection, can only be instanced and replaced with an array type.`)
        }
        return this._getConnectedActions()
    }

    private _save = () => {
        if (this.isConnected()){
            Manager.dispatch({
                payload: this.toPlain(),
                type: this.options.key,
            })
        }
        else 
            throw new Error(`You've attempted to call save in the ${this.isCollection() ? 'Collection' : 'Model'} ${this.constructor.name} but you either didn't specify it as a connected ${this.isCollection() ? 'Collection' : 'Model'} or didn't specify the config has done at the root of your project: "config.done()"`)
        return this._getConnectedActions()
    }

    private _cookie = (expires = 365) => {
        const { key } = this.options
        if (this.areCookiesEnabled()){
            try {
                Manager.cookieManager().addElement(key, this.toString(), expires)
            } catch (e) {
                throw new Error(`error from coookie with Model/Collection: ${key}, ${e}`)
            }
        }
        else 
            throw new Error(`You've attempted to call cookie in the ${this.isCollection() ? 'Collection' : 'Model'} ${this.constructor.name} (key: ${this.options.key}), but this functionnality is unavailable in it for these reasons:\n1. Doesn't have a unique specified key in the building options.\n2. It is not connected to the store.\n3. You didn't specify the config has done at the root of your project: "config.done()"\n4. You are using React Native`)
        
        return this._getConnectedActions()
    }

    public fetchCookies = () => this.areCookiesEnabled() ? Manager.cookieManager().getElement(this.options.key) : undefined
    public removeCookies = () => this.areCookiesEnabled() ? Manager.cookieManager().removeElement(this.options.key) : undefined

    private _localStore = (expires = 365) => {
        const { key } = this.options
        if (this.isStorageEnabled()){
            try {
                Manager.localStoreManager().addElement(key, this.toString(), expires)
            } catch (e) {
                throw new Error(`error from localStore with ${this.isCollection() ? 'Collection' : 'Model'}: ${key}, ${e}`)
            }
        } else 
            throw new Error(`You've attempted to call localStore in the ${this.isCollection() ? 'Collection' : 'Model'} ${this.constructor.name} (key: ${this.options.key}), but this functionnality is unavailable in it for these reasons:\n1. Doesn't have a unique specified key in the building options.\n2. It is not connected to the store\n3. You didn't specify the config has done at the root of your project: "config.done()"\n4. You are using NextJS.`)
        return this._getConnectedActions()
    }

    public fetchLocalStore = async () => this.isStorageEnabled() ? (await Manager.localStoreManager().getElement(this.options.key)) : undefined
    public removeLocalStore = () => this.isStorageEnabled() ? Manager.localStoreManager().removeElement(this.options.key) : undefined
    
    //Only usable in a Model/State
    public setState = (o = this.state) => {
        if (this.isCollection())
            return this._set(o)
        else if (!Model._isObject(o))
            throw new Error("You can only set an object to setState on a Model")

        this._set(Object.assign({}, this.state, o))
        this._doVerifications()
        return this._getConnectedActions()
    }

    //Only usable in a Model/State
    public deleteKey = (key: string) => {
        if (this.isCollection())
            throw new Error(`deleteKey can't be used in a Collection`)

        delete this.state[key]
        return this._set(this.state)
    }

    public deleteMultiKey = (keys: string[]) => {
        for (let key of keys)
            this.deleteKey(key)
        return this._getConnectedActions()
    }

    //Return the state to JSONified object.
    //It implies that the state is an array, an object or a Model typed class (model or extended from Model)
    public toPlain = (): any => {
        const ret: any = {}; 
        
        const recur = (o: any, path: string) => {
            
            //if this is a plain object
            if (Model._isObject(o) && Object.keys(o).length > 0){
                for (var key in o)
                    recur(o[key], !path ? key : path + '.' + key)
                return
            }

            //if this is an array
            if (Model._isArray(o) && o.length > 0){
                for (let i = 0; i < o.length; i++)
                    recur(o[i], path + '.' + i.toString())
                return
            }

            //if this is a Model class
            if (o instanceof Model){
                recur(o.state, path)
                return
            }

            objectPath.set(ret, path, o)
        }

        recur(this.state, '')

        if (this.isCollection()){
            if (!ret[''])
                return []
            return ret['']
        }

        return ret
    }
    
    hydrate = (state: any) => {
        hydrate(state, this)
        this._set()
        if (!this.isEmpty())
            this._doVerifications()
        return this._getConnectedActions()
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
        const { nodeModel } = this.internalOptions
        if (!this.isCollection() || nodeModel == null)
            throw new Error("toListClass can only be called from a Collection")

        let ret: Model[] = []
        for (let i = 0; i < elem.length; i++){
            if (!(elem[i] instanceof Model))
                ret.push(new (<any>nodeModel)(elem[i], this.__childOptions))
            else 
                ret.push(elem[i])
        }
        return ret
    }

    public toString = (): string => JSON.stringify(this.toPlain())
    public areCookiesEnabled = (): boolean => Manager.isInitialized() && !Config.isReactNative() && !this.hasKeyBeenGenerated() && this.isConnected()
    public isStorageEnabled = (): boolean => Manager.isInitialized() && !Config.isNextJS() && !this.hasKeyBeenGenerated() && this.isConnected()
    public hasKeyBeenGenerated = (): boolean => this._isKeyGenerated
    public isConnected = (): boolean => this.options.connected 
    public isEqual = (m: Model): boolean => this.toString() === m.toString()
    public isEmpty = (): boolean => _.isEmpty(this.state)
    public isCollection = (): boolean => Model._isArray(this.state)

    private _generateKey = (): string => {
        let i = 1;
        let key = '_auto_' + this.constructor.name
        let suffix;
        while (true){
            suffix = '_' + i.toString()
            if (!Manager.exist(key + suffix))
                break;
            i++
        }
        return key + suffix
    }

    static _isArray = (value: any): boolean => Array.isArray(value)
    static _isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Model) && !Model._isDateClass(value)
    static _isDateClass = (value: any): boolean => value instanceof Date
    static _isCollection = (value: any): boolean => value instanceof Model && value.isCollection()

    private _doVerifications = () => {
        if (verifyIfContainArrayOfModel(this))
            throw new Error(this.constructor.name + "'s state contains an Array of Model. Please use a Collection instead.")
        if (verifyIfContainAConnectedModel(this.state)){
            throw new Error(this.constructor.name + " contains a connected Model. Connected Models can't be nested")
        }
    }
}
