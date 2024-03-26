(BigInt.prototype as any).toJSON = function () {
    return { $bigint: this.toString() };
};
import { IAction } from './src/model/index'
import { IUXOptions as IModelOptions } from './src/model/option'

import Model from './src/model/index'
import Collection from './src/collection'
import manager from './src/manager/index'
import config from './src/config'

export {
    IModelOptions, 
    IAction,
    Model,
    Collection,
    manager,
    config,
}
