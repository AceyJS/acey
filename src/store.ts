import { createStore as createStoreNative } from 'redux'
import Model from './model'

export const STORE = new Model({})

export const createStore = (...props: any) => {
    const store = createStoreNative.apply(null, props);
    STORE.set(store)
    return store
}
