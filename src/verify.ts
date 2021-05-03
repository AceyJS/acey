import Model from './model'
import Errors from './errors'
import { isModelInstance } from './lib'

export const verifyIfContainAConnectedModel = (m: Model) => {
    let doesContain = false

    const recur = (v: any) => {

        if (doesContain)
            return

        if (isModelInstance(v)){
            if (v.is().connected()){
                doesContain = true
                return
            }
            if (v.is().collection()){
                for (let e of v.state)
                    recur(e)
            } else {
                for (let key in v.state)
                    recur(v.state[key])
            }
            return
        }

        if (Array.isArray(v)){
            for (let e of v)
                recur(e)
            return
        }

        if (typeof v === 'object'){
            for (let key in v)
                recur(v[key])
        }
    }

    recur(m)
    return doesContain
}

export const verifyIfContainArrayOfModel = (v: Model) => {

    let doesContain = false
    const recur = (v: any) => {

        if (doesContain)
            return

        if (!v || v instanceof Date)
            return

        if (isModelInstance(v)){
            if (v.is().collection()){
                for (let e of v.state)
                    recur(e)
            } else {
                for (let key in v.state)
                    recur(v.state[key])
            }
            return
        }

        if (Array.isArray(v)){
            for (let e of v){
                if (isModelInstance(e)){
                    doesContain = true
                    return
                }
                recur(e)
            }
            return
        }

        if (typeof v === 'object'){
            for (let key in v)
                recur(v[key])
        }
    }

    recur(v)
    return doesContain
}

export const verifyAllModel = (m: Model) => {
    if (verifyIfContainArrayOfModel(m))
        throw Errors.forbiddenArrayModel(m)
    if (verifyIfContainAConnectedModel(m.state)){
        throw Errors.forbiddenNestedConnexion(m)
    }
}