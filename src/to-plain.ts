import Model from './model'
import objectPath from "object-path"

  //Return the state to JSONified object.
    //It implies that the state is an array, an object or a Model typed class (model or extended from Model)
export const toPlain = (m: Model): any => {
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
        if (o instanceof Model){
            recur(o.state, path)
            return
        }

        objectPath.set(ret, path, o)
    }

    recur(m.state, '')

    if (m.isCollection()){
        if (!ret[''])
            return []
        return ret['']
    }

    return ret
}