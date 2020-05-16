/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {config} from 'acey'
import AsyncStorage from '@react-native-community/async-storage'

console.log('HERE?')
config.setStoreEngine(AsyncStorage)
config.done()



AppRegistry.registerComponent(appName, () => App);
