import Config from '../config'
import Errors from '../errors'
import Model from './'
import Manager from '../manager'

export default class LocalStoreManager {
    private _m: Model
    constructor(m: Model){
        this._m = m
    }

    private _model = (): Model => this._m
    public isActive = (): boolean => Manager.isInitialized() && !Config.isNextJS() && !this._model().is().keyGenerated() && this._model().is().connected() && Manager.localStoreManager() != null
    public get = async () => this.isActive() ? (await Manager.localStoreManager().getElement(this._model().option().key())) : undefined
    
    public pull = () => {
        this._throwErrorIfInactive()
        const data = this.get()
        data && this._model().hydrate(data).save()
    }

    public set = (expires = 365) => {
        this._throwErrorIfInactive()
        const key = this._model().option().key()
        try {
            Manager.localStoreManager().addElement(key, this._model().toLocallyStorableString(), expires)
        } catch (e) {
            console.log(`error from localStore set with ${this._model().is().collection() ? 'Collection' : 'Model'}: ${key}, ${e}`)
        }
        return this._model().action()
    }
    
    public remove = () => {
        this._throwErrorIfInactive()
        const key = this._model().option().key()
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