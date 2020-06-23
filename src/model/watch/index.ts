import Model from '../'
import SubscriberManager, { SubscribeAction } from './subscribe-manager'
import { hash } from '../../lib'

type TCallback = (...states: any) => void

export interface IWatchAction {
    state(callback: TCallback): SubscribeAction
    store(callback: TCallback): SubscribeAction
    all(callback: TCallback): SubscribeAction
}

export default class Watch {

    private _m: Model
    _stateSubscriberManager: SubscriberManager
    _storeSubscriberManager: SubscriberManager

    constructor(m: Model){
        this._m = m
        this._stateSubscriberManager = new SubscriberManager(this._model(), (m: Model) => m.watch().state)
        this._storeSubscriberManager = new SubscriberManager(this._model(), null)
    }
    
    private _model = (): Model => this._m
    private _stateSubscriber = (): SubscriberManager => this._stateSubscriberManager
    private _storeSubscriber = (): SubscriberManager => this._storeSubscriberManager
    
    public onStateChanged = (...props: any): number => this._stateSubscriber().notify(...props)
    public onStoreChanged = (...props: any) => this._storeSubscriber().notify(...props)

    public state = (callback: TCallback): SubscribeAction => this._stateSubscriber().add(callback)
    public store = (callback: TCallback): SubscribeAction => this._storeSubscriber().add(callback)

    public all = (callback: TCallback): SubscribeAction => {
        const stateWatcher = this.state(callback)
        const storeWatcher = this.store(callback)

        const ID = hash(Math.random().toString()).toString()
        return new SubscribeAction(ID, () => {
            stateWatcher.stop()
            storeWatcher.stop()
        })
    }

    public action = (): IWatchAction => {
        return {
            state: this.state,
            store: this.store,
            all: this.all
        }
    }
}