import set from 'lodash.set'

import Model from './'
import Collection from '../collection'

export const STORE_OPTION = 'store'
const isStoreOption = (option: string) => option === STORE_OPTION
const DATE_PATTERN = '____AS-Date____'

const splitPath = (path: string) => {
    return path.replace(/^[\|]+|[\|]+$/g, ".").split('.').filter(function(x){
        return (x !== (undefined || null || ''));
    });
}

const getValueAtPath = (path: string, to: Model) => {
    const pathSplited = splitPath(path)
    for (let i = 0; i < pathSplited.length; i++){
        if (Model.IsModel(to))
            to = to.state[pathSplited[i]]
        else
            to = (to as any)[pathSplited[i]]
    }
    return to
}

const updateInState = (value: any, path: string, to: Model) => {
    const pathSplited = splitPath(path)
    const lastKey = pathSplited[pathSplited.length - 1]
    pathSplited.splice(pathSplited.length - 1, 1)
    
    const v: any = getValueAtPath(pathSplited.join('.'), to)

    if (Model.IsModel(v) && v.is().collection()){
        v.setState(v.to().listClass(value))
    } else if (Model.IsModel(v) && !Model.IsCollection(v.state[lastKey])){
        v.setState({[lastKey]: value})
    } else if (v && !!v.state && Model.IsCollection(v.state[lastKey])){
        const collec = v.state[lastKey] as Collection
        collec.setState(collec.to().listClass(value))
    } else {
        if (lastKey && v)
            v[lastKey] = value
    }
}

export const hydrate = (from: any, to: Model) => {
    
    const recur = (o: any, path: string) => {
        if (Model._isArray(o))
            updateInState(o, path, to)
        else if (Model._isObject(o)){
            for (let key in o)
                recur(o[key], path + '.' + key)
        } else
            updateInState(o, path, to)
    }

    recur(from, '')
}

//Return the state to JSONified object.
//It implies that the state is an array, an object or a Model typed class (model or extended from Model)
export type TObjectStringAny = { [char: string]: any } 
export const toPlain = (m: TObjectStringAny | Array<any>, option: string | void): any => {
    const ret: any = {}; 
    
    const recur = (o: any, path: string) => {
        
        //if this is a plain object
        if (Model._isObject(o) && Object.keys(o).length > 0){
            for (var key in o)
                recur(o[key], !path ? key : path + '.' + key)
            return
        }

        //if this is an array
        if (Model._isArray(o) && o.length > 0){
            for (let i = 0; i < o.length; i++)
                recur(o[i], path + '.' + i.toString())
            return
        }

        //if this is a Model class
        if (Model.IsModel(o)){
            recur(o.state, path)
            return
        }

        if (option && isStoreOption(option) && o instanceof Date){
            o = `${DATE_PATTERN}${o.getTime().toString()}`
        }

        set(ret, path, o)
    }

    recur(m, '')

    if (Model._isArray(m)){
        if (!ret[''])
            return []
        return ret['']
    }

    return ret
}

export const ParseJSONLocallyStored = (data: string) => {
    const ret: any = {}; 

    const recur = (o: any, path: string) => {
        
        //if this is a plain object
        if (Model._isObject(o) && Object.keys(o).length > 0){
            for (var key in o)
                recur(o[key], !path ? key : path + '.' + key)
            return
        }

        //if this is an array
        if (Model._isArray(o) && o.length > 0){
            for (let i = 0; i < o.length; i++)
                recur(o[i], path + '.' + i.toString())
            return
        }

        if (typeof o === 'string' && o.startsWith(DATE_PATTERN)){
            o = new Date(parseInt(o.replace(DATE_PATTERN, '')))
        }

        set(ret, path, o)
    }

    recur(JSON.parse(data), '')
    return ret
}