/* 1. import createStore and bindStates */
import {createStore, bindControllers } from 'react-ascey'
import CounterController from './controllers/counter'

const store = createStore(
    /* 2. list the connected controllers with Ascey in an array */
    bindControllers([
        CounterController,
    ])
)

export default store