import Model from './model'
import _ from 'lodash'

const CONNEXION_KEY = '__connexionKEY'
const ASCEY_ID = '__asceyID'

let COUNT = 2000
let arrayStateToProps: any = [];

const dupObject = (o: any) => {
    const ret: any = {}
    for (let key in o){
        ret[key] = o[key]
    }
    return ret
}

const getCounter = () => COUNT
const incrementCounter = () => COUNT++

export const listToJSON = (list: any[]) => {
    const ret = []
    for (let e of list){
        if (e instanceof Model)
            ret.push(e.toPlain())
        else {
            const res = e()
            if (res instanceof Model)
                ret.push(res.toPlain())
            else 
                ret.push(res)
        } 
    }
    return JSON.stringify(ret)
}

export const mapStateToPropsMiddleware = (list: any[], connexionKey: number) => {

    const currentState = {data: listToJSON(list), id: getCounter()}
    const newState: any = {}
    newState[CONNEXION_KEY] = connexionKey

    if (!arrayStateToProps[connexionKey]){
        //add to the state a new ID
        newState[ASCEY_ID] = currentState.id
        incrementCounter()
        arrayStateToProps[connexionKey] = currentState
        return dupObject(newState)
    }

    let hasChanged = false
    //last state JS object typed
    const lastState = arrayStateToProps[connexionKey]
    if (lastState.data !== currentState.data)
        hasChanged = true

    if (hasChanged){
        //we change the counter ID
        newState[ASCEY_ID] = currentState.id
        //we set the prev state with the current one
        arrayStateToProps[connexionKey] = currentState
        incrementCounter()
    } else {
        newState[ASCEY_ID] = lastState.id
    }

    return dupObject(newState)
}