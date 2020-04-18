import { useState, useEffect } from 'react'
import _ from 'lodash'
import { connect as nativeConnect } from 'react-redux'
import { mapStateToPropsMiddleware, listToJSON } from './middleware'
import { STORE } from './store'
import { checkIfOnlyModelsAndFunction } from './debug'
import Model from './model'

let ID = 0
export type TConnected = Function | Model
export const subscribe = (list: TConnected[] = [], ...props: any) => {
    checkIfOnlyModelsAndFunction(list, 'subscribe')
    //id of the connected component.
    const mstpID = ID
    ID += 1

    const mps = (state: any) => {
        return mapStateToPropsMiddleware(list, mstpID)
    }

    const DEFAULT_OPTIONS = {
        withRef: false
    }

    return nativeConnect(mps, null, null, Object.assign({}, DEFAULT_OPTIONS, props[0]))
}

export const useAscey = (list: TConnected[] = []) => {
    checkIfOnlyModelsAndFunction(list, 'useAscey')
    const [listJSON, setListJSON] = useState(listToJSON(list))

    useEffect(() => {
        STORE.getReduxStore().subscribe(() => {
            const current = listToJSON(list)
            if (listJSON != current){
                setListJSON(current)
            }
        })
    }, [])
}

