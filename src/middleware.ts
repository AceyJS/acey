import Model from './model'
import _ from 'lodash'

const CONNEXION_KEY = '__connexionKEY'
const ASCEY_ID = '__asceyID'

let COUNT = 2000
let arrayStateToProps: any = [];

const toPlainFull = (v: any) => {
    const ret: any = {}
    for (let key in v){
        if (isModelInstance(v[key]))
            ret[key] = convertDeepModel(v[key])
        else
            ret[key] = _.cloneDeepWith(v[key])
    }
    return ret
}

const areSameNKeys = (o1: Object, o2: Object) => Object.keys(o1).length == Object.keys(o2).length
const isModelInstance = (v: any) => v instanceof Model
const convertDeepModel = (v: Model) => _.cloneDeep(v.toPlain())

const dupObject = (o: any) => {
    const ret: any = {}
    for (let key in o){
        ret[key] = o[key]
    }
    return ret
}

const getCounter = () => COUNT
const incrementCounter = () => COUNT++

export const mapStateToPropsMiddleware = (state: any, connexionKey: number) => {

    //if the state has never been recorded
    if (!arrayStateToProps[connexionKey]){
        //add to the state a new ID
        state[CONNEXION_KEY] = connexionKey
        state[ASCEY_ID] = getCounter()
        incrementCounter()
        //assign it in the array
        arrayStateToProps[connexionKey] = toPlainFull(state)
        return dupObject(state)
    }

    let hasChanged = false

    //last state JS object typed
    const lastState = arrayStateToProps[connexionKey]
    //merging the ascey elements not present in the new state
    state = Object.assign({}, lastState, state)
    //current state JS object typed
    const plainedState = toPlainFull(state)

    //if the number of keys are different
    if (!areSameNKeys(lastState, plainedState))
        hasChanged = true
    else {
        for (let key in plainedState){
            //if the current value is not equal with the previous one
            if (!_.isEqual(lastState[key], plainedState[key]))
                hasChanged = true
        }
    }

    //if something has changed with the previous recorded state
    if (hasChanged){
        //we change the counter ID
        state[ASCEY_ID] = getCounter()
        //we set the prev state with the current one
        arrayStateToProps[connexionKey] = toPlainFull(state)
        incrementCounter()
    }


    //we return the state duplicated
    return dupObject(state)
}