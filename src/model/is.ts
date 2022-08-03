import { isEmpty } from 'lodash'
import Model from './'

export default class IsManager {
    
    private _m: Model

    constructor(m: Model){
        this._m = m
    }

    private _model = (): Model => this._m

    public connected = (): boolean => this._model().super().option().isConnected() 
    public equal = (m: Model | Object): boolean => {
        const modelStringified = this._model().to().string()
        if (Model.IsModel(m)){
            return (m as any).to().string() === modelStringified
        }
        return JSON.stringify(m) === modelStringified
    }
    
    public localStorePulled = (): boolean => this._model().super().watchManager.hasLocalStoreBeenPulled()
    public empty = (): boolean => isEmpty(this._model().state)
    public collection = (): boolean => Model._isArray(this._model().state)
    public keyGenerated = (): boolean => this._model().super().option().isKeyGenerated()
    /* COOKIE ENABLE */
    // public cookiesEnabled = (): boolean => this._model().cookie().isActive()
    public localStoreEnabled = (): boolean => this._model().localStore().isActive()

}