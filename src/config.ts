const REACT = 'react'
const REACT_NATIVE = 'react-native'
const NEXT_JS = 'next-js'

class Config {

    _env = REACT
    _isDev = true
    _logger = false

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

    enableLogger = () => this._logger = true
}

export default new Config()