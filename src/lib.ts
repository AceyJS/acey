import Manager from './manager'
import Model from './model'

export const hash = (s: string): number => {
    let hash = 0;
    for (var i = 0; i < s.length; i++) {
        const char = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export const generateUniqModelKey = (m: Model): string => {
    let i = 1;
    let key = '_auto_' + m.constructor.name
    let suffix;
    while (true){
        suffix = '_' + i.toString()
        if (!Manager.models().exist(key + suffix))
            break;
        i++
    }
    return key + suffix
}

export const isModelInstance = (v: any) => {
    const methodList = [`_set`, `_handleStateChanger`, `_setPrevState`, `_setPrevStateStore`, `localStore`, `is`, `watch`, `action`, `save`, `setState`, `deleteKeys`, `hydrate`, `kids`, `to`] 
    if (typeof v === 'object' && v !== null && !Array.isArray(v) ){
        for (let meth of methodList){
            if (!v.hasOwnProperty(meth)){
                return false
            }
        }
        return true
    }
    return false
}

export const isCollectionInstance = (v: any) => {
    if (!isModelInstance(v)){
        return false
    }

    const methodList = [
        `arrayOf`, `append`, `chunk`, `concat`, `count`, `copy`, `delete`, `deleteAll`, `deleteBy`, `deleteIndex`, `find`, `findIndex`, `filter`, `filterIn`, `first`, `forEach`, `groupBy`, `indexOf`,
        `last`, `limit`, `map`, `newCollection`, `newNode`, `nodeAt`, `nth`, `offset`, `orderBy`, `pop`, `prepend`, `push`, `reduce`, `reverse`, `shift`, `slice`, `splice`, `updateAll`, `updateAt`,
        `updateWhere`, `uniq`, `uniqBy`, `_getCollectionModel`, `_getNodeModel`, `_newCollectionModelInstance`, `_newNodeModelInstance`
    ]
    for (let meth of methodList){
        if (!v.hasOwnProperty(meth)){
            return false
        }
    }
    return true
}

export const reviver = (key: any, value: any) =>
  value !== null &&
  typeof value === "object" &&
  "$bigint" in value &&
  typeof value.$bigint === "string"
    ? BigInt(value.$bigint)
    : value;
