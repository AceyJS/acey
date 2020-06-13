import Model, { IAction } from './'
import Config from '../config'
import Errors from '../errors'
import Manager from '../manager'
import { generateUniqModelKey } from '../lib'

type TOptionFunc = (() => IAction) | null

export interface IOptions {
    key: string
    connected: boolean
    save: TOptionFunc
    localStore: TOptionFunc
    cookie: TOptionFunc,
    nodeModel: Model | null
    collectionModel: Model | null
}

export default class OptionManager { 

    private _m: Model
    private _isKeyGenerated: boolean = false
    
    private _options: IOptions = {
        key: '',
        connected: false,
        save: null,
        cookie: null,
        localStore: null,
        nodeModel: null,
        collectionModel: null
    }

    constructor(m: Model){
        this._m = m
    }

    public init = (options: any) => {
        this.set(options)
        const key = this.key()

        if (this.isConnected()){
            if (Config.isNextJS() && !key)
                throw Errors.uniqKeyRequiredOnNextJS()
            if (key && Manager.models().exist(key) && !Config.isNextJSServer())
                throw Errors.keyAlreadyExist(key)
            if (!key){
                this.setKey(generateUniqModelKey(this._model()))
                this.setKeyAsGenerated()
            }
        }
        return this
    }

    private _model = (): Model => this._m

    public set = (o: Object) => this._options = Object.assign({}, this._options, o)
    public setKey = (key: string) => this.set({ key })
    public setKeyAsGenerated = () => this._isKeyGenerated = true

    public get = () => this._options
    public key = (): string => this.get().key
    public isConnected = (): boolean => this.get().connected  
    public isKeyGenerated = (): boolean => this._isKeyGenerated  
    public nodeModel = () => this.get().nodeModel
    public collectionModel = () => this.get().nodeModel


  /*    kids is setting the options for any nested Model/Collection.
        It makes the nested one using the same connected action than its parent.
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
            device: new Device({id: 'iPhone X'}, this.options().kids())
        }
    */
    public kids = () => {
        return {
            save: this._model().action().save,
            cookie: this._model().action().cookie,
            localStore: this._model().action().localStore,
        }
    }
}