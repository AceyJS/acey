import { expect } from 'chai';
import 'mocha';

import { 
    PostCollection,
    PostModel,
} from './datas'
import { manager } from '../../index'

const CONNECTED_MODEL_COUNT = 5

const main = async () => {

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

    const post2 = {
        id: '39405i340',
        content: 'wijfeofwefweofwe',
        created_at: new Date('12/01/2020'),
        random: 9332,
        device_origin: {
            id: '23rr0322',
            connected_at: new Date('09/02/2019'),
            n_connexion: 122,
            ips: ['0.0.0.1', '0.07.2.4']
        }
    }

    const PostList = new PostCollection([], {connected: true, key: 'post-list'})
    const Post = new PostModel(post, {connected: true, key: 'post'}) 
    const Post3 = new PostModel(post, {connected: true})
    const Post4 = new PostModel(post, {key: 'post5'})

    let Post2: PostModel

    await manager.init('test')

    describe('Manager', () => {

        it('Check connected models presence', () => {
            expect(manager.models().count()).to.equal(CONNECTED_MODEL_COUNT - 1)
            expect(manager.models().exist('post')).to.eq(Post)
            expect(manager.models().exist('post-list')).to.eq(PostList)
            expect(manager.models().exist('post-liste')).to.eq(undefined)

            expect(manager.models().node('post')).to.eq(Post)
            expect(manager.models().node('post-list')).to.eq(PostList)
            expect(manager.models().node('post-liste')).to.eq(undefined)

            Post2 = new PostModel(post2, {connected: true, key: 'post2'})
            expect(manager.models().count()).to.equal(CONNECTED_MODEL_COUNT)
        })

        it(`Check status`,  () => {
            expect(manager.isInitialized()).to.equal(true)
        })

        it('subscribe notification + store dispatch + execute transition + set store', () => {
            let i = 0;
            manager.subscribers().add(() => {
                i++
            })
            Post2.setState({content: 'bipbip'}).save()
            expect(i).to.equal(2)
            PostList.push(Post2.toPlain()).save()
            expect(i).to.equal(3)
            manager.subscribers().reset()
            expect(manager.subscribers().count()).to.equal(0)
        })

        it('store manager', () => {
            expect(JSON.stringify(manager.store().node('post2'))).to.eq(Post2.toString())
            manager.store().set({post2: post})
            expect(JSON.stringify(manager.store().node('post2'))).to.not.eq(Post2.toString())
            expect(JSON.stringify(manager.store().node('post2'))).to.eq(JSON.stringify(post))
        })

        it('pending hydration', () => {
            manager.pendingHydrationStore().set({'post2': post})
            Post2.setState({content: 'wijfeofwefweofwe'})
            expect(Post2.toString()).to.eq(JSON.stringify(post2))
            expect(manager.pendingHydrationStore().count()).to.eq(1)
            manager.pendingHydrationStore().reset()
            expect(manager.pendingHydrationStore().count()).to.eq(0)
            manager.pendingHydrationStore().set({'post2': post})
            manager.pendingHydrationStore().execute()
            expect(Post2.toString()).to.eq(JSON.stringify(post))
        })

    })

    describe('Connected Model: is', () => {
        it('key generated', () => {
            expect(Post.is().keyGenerated()).to.eq(false)
            expect(Post3.is().keyGenerated()).to.eq(true)
        })
        it('collection', () => {
            expect(Post.is().collection()).to.eq(false)
            expect(PostList.is().collection())
        })
        it('equal', () => {
            expect(Post.is().equal(Post3)).to.eq(true)
            Post.setState({content: 'azerty'})
            expect(Post.is().equal(Post3)).to.eq(false)
        })
        it('connected', () => {
            expect(Post.is().connected())
            expect(Post4.is().connected()).to.eq(false)
        })
    })

    describe('Connected Model: option', () => {
   
        it('nodeModel', () => {
            expect(PostList.option().nodeModel()).to.equal(PostModel)
            expect(PostList.option().nodeModel()).to.not.equal(PostCollection)
        })
        it('nodeCollection', () => {
            expect(PostList.option().collectionModel()).to.equal(PostCollection)
            expect(PostList.option().collectionModel()).to.not.equal(PostModel)
        })
        it('kids', () => {
            const node = PostList.nodeAt(0)
            PostList.push(post2)
            const node2 = PostList.nodeAt(1)

            expect(node.action().save).to.equal(PostList.option().kids().save)
            expect(node.action().cookie).to.equal(PostList.option().kids().cookie)
            expect(node.action().localStore).to.equal(PostList.option().kids().localStore)

            expect(node.action().save).to.equal(node2.action().save)
            expect(node.action().cookie).to.equal(node2.action().cookie)
            expect(node.action().localStore).to.equal(node2.action().localStore)

            expect(node.action().save).to.equal(node2.option().kids().save)
            expect(node.action().cookie).to.equal(node2.option().kids().cookie)
            expect(node.action().localStore).to.equal(node2.option().kids().localStore)
        })
    })


}

main()