import { expect } from 'chai';
import 'mocha';

import { 
    PostCollection,
    PostModel,
} from './datas'
import { manager } from '../../index'

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
    let Post2: PostModel

    await manager.init('test')

    describe('Manager', () => {

        it('Check connected models presence', () => {
            expect(manager.models().count()).to.equal(3)
            expect(manager.models().exist('post')).to.eq(Post)
            expect(manager.models().exist('post-list')).to.eq(PostList)
            expect(manager.models().exist('post-liste')).to.eq(undefined)

            expect(manager.models().node('post')).to.eq(Post)
            expect(manager.models().node('post-list')).to.eq(PostList)
            expect(manager.models().node('post-liste')).to.eq(undefined)

            Post2 = new PostModel(post2, {connected: true, key: 'post2'})
            expect(manager.models().count()).to.equal(4)
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


}

main()