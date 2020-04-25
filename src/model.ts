import objectPath from "object-path"
import _ from 'lodash'
import * as Cookies from 'es-cookie';
import STORE from './store'

import { 
    verifyIfContainArrayOfModel,
    verifyIfContainAConnectedModel
} from './verify'

type TOptionFunc = Function | null

export interface IOptions {
    key: string
    connected: boolean
    save: TOptionFunc
    cookies: TOptionFunc,
    enableCookies: boolean
}

export const DEFAULT_OPTIONS: IOptions = {
    key: '',
    connected: false,
    save: null,
    cookies: null,
    enableCookies: false,
}

export interface IAction {
    save(): any
    cookies(): any
    value: any
}

export default class Model {

    private _state: any = null
    private _defaultState: any = null
    private _options: IOptions = DEFAULT_OPTIONS
    protected __childOptions: IOptions = this._options

    constructor(state: any, ...props: any){
        this._handleInitializationWithOptions(props[0])
        this._set(state)
        this._defaultState = this.toPlain()
        this._setChildOptions()
        this._fetchCookies()
    }

    public get options(){
        return _.cloneDeepWith(this._options)
    }

    public get state(){
        return this._state
    }

    public get defaultState(){
        return this._defaultState
    }

    /*  This function is setting the options that could have any Model nested to the current one
        to make the nested one using the same listed method than the model that welcomes it.
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
        const { save, cookies } = this.options
        this.__childOptions = Object.assign({}, this.__childOptions, {
            save: this.isConnected() || !save ? this._getConnectedActions().save : save,
            cookies: this.isCookiesEnabled() || !cookies ? this._getConnectedActions().cookies : cookies
        })
    }

    private _handleInitializationWithOptions = (opt = DEFAULT_OPTIONS) => {

        this._options = Object.assign({}, DEFAULT_OPTIONS, opt)
        const { key } = this.options

        if ((this.isCookiesEnabled() || this.isConnected()) && key && this._isKeyTaken(key))
            console.warn(`key ${key} is used by many connected Model or Collection.`)

        if (this.isCookiesEnabled() && !key)
            throw new Error("To enable cookie storage with your Model you need to manually set an unique key to it.")

        if (this.isConnected() && !key){
            if (!this.isNextServer())
                this._setOption({key: this._generateKey()})
            else 
                throw new Error("In a NextJS or React Native environment, you need to manually set an unique key to your connected Models")
        }
        if (this.isConnected())
            STORE.connectModel(this)
    }

    protected _getConnectedActions = (value: any = undefined): IAction => {
        const { save, cookies } = this.options

        return { 
            cookies: this.isCookiesEnabled() ? this._cookies : () => cookies ? cookies() : this._getConnectedActions(value),
            save: this.isConnected() ? this._save : () => save ? save() : this._getConnectedActions(value),
            value
        }
    }

    private _setOption = (o: any) => this._options = Object.assign({}, this.options, o)

    private _set = (state: any = this.state): IAction => {
        if (this._isObject(state) || this._isArray(state)){
            this._state = state
        } else {
            if (!this.isCollection())
                throw new Error(`The state of a Model, can only be instanced and replaced with an object type.`)
            else 
                throw new Error(`The state of a Collection, can only be instanced and replaced with an array type.`)
        }
        return this._getConnectedActions()
    }

    private _save = () => {
        this.isConnected() && STORE.dispatch({
            payload: this.toPlain(),
            type: this.options.key,
        })
        return this._getConnectedActions()
    }

    private _cookies = (expires = 365) => {
        !this.isNextServer() && Cookies.set(this.options.key, JSON.stringify(this.toPlain()), {expires})
        return this._getConnectedActions()
    }

    private _fetchCookies = () => {
        if (!this.isCookiesEnabled() || this.isNextServer())
            return
        const data = Cookies.get(this.options.key)
        if (!data)
            return

        try {
            this.hydrate(JSON.parse(data))
        } catch (e){
            this.clearCookies()
        }
    }
    
    public clearCookies = () => !this.isNextServer() && Cookies.remove(this.options.key)
    
    public hydrate = (state: any) => {
        if (!this.isEmpty())
            this._checkArrayModel()

        this.assignDeep(state)
        return this._set()
    }

    //Only usable in a Model/State
    public setState = (o: any) => {
        if (this.isCollection())
            return this._set(o)
        
        for (let k in o){
            if (o[k] instanceof Model){
                this._checkArrayModel()
                break
            }
        }

        return this._set(Object.assign({}, this.state, o))
    }

    //Only usable in a Model/State
    public deleteKey = (key: string) => {
        if (this.isCollection())
            throw new Error(`deleteKey can't be used on a Collection`)

        delete this.state[key]
        return this._set(this.state)
    }

    assignDeep = (obj: any) => {

        const recur = (o: any, path: string) => {
    
            if (this._isArray(o))
                updateInState(o, path)
            else if (this._isObject(o)){
                for (let key in o)
                    recur(o[key], path + '.' + key)
            } else
                updateInState(o, path)
        }
    
        const getValueAtPath = (path: string) => {
            const pathSplited = path.replace(/^[\|]+|[\|]+$/g, ".").split('.').filter(function(x){
                return (x !== (undefined || null || ''));
            });
        
            let v = this
            for (let i = 0; i < pathSplited.length; i++){
                if (v instanceof Model)
                    v = v.state[pathSplited[i]]
                else
                    v = v[pathSplited[i]]
            }
            return v
        }
        
        const updateInState = (value: any, path: string) => {
            const pathSplited = path.replace(/^[\|]+|[\|]+$/g, ".").split('.').filter(function(x){
                return (x !== (undefined || null || ''));
            });
            const lastKey = pathSplited[pathSplited.length - 1]
            pathSplited.splice(pathSplited.length - 1, 1)
        
            const v: any = getValueAtPath(pathSplited.join('.'))

            if (v instanceof Model && !this._isCollection(v.state[lastKey])){
                const o: any= {}
                o[lastKey] = value
                v.setState(o)
            } else if (this._isCollection(v.state[lastKey])){
                const collec = v.state[lastKey]
                collec.setState(collec.toListClass(value))
            } else 
                v[lastKey] = value
        }
    
        recur(obj, '')
    }

    //Return the state to JSONified object.
    //It implies that the state is an array, an object or a Model typed class (model or extended from Model)
    public toPlain = (): any => {
        const ret: any = {}; 
        
        const recur = (o: any, path: string) => {
            
            //if this is a plain object
            if (this._isObject(o) && Object.keys(o).length > 0){
                for (var key in o)
                    recur(o[key], !path ? key : path + '.' + key)
                return
            }

            //if this is an array
            if (this._isArray(o) && o.length > 0){
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

    public isNextServer = (): boolean => typeof window === 'undefined'
    public toString = (): string => JSON.stringify(this.toPlain())
    public isCookiesEnabled = (): boolean => this.options.enableCookies
    public isConnected = (): boolean => this.options.connected 
    public isEqual = (m: Model): boolean => this.toString() === m.toString()
    public isEmpty = (): boolean => _.isEmpty(this.state)
    public isCollection = (): boolean => this._isArray(this.state)

    private _generateKey = (): string => {
        let i = 1;
        let key = '_auto_' + this.constructor.name
        let suffix;
        while (true){
            suffix = '_' + i.toString()
            if (!this._isKeyTaken(key + suffix))
                break;
            i++
        }
        return key + suffix
    }

    private _isArray = (value: any): boolean => Array.isArray(value)
    private _isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Model) && !this._isDateClass(value)
    private _isDateClass = (value: any): boolean => value instanceof Date
    private _isCollection = (value: any): boolean => value instanceof Model && value.isCollection()
    private _isKeyTaken = (value: string): boolean => STORE.exist(value)

    private _checkArrayModel = () => {
        if (verifyIfContainArrayOfModel(this))
            throw new Error(this.constructor.name + "'s state contains an Array of Model. Please use a Collection instead.")
        if (verifyIfContainAConnectedModel(this.state)){
            throw new Error(this.constructor.name + " contains a connected Model. Connected Models can't be nested")
        }
    }
}
