const REACT = 'react'
const REACT_NATIVE = 'react-native'
const NEXT_JS = 'next-js'

class Config {

    private _env = REACT
    private _isDev = true
    private _logger = false
    private _storeEngine: any = typeof document === 'undefined' ? null : localStorage

    constructor(){
        if (navigator && navigator.product == "ReactNative"){
            this._env = REACT_NATIVE
            try {
                this._storeEngine = require('@react-native-community/async-storage').default
            } catch {
                throw new Error("Install and link @react-native-community/async-storage to benefits the storage feature of Acey.")
            }
        }
    }

    isNextJSServer = () => this.isNextJS() && typeof document === 'undefined'
    isNextJS = () => this._env === NEXT_JS
    isReactNative = () => this._env === REACT_NATIVE
    isReact = () => this._env === REACT

    setEnvAsNextJS = () => this._env = NEXT_JS

    isDevMode = () => this._isDev
    setAsProduction = () => this._isDev = false

    //Todo: logger feature
    isLoggerEnabled = () => this._logger
    enableLogger = () => this._logger = true

    getStoreEngine = () => this._storeEngine

}

export default new Config()