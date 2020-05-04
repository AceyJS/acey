import {IOptions, IAction } from './src/model'
import { TConnected } from './src/connect'

export { 
    TConnected,
    IOptions, 
    IAction
}

export { default as Model } from './src/model'
export { connect, useAcey } from './src/connect'
export { default as Collection } from './src/collection'
export { default as store } from './src/store'
export { default as config } from './src/config'