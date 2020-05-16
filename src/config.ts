import Manager from './manager'

const REACT = 'react'
const REACT_NATIVE = 'react-native'
const NEXT_JS = 'next-js'

class Config {

    private _env = REACT
    private _isDev = true
    private _logger = false
    private _storeEngine: any = typeof document === 'undefined' ? null : localStorage

    constructor(){
        if (typeof window !== 'undefined'){
            if (navigator && navigator.product == "ReactNative"){
                this._env = REACT_NATIVE
            }
        }
    }

    done = () => Manager.init()

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
    setStoreEngine = (engine: any) => this._storeEngine = engine
}

export default new Config()