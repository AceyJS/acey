import config from '../config'
import { isEmpty } from 'lodash'
import Errors from '../errors'
import { reviver } from '../lib';

class LocalStoreManager {

    private LOCAL_STORAGE_KEYS_ID  = '_ascey_local_ids'
    private _keys: any = {};

    constructor(){
        if (config.isNextJSServer()){
            return
        }
        if ((config.isReactNative() || config.isNodeJS()) && !this.engine())
            throw Errors.unsetLocalStore()
        
        this._fetchKeys()
    }

    public engine = () => config.getStoreEngine()

    public getKeys = () => this._keys
    public toString = () => JSON.stringify(this._keys)
    public toJSON = (keys: string) => this._keys = JSON.parse(keys, reviver)

    public isEnabled = (): boolean => !!this.engine()
    public expirationSystemDisabled = (): boolean => config.isNodeJS()

    public addElement = async (key: string, data: string, expires: number = 7): Promise<void> => {
        if (!this.engine())
            return
        if (!this.isEnabled())
            throw Errors.localStoreDisabled()
        await this.addKey(key, expires)
        return this.engine().setItem(key, data)
    }

    public getElement = async (key: string) => {
        if (!this.isEnabled())
            throw Errors.localStoreDisabled()

        return await this.engine().getItem(key) || undefined
    }

    public removeElement = (key: string) => {
        if (!this.isEnabled())
            throw Errors.localStoreDisabled()
        this.engine().removeItem(key)
        this.removeKey(key)
    }

    public addKey = (key: string, expires: number = 7) => {
        if (this.expirationSystemDisabled())
            return Promise.resolve()
        if (expires < 0) 
            throw new Error("expire value can't be negative.")
        if (!this.isEnabled())
            throw Errors.localStoreDisabled()

        const d = new Date()
        d.setSeconds(d.getSeconds() + (expires * 86400));
        this.getKeys()[key] = d.toString()
        return this.engine().setItem(this.LOCAL_STORAGE_KEYS_ID, this.toString()) as Promise<void>
    }

    public removeKey = (key: string) => {
        if (this.expirationSystemDisabled())
            return Promise.resolve()
        if (!this.isEnabled())
            throw Errors.localStoreDisabled()
        if (this.getKeys()[key]){
            delete this.getKeys()[key]
            return this.engine().setItem(this.LOCAL_STORAGE_KEYS_ID, this.toString()) as Promise<void>
        }
        return Promise.resolve()
    }

    public getKeyExpiration = (key: string) => {
        if (this.expirationSystemDisabled())
            return
        if (!this.isEnabled())
            throw Errors.localStoreDisabled()
        const dateString = this.getKeys()[key]
        return dateString ? new Date(dateString) : undefined
    }

    public prune = () => {
        if (!this.isEnabled())
            throw Errors.localStoreDisabled()
        for (let key in this.getKeys()){
            this.engine().removeItem(key)
            delete this.getKeys()[key]
        }
    }

    private _fetchKeys = async () => {
        if (this.expirationSystemDisabled())
            return
        if (!this.isEnabled())
            throw Errors.localStoreDisabled()
        const keys = await this.engine().getItem(this.LOCAL_STORAGE_KEYS_ID)
        !isEmpty(keys) && this.toJSON(keys)
        this._analyzeExpired()
    }

    private _analyzeExpired = () => {
        if (this.expirationSystemDisabled())
            return
        if (!this.isEnabled())
            throw Errors.localStoreDisabled()
        const now = new Date()
        for (let key in this.getKeys()){
            const date = this.getKeyExpiration(key)
            date && date < now && this.removeKey(key)
        }
    }
}

export default LocalStoreManager