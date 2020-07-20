/*
import * as Cookies from 'es-cookie';
import config from '../config'
import LocalStoreManager from './local-store'
import Errors from '../errors'

class CookieManager {

    private COOKIE_SIZE_MAX = 4000;
    private _localStoreManagement: LocalStoreManager;

    constructor(localStore: LocalStoreManager){
        this._localStoreManagement = localStore
    }

    public isEnabled = (): boolean => !config.isNextJSServer()

    localStoreManagement = () => this._localStoreManagement

    addElement = (key: string, data: string, expires = 365) => {
        if (config.isReactNative())
            throw Errors.cookieDisabledOnRN()
        if (!this.isEnabled())
            return
        if (data.length >= this.COOKIE_SIZE_MAX)
            throw Errors.cookieMaxLengthReached(key, this.COOKIE_SIZE_MAX, data.length)
            
        this.localStoreManagement().isEnabled() && this.localStoreManagement().getKeyExpiration(key) && this.localStoreManagement().removeElement(key);
        Cookies.set(key, data, {expires});
    }

    getElement = (key: string) => {
        if (config.isReactNative())
            throw Errors.cookieDisabledOnRN()
        if (!this.isEnabled())
            return
            
        return Cookies.get(key)
    } 

    removeElement = (key: string) => {
        if (config.isReactNative())
            throw Errors.cookieDisabledOnRN()
        if (!this.isEnabled())
            return
        Cookies.remove(key)
    }

    prune = () => {
        if (config.isReactNative())
            throw Errors.cookieDisabledOnRN()
        if (!this.isEnabled())
            return
        document.cookie = ""
    }

}

export default CookieManager

*/