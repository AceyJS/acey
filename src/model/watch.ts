import Model from './'


export interface IWatchAction {
    state(): any,
    store(): any
    all(): any
}


class SubscriberManager {
    private _subscribers: Function[] = []

    constructor(){
    }

    add = (callback: Function) => this.get().push(callback)
    notify = () => this.get().forEach((e) => e())
    reset = () => this._subscribers = []
    get = () => this._subscribers
}

export default class Watch {

    private _m: Model
    _stateSubscriberManager: SubscriberManager
    _storeSubscriberManager: SubscriberManager

    constructor(m: Model){
        this._m = m
        this._stateSubscriberManager = new SubscriberManager()
        this._storeSubscriberManager = new SubscriberManager()
    }
    
    private _model = (): Model => this._m
    private _stateSubscriber = () => this._stateSubscriberManager
    private _storeSubscriber = () => this._storeSubscriberManager
    
    onStateChanged = () => this._stateSubscriber().notify()
    onStoreChanged = () => this._stateSubscriber().notify()

    public state = (callback = (...states: any) => undefined) => this._stateSubscriber().add(callback)
    public store = (callback = (...states: any) => undefined) => this._storeSubscriber().add(callback)

    public all = (callback = (...states: any) => undefined) =>{
        this.state(callback)
        this.store(callback)
    }

    public action = (): IWatchAction => {
        return {
            state: this.state,
            store: this.store,
            all: this.all
        }
    }
}