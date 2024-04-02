import Config from '../config'
import Errors from '../errors'
import Model from './'
import Manager from '../manager'

export default class LocalStoreManager {
    private _m: Model
    constructor(m: Model){
        this._m = m
    }
    private _isWritting = false
    private _model = (): Model => this._m
    public isActive = (): boolean => Manager.isInitialized() && !Config.isNextJSServer() && !this._model().is().keyGenerated() && this._model().is().connected() && Manager.localStoreManager() != null

    public get = async () => {
        if (this.isActive()){
            const key = this._model().super().option().key()
            const data = await Manager.localStoreManager().getElement(key)
            if (data){
                return Model.ParseStoredJSON(data)
            }
        }
        return undefined
    }

    public set = (expires = 365): Promise<void> => {
        this._throwErrorIfInactive()
        if (this._isWritting)
            return Promise.resolve()
        
        const key = this._model().super().option().key()
        try {
            this._isWritting = true
            const p = Manager.localStoreManager().addElement(key, this._model().to().locallyStorableString(), expires)
            p.then(() => this._isWritting = false)
            return new Promise((resolve, reject) => {
                p.then(resolve).catch(reject)
            }) 
        } catch (e) {
            throw new Error(`error from localStore set with ${this._model().is().collection() ? 'Collection' : 'Model'}: ${key}, ${e}`)
        }
    }
    
    public remove = () => {
        this._throwErrorIfInactive()
        const key = this._model().super().option().key()
        try {
            Manager.localStoreManager().removeElement(key)
        } catch (e){
            console.log(`error from localStore remove with ${this._model().is().collection() ? 'Collection' : 'Model'}: ${key}, ${e}`)
        }
    }

    private _throwErrorIfInactive = () => {
        if (!this.isActive()){
            throw Errors.unauthorizedLocalStore(this._model())
        }
    }
}