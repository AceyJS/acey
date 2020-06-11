import { IAction } from './src/model/index'
import { IOptions } from './src/model/option'

import { TConnected } from './src/connect'
import Model from './src/model/index'
import Collection from './src/collection'
import manager from './src/manager/manager'
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
