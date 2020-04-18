import { bindActionCreators, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

export { default as Model } from './src/model';
export { subscribe, useAscey } from './src/connect';
export { default as Collection } from './src/collection';
export { default as store, STORE } from './src/store' 
export { bindActionCreators, compose, Provider, applyMiddleware }