import * as Cookies from 'es-cookie';
import config from './config'
import LocalStoreManager from './local-store-manager'

class CookieManager {

    private COOKIE_SIZE_MAX = 4000;
    private _localStoreManagement: LocalStoreManager;

    constructor(localStore: LocalStoreManager){
        this._localStoreManagement = localStore
    }

    disabledError = () => {
        throw new Error("cookies management is not accessible on React Native, please use local store instead.");
    }

    public isEnabled = (): boolean => !config.isNextJSServer()

    localStoreManagement = () => this._localStoreManagement

    addElement = (key: string, data: string, expires = 365) => {
        if (config.isReactNative()){
            return this.disabledError()
        }
        if (!this.isEnabled()){
            return
        }
        const dLength = data.length
        if (dLength < this.COOKIE_SIZE_MAX){
            this.localStoreManagement().isEnabled() && this.localStoreManagement().getKeyExpiration(key) && this.localStoreManagement().removeElement(key);
            Cookies.set(key, data, {expires});
        }
        else 
            throw new Error(`You've attempted to set cookie with the (key: ${key}), but this action can't be executed because the max length of a cookie is ${this.COOKIE_SIZE_MAX} for most browsers, the one you set was ${dLength}.`)
    }

    getElement = (key: string) => {
        if (config.isReactNative())
            return this.disabledError()
        if (!this.isEnabled())
            return

        const data = Cookies.get(key)
        return data ? JSON.parse(data) : undefined
    } 

    removeElement = (key: string) => {
        if (config.isReactNative())
            return this.disabledError()
        if (!this.isEnabled())
            return
        Cookies.remove(key)
    }

    prune = () => {
        if (config.isReactNative())
            return this.disabledError()
        if (!this.isEnabled())
            return
        document.cookie = ""
    }

}

export default CookieManager