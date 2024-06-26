import ModelsManager from './models'
import SubscribersManager from './subscribers'
import TransitionsManager from './transitions'
import StoreManager from './store'
import LocalStoreManager from './local-store'

import Model from '../model'

export default class Manager {
    
    private _modelsManager: ModelsManager
    private _subscribersManager: SubscribersManager
    private _transitionsManager: TransitionsManager
    private _store: StoreManager;

    private _localStoreManager: any = null
    private _hasBeenInitialized: boolean = false

    constructor(){
        this._subscribersManager = new SubscribersManager(this)
        this._modelsManager = new ModelsManager(this)
        this._transitionsManager = new TransitionsManager(this)
        this._store = new StoreManager(this)
    }

    public reset = () => {
        this.subscribers().reset()
        this.models().reset()
        this.transitions().reset()
        this.store().reset()

        this._hasBeenInitialized = false
    }

    public init = async (instruction: any = undefined) => {
        if (!this.isInitialized()){
            this.setInitialized()
            if (instruction !== 'test'){
                this._localStoreManager = new LocalStoreManager()
            }
            await this.models().connectAll()
        }
    }

    public localStoreManager = (): LocalStoreManager => this._localStoreManager
    public models = (): ModelsManager => this._modelsManager
    public transitions = (): TransitionsManager => this._transitionsManager
    public subscribers = (): SubscribersManager => this._subscribersManager
    public store = (): StoreManager => this._store
    // public pendingHydrationStore = (): PendingHydrationManager => this._pendingHydrationStore

    public isInitialized = () => this._hasBeenInitialized
    public setInitialized = () => this._hasBeenInitialized = true

    public prepareModel = (m: Model) => {
        this.models().add(m)
        this.isInitialized() && this.connectModel(m)
    }

    public connectModel = async (m: Model) => {
        const key = m.super().option().key()
        this.transitions().add(m)
        this.store().set({[key]: m.to().plain()})

        let storedData;
        if (!storedData && m.localStore().isActive())
            storedData = await m.localStore().get()
    
        storedData && m.hydrate(storedData).save()
        m.super().watchManager.onLocalStoreFetched()
    }
}