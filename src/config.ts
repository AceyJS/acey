const REACT = 'react'
const REACT_NATIVE = 'react-native'
const NEXT_JS = 'next-js'

class Config {

    private _env = REACT
    private _isDev = true
    private _logger = false
    private _storeEngine: any = typeof window === 'undefined' ? null : localStorage

    constructor(){}

    isNextJSServer = () => this.isNextJS() && typeof window === 'undefined'
    isNextJS = () => this._env == NEXT_JS
    isReactNative = () => this._env == REACT_NATIVE
    isReact = () => this._env == REACT

    setEnvAsNextJS = () => this._env = NEXT_JS

    setEnvAsReactNative = () => this._env = REACT_NATIVE
    setEnvAsReact = () => this._env = REACT

    isDevMode = () => this._isDev
    setAsProduction = () => this._isDev = false

    //Todo: logger feature
    isLoggerEnabled = () => this._logger
    enableLogger = () => this._logger = true

    //Todo: implemenent react-native store engine
    getStoreEngine = () => this._storeEngine
    setStoreEngine = (engine: any) => this._storeEngine = engine

}

export default new Config()