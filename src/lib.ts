import Model from './model'
import {TConnected} from './connect'

export const listModelAndGetterToJSON = (list: TConnected[]) => {
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

export const hash = (s: string): number => {
    let hash = 0;
    for (var i = 0; i < s.length; i++) {
        const char = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}