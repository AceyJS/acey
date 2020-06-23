import _ from 'lodash'
import Model from './'

export default class IsManager {
    
    private _m: Model

    constructor(m: Model){
        this._m = m
    }

    private _model = (): Model => this._m

    public connected = (): boolean => this._model().option().isConnected() 
    public equal = (m: any): boolean => {
        const modelStringified = this._model().toString()
        if (m instanceof Model){
            return m.toString() === modelStringified
        }
        return JSON.stringify(m) === modelStringified
    }
    
    public empty = (): boolean => _.isEmpty(this._model().state)
    public collection = (): boolean => Model._isArray(this._model().state)
    public keyGenerated = (): boolean => this._model().option().isKeyGenerated()
    public cookiesEnabled = (): boolean => this._model().cookie().isActive()
    public localStoreEnabled = (): boolean => this._model().localStore().isActive()

}