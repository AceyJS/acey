import { Collection } from '../../index'
import { expect } from 'chai';
import 'mocha';

import { 
    PostCollection,
    PostModel,
    USER_DATA
} from './datas'

class CollectionOfCollection extends Collection {
    constructor(data: any[] = [], options: any){
        super(data, PostCollection, options)
    }
}

describe('Collection: initialization', () => {
    it('Collection of Collection (must error)', () => {
        expect(() => new CollectionOfCollection([], undefined)).to.throw(Error)
    })
})

describe('Collection: Push', () => {
    const PostList = new PostCollection([], undefined)

    const post = {
        id: '123456',
        content: 'keiofeomfge',
        created_at: new Date('11/11/2018'),
        random: 1001,
        device_origin: {
            id: '0930g',
            connected_at: new Date('03/04/2020'),
            n_connexion: 103,
            ips: ['0.0.0.1', '192.167.0.3']
        }
    }

    it('Push an object', () => {
        PostList.push(post)
        const postModel = new PostModel(post, undefined)
        expect(PostList.count()).to.eq(1)  
        expect(PostList.state[0].toString()).to.eq(postModel.toString())  

        PostList.hydrate([])
        PostList.push(postModel)
        expect(PostList.state[0].toString()).to.eq(postModel.toString())  

    })
    
})