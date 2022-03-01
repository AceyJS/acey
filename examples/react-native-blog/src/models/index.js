import AsyncStorage from '@react-native-async-storage/async-storage'
import { config } from 'acey'
import { PostCollection } from './post'

export const postlist = new PostCollection([], {connected: true, key: 'postlist'})

config.setStoreEngine(AsyncStorage)
config.done()
