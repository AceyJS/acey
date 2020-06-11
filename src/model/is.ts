import _ from 'lodash'
import Model from './'

export default class IsManager {
    
    private _m: Model
    private _isKeyGenerated: boolean = false

    constructor(m: Model){
        this._m = m
    }

    public model = (): Model => this._m

    public connected = (): boolean => this.model().option().isConnected() 
    public equal = (m: Model): boolean => this.model().toString() === m.toString()
    public empty = (): boolean => _.isEmpty(this.model().state)
    public collection = (): boolean => Model._isArray(this.model().state)
    public keyGenerated = (): boolean => this._isKeyGenerated
    public cookiesEnabled = (): boolean => this.model().cookie().isActive()
    public localStoreEnabled = (): boolean => this.model().localStore().isActive()

    public setKeyAsGenerated = () => this._isKeyGenerated = true
}