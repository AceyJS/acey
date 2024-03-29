import Manager from './manager'
import Model from '../model'
import { size } from 'lodash'

export interface IAction {
    payload: any
    type: string
}

export default class TransitionsManager {
    private _m: Manager
    private _transitions: any = {}

    constructor(m: Manager){
        this._m = m
    }

    get = () => this._transitions

    count = (): number => size(this.get())

    private _newTransition = (DEFAULT_DATA: any = {}, STORE_KEY: string = '') => {
        return (state = DEFAULT_DATA, action: IAction) => {
            const { payload, type } = action			
            let s = state
            if (type == STORE_KEY)
                s = payload || state
            return s
        }
    }

    public add = (m: Model) => {
        const key = m.super().option().key()
        this.get()[key] = this._newTransition(m.to().plain(), key)
    }

    public forEach = (callback: (transition: Function, key: string) => any) => {
        for (let key in this.get())
            callback(this.get()[key], key)
    }

    public execute = (action: IAction) => {
        this.forEach((transition: Function, key: string) => {
            const { store } = this.manager()
            store().set({ [key]: transition(store().node(key), action) })
        })
    }

    public manager = () => this._m
    public reset = () => this._transitions = {}
}