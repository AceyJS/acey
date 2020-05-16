import {IOptions, IAction } from './src/model'
import { TConnected } from './src/connect'
import Model from './src/model'
import Collection from './src/collection'
import manager from './src/manager'
import config from './src/config'
import {connect, useAcey } from './src/connect'

export {
    TConnected,
    IOptions, 
    IAction,
    Model,
    Collection,
    manager,
    config,
    connect,
    useAcey
}

const Ob: any = {
    Model,
    Collection,
    manager,
    config,
    connect,
    useAcey
}

export default Ob
