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