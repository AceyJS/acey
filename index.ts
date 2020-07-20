import { IAction } from './src/model/index'
import { IOptions } from './src/model/option'
import Model from './src/model/index'
import Collection from './src/collection'
import manager from './src/manager/index'
import config from './src/config'

export {
    IOptions, 
    IAction,
    Model,
    Collection,
    manager,
    config,
}

const Ob: any = {
    Model,
    Collection,
    manager,
    config,
}

export default Ob
