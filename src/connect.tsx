import React, { useState, useEffect, forwardRef } from 'react'
import _ from 'lodash'
import STORE from './store'
import { verifyIfOnlyModelsAndFunction } from './verify'
import Model from './model'
import { listModelAndGetterToJSON, hash } from './lib'

export type TConnected = Function | Model

export const connect = (list: TConnected[] = []): Function => {
    verifyIfOnlyModelsAndFunction(list, 'connect')
    return (App: React.ComponentClass) => {
        return forwardRef((props: any, ref: React.Ref<any>) => {
            const [listJSON, setListJSON] = useState(listModelAndGetterToJSON(list))

            useEffect(() => {
                let prev = listJSON
                STORE.subscribe(() => {
                    const current = listModelAndGetterToJSON(list)
                    if (prev != current){
                        prev = current
                        setListJSON(current)
                    }
                })
            }, [])

            return <App {...props} __aceyTransitionID={hash(listJSON)} ref={ref} />
        })
    }
}

export const useAcey = (list: TConnected[] = []) => {
    const [listJSON, setListJSON] = useState(listModelAndGetterToJSON(list))

    useEffect(() => {
        let prev = listJSON
        STORE.subscribe(() => {
            const current = listModelAndGetterToJSON(list)
            if (prev != current){
                prev = current
                setListJSON(current)
            }
        })
    }, [])
}

