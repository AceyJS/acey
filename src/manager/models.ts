import Manager from './manager'
/* COOKIE ENABLE */
// import config from '../config'
// import Errors from '../errors'
import Model from '../model'
import size from 'lodash.size'

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
    
    /* COOKIE ENABLE */
    /*
    public hydrateWithCookies = (cookies: any) => {
        if (config.isReactNative())
            throw Errors.cookieDisabledOnRN()
        this.forEach((m, key) => {
            key in cookies && m.cookie().isActive() && m.hydrate(cookies[key]).save()
        })
    }
    */

    public forEach = (callback: (m: Model, key: string) => any) => {
        for (let key in this.get())
            callback(this.get()[key], key)
    }
}