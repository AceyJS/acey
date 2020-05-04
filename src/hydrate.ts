import Model from './model'

const splitPath = (path: string) => {
    return path.replace(/^[\|]+|[\|]+$/g, ".").split('.').filter(function(x){
        return (x !== (undefined || null || ''));
    });
}

const getValueAtPath = (path: string, to: Model) => {
    const pathSplited = splitPath(path)
    for (let i = 0; i < pathSplited.length; i++){
        if (to instanceof Model)
            to = to.state[pathSplited[i]]
        else
            to = to[pathSplited[i]]
    }
    return to
}

const updateInState = (value: any, path: string, to: Model ) => {
    const pathSplited = splitPath(path)
    const lastKey = pathSplited[pathSplited.length - 1]
    pathSplited.splice(pathSplited.length - 1, 1)

    const v: any = getValueAtPath(pathSplited.join('.'), to)
    if (v instanceof Model && v.isCollection()){
        v.setState(v.toListClass(value))
    } else if (v instanceof Model && !Model._isCollection(v.state[lastKey])){
        v.setState({[lastKey]: value})
    } else if (Model._isCollection(v.state[lastKey])){
        const collec = v.state[lastKey]
        collec.setState(collec.toListClass(value))
    } else 
        v[lastKey] = value
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