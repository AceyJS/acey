import Config from '../config'
import Errors from '../errors'
import Model from './'
import Manager from '../manager'

export default class CookieManager {

    private _m: Model
    constructor(m: Model){
        this._m = m
    }

    public model = () => this._m
    public isActive = (): boolean => Manager.isInitialized() && !Config.isReactNative() && !this.model().is().keyGenerated() && this.model().is().connected() 
    public get = () => this.isActive() ? Manager.cookie().getElement(this.model().option().key()) : undefined
    
    public pull = () => {
        this._throwErrorIfInactive()
        const data = this.get()
        data && this.model().hydrate(data).save()
    }

    public set = (expires = 365) => {
        this._throwErrorIfInactive()
        const key = this.model().option().key()
        try {
            Manager.cookie().addElement(key, this.model().toString(), expires)
        } catch (e) {
            console.log(`error from cookie set with ${this.model().is().collection() ? 'Collection' : 'Model'}: ${key}, ${e}`)
        }
        return this.model().action()
    }

    public remove = () => {
        this._throwErrorIfInactive()
        const key = this.model().option().key()
        try {
            Manager.cookie().removeElement(key) 
        } catch (e){
            console.log(`error from cookie remove with ${this.model().is().collection() ? 'Collection' : 'Model'}: ${key}, ${e}`)
        }
    }

    private _throwErrorIfInactive = () => {
        if (!this.isActive()){
            throw Errors.unauthorizedCookieAdd(this.model())
        }
    }
}