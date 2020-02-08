import _ from 'lodash'
import { STORE } from './store'
import Model from './model'

let roundID = 1

export const mapStateToPropsMiddleware = (newStore: any, mapStateToPropsFunction: any) => {
    let hasChanged: boolean = false

    //if state or param is empty
    if (_.isEmpty(newStore) || _.isEmpty(mapStateToPropsFunction(newStore))){
        return {}
    }
    
    //This is suceptible to fuck
    const prevStore = STORE.get().getState()

    if (_.isEmpty(prevStore)){
        return mapStateToPropsFunction(newStore)
    }
   
    const selection = [mapStateToPropsFunction(prevStore), mapStateToPropsFunction(newStore)]
    let treated = []
    for (let i = 0; i < selection.length; i++){
        let o: any = {}
        for (let key in selection[i]){
            let f = selection[i][key]
            if (Model.isModelClass(f)){
                f = f.toPlain()
                
            }
            o[key] = f
        }
        treated.push(o)
    }

    if (_.isEqual(treated[0], treated[1])){
        hasChanged = true
    }

    let ret = mapStateToPropsFunction(newStore)

    //if the state has changed about the parameters passed
    if (hasChanged){
        //we assign a new round ID to force the state to update. 
        roundID++
        ret.roundID = roundID.toString()
    }
    return ret
}