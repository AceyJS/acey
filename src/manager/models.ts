import Manager from './manager'
import Model from '../model'
import { size }  from 'lodash'

export default class ModelsManager {

    private _m: Manager
    private _models: any = {}

    constructor(m: Manager){
        this._m = m
    }

    public count = () => size(this.get())

    public get = () => this._models
    public manager = () => this._m
    public reset = () => this._models = {}
    public node = (key: string) => this.get()[key]

    public add = (m: Model) => this._models[m.super().option().key()] = m
    public exist = (key: string) => this.get()[key]
    public hydrate = (store: any) => this.forEach((m, key) => m.hydrate(store[key]).save())

    public connectAll = async () => {
        for (let key in this.get())
            await this.manager().connectModel(this.node(key))
    }
    
    public forEach = (callback: (m: Model, key: string) => any) => {
        for (let key in this.get())
            callback(this.get()[key], key)
    }
}