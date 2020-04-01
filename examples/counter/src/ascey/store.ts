/* 1. import createStore and bindStates */
import {createStore, bindStates} from 'react-ascey'
import CounterState from './states/counter'

const store = createStore(
    /* 2. list the states you want to connect with Ascey in an array */
    bindStates([
        CounterState
    ])
)

export default store