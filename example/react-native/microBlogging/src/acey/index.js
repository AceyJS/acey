import AsyncStorage from '@react-native-community/async-storage'
import { config } from 'acey'
import PostCollection from './collections/post-collection'

config.setStoreEngine(AsyncStorage)
config.done()

export const PostList = new PostCollection([], {connected: true, key: 'postlist'})