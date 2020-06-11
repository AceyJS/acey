import Model from './model'
import { TConnected } from './connect'
import Errors from './errors'

export const verifyIfContainAConnectedModel = (m: Model) => {
    let doesContain = false

    const recur = (v: any) => {

        if (doesContain)
            return

        if (v instanceof Model){
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

        if (v instanceof Model){
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
                if (e instanceof Model){
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
export const verifyIfOnlyModelsAndFunction = (v: TConnected[], origin: string) => {
    const defaultError = `${origin}'s first parameter must be an Array of Model, Collection, or unexecuted getters.`

    if (!Array.isArray(v)){
        throw new Error(defaultError)
    }

    for (let i = 0; i < v.length; i++){
        const e = v[i]
        if (!(e instanceof Model) && !(typeof e === 'function'))
            throw new Error(`
                ${defaultError}
                Please check the ${i+1}${i == 0 ? 'st' : (i == 1) ? 'nd' : 'st'} element of the Array. Currently typed as a : ${typeof e}.
            `)
    }
}

export const verifyAllModel = (m: Model) => {
    if (verifyIfContainArrayOfModel(m))
        throw Errors.forbiddenArrayModel(m)
    if (verifyIfContainAConnectedModel(m.state)){
        throw Errors.forbiddenNestedConnexion(m)
    }
}