import Manager from './manager'
import { size } from 'lodash'
import Model from '../model'

export default class PendingHydrationManager {
    private _m: Manager
    private _pendingHydration: any = {}

    constructor(m: Manager){
        this._m = m
    }
    
    public count = () => size(this.get())

    public get = (): any => this._pendingHydration
    public manager = () => this._m
    public reset = () => this._pendingHydration = {}

    public set = (o: Object) => this._pendingHydration = Object.assign({}, this.get(), o)
    public node = (key: string): any => this.get()[key]

    public execute = () => {
        for (let key in this.get()) {
            const m = this.manager().models().node(key) as Model
            if (m){
                m.hydrate(this.node(key)).save()
                delete this.get()[key]
            }
        }
    }
}