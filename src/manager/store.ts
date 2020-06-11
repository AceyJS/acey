import Manager from './manager'
import { IAction } from './types'

export default class StoreManager {

    private _m: Manager
    private _store: any = {}

    constructor(m: Manager){
        this._m = m
    }

    public get = (): any => this._store
    public manager = () => this._m
    public reset = () => this._store = {}
    public set = (o: Object) => this._store = Object.assign({}, this.get(), o)
    public node = (key: string): any => this.get()[key]

    public dispatch = (action: IAction) => {
        this.manager().transitions().execute(action)
        this.manager().subscribers().notify()
    }
}