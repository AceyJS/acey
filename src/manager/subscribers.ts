import Manager from './manager'
import config from '../config'
import Errors from '../errors'

export default class SubscribersManager {

    private _m: Manager
    private _subscribers: Function[] = []

    constructor(m: Manager){
        this._m = m
    }

    count = () => this._subscribers.length

    add = (callback: Function) => {
        callback()
        this.get().push(callback)
        this.manager().pendingHydrationStore().execute()
    }

    notify = () => {
        if (this.manager().isInitialized())
            this.get().forEach((e) => e())
        else if (config.isReactNative())
            throw Errors.configNotDone()
    }

    reset = () => this._subscribers = []
    manager = () => this._m
    get = () => this._subscribers
}
