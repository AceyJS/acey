import * as Cookies from 'es-cookie';
import config from './config'
import _ from 'lodash'

export class LocalStoreManager {

    private LOCAL_STORAGE_KEYS_ID  = '_ascey_local_ids'
    private _keys: any = {};

    constructor(){
        if (!this.isEnabled())
            return
        this._fetchKeys()
        this._analyzeExpired()
    }

    disabledError = () => {
        throw new Error("local store is not accessible on NextJS and React Native Environment.")
    }

    public engine = () => config.getStoreEngine()

    public getKeys = () => this._keys
    public toString = () => JSON.stringify(this._keys)
    public toJSON = (keys: string) => this._keys = JSON.parse(keys)

    public isEnabled = (): boolean => !(config.isReactNative() || config.isNextJS()) && this.engine()

    public addElement = (key: string, data: string, expires: number = 7) => {
        if (!this.isEnabled())
            return this.disabledError()
        if (!config.isReactNative() && Cookies.get(key)){
            throw new Error("You've attempted to add to the local store, a data already present in the cookies. Cookies have priority over local store, empty your cookes linked with the key before performing this action.")
        }

        this.engine().setItem(key, data)
        this.addKey(key, expires)
    }

    public getElement = (key: string): any => {
        if (!this.isEnabled())
            return this.disabledError()

        const data = this.engine().getItem(key)
        return data ? JSON.parse(data) : undefined
    }

    public removeElement = (key: string) => {
        if (!this.isEnabled())
            return this.disabledError()
        this.engine().removeItem(key)
        this.removeKey(key)
    }

    public addKey = (key: string, expires: number = 7) => {
        if (expires < 0) 
            throw new Error("expire value can't be negative.")
        if (!this.isEnabled())
            return this.disabledError()

        const d = new Date()
        d.setSeconds(d.getSeconds() + (expires * 86400));
        this.getKeys()[key] = d.toString()
        this.engine().setItem(this.LOCAL_STORAGE_KEYS_ID, this.toString())
    }

    public removeKey = (key: string) => {
        if (!this.isEnabled())
            return this.disabledError()
        if (this.getKeys()[key]){
            delete this.getKeys()[key]
            this.engine().setItem(this.LOCAL_STORAGE_KEYS_ID, this.toString())
        }
    }

    public getKeyExpiration = (key: string) => {
        if (!this.isEnabled())
            return this.disabledError()
        const dateString = this.getKeys()[key]
        return dateString ? new Date(dateString) : undefined
    }

    public prune = () => {
        if (!this.isEnabled())
            return this.disabledError()
        for (let key in this.getKeys()){
            this.engine().removeItem(key)
            delete this.getKeys()[key]
        }
    }

    private _fetchKeys = () => {
        if (!this.isEnabled())
            return this.disabledError()
        const keys = this.engine().getItem(this.LOCAL_STORAGE_KEYS_ID)
        !_.isEmpty(keys) && this.toJSON(keys)
    }

    private _analyzeExpired = () => {
        if (!this.isEnabled())
            return this.disabledError()
        const now = new Date()
        for (let key in this.getKeys()){
            const date = this.getKeyExpiration(key)
            date && date < now && this.removeKey(key)
        }
    }
}

export default new LocalStoreManager()