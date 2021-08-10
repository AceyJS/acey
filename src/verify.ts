import Model from './model'
import Errors from './errors'

import { splitPath, getValueAtPath } from '../src/model/utils'

export const verifyIfContainAConnectedModel = (m: Model) => {
    let doesContain = false

    const recur = (v: any) => {

        if (doesContain)
            return

        if (Model.IsModel(v)){
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

export const verifyIfContainsObject = (m: Model) => {

    const treatValue = (path: string, to: Model) => {
        const pathSplited = splitPath(path)
        const lastKey = pathSplited[pathSplited.length - 1]
        pathSplited.splice(pathSplited.length - 1, 1)
        const v = getValueAtPath(pathSplited, to)

        if (v.is().collection()){
        } else if (!Model.IsCollection(v.state[lastKey])){
        } else if (v && !!v.state && Model.IsCollection(v.state[lastKey])){
        } else {
            throw new Error("Design doesn't allow nesting 2 and more objects. You should create a Model for each of your object and nest them. See example here: https://gist.github.com/Fantasim/7a5b02c3e3d381b4a8489d580b4d2642")
        }
    }

    const recur = (o: any, path: string) => {
        if (Model._isArray(o))
            treatValue(path, m)
        else if (Model._isObject(o))
            for (let key in o)
                recur(o[key], path + '.' + key)
        else 
            treatValue(path, m)
    }

    recur(m.to().plain(), '')

}

export const verifyIfContainArrayOfModel = (v: Model) => {

    let doesContain = false
    const recur = (v: any) => {

        if (doesContain)
            return

        if (!v || v instanceof Date)
            return

        if (Model.IsModel(v)){
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
                if (Model.IsModel(e)){
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
    verifyIfContainsObject(m)
}