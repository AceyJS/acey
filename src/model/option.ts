import Model, { IAction } from './'

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

    public model = (): Model => this._m
    public set = (o: Object) => this._options = Object.assign({}, this._options, o)
    public setKey = (key: string) => this.set({ key })


    public get = () => this._options
    public key = (): string => this.get().key
    public isConnected = (): boolean => this.get().connected    
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
            save: this.model().action().save,
            cookie: this.model().action().cookie,
            localStore: this.model().action().localStore,
        }
    }
}