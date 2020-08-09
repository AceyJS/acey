import Model from '../'
import SubscriberManager, { SubscribeAction } from './subscribe-manager'

type TCallback = (...states: any) => void

export interface IWatchAction {
    state(callback: TCallback): SubscribeAction
    store(callback: TCallback): SubscribeAction
    localStoreFetch(callback: TCallback): SubscribeAction
}

export default class Watch {

    private _m: Model
    private _stateSubscriberManager: SubscriberManager
    private _storeSubscriberManager: SubscriberManager
    private _localStoreFetchedSubscriberManager: SubscriberManager
    private _hasLocalStoreBeenFetched: boolean = false

    constructor(m: Model){
        this._m = m
        this._stateSubscriberManager = new SubscriberManager(m, (m: Model) => m.watch().state)
        this._storeSubscriberManager = new SubscriberManager(m, null)
        this._localStoreFetchedSubscriberManager = new SubscriberManager(m, null)
    }
    
    private _model = (): Model => this._m
    private _stateSubscriber = (): SubscriberManager => this._stateSubscriberManager
    private _storeSubscriber = (): SubscriberManager => this._storeSubscriberManager
    private _localStoreFetchedSubscriber = (): SubscriberManager => this._localStoreFetchedSubscriberManager
    
    //extra
    public hasLocalStoreBeenPulled = () => this._hasLocalStoreBeenFetched


    public onStateChanged = (...props: any): number => this._stateSubscriber().notify(...props)
    public onStoreChanged = (...props: any) => this._storeSubscriber().notify(...props)
    public onLocalStoreFetched = () => {
        this._hasLocalStoreBeenFetched = true
        return this._localStoreFetchedSubscriber().notify()
    }

    public state = (callback: TCallback): SubscribeAction => this._stateSubscriber().add(callback)
    public store = (callback: TCallback): SubscribeAction => this._storeSubscriber().add(callback)
    public localStoreFetch = (callback: TCallback): SubscribeAction => this._localStoreFetchedSubscriber().add(callback)

    public action = (): IWatchAction => {
        return {
            state: this.state,
            store: this.store,
            localStoreFetch: this.localStoreFetch
        }
    }
}