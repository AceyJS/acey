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
    console.log(Post3.super().option().key())
    const Post4 = new PostModel(post)

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
            PostList.push(Post2.to().plain()).save()
            expect(i).to.equal(3)
            manager.subscribers().reset()
            expect(manager.subscribers().count()).to.equal(0)
        })

        it('store manager', () => {
            expect(JSON.stringify(manager.store().node('post2'))).to.eq(Post2.to().string())
            manager.store().set({post2: post})
            expect(JSON.stringify(manager.store().node('post2'))).to.not.eq(Post2.to().string())
            expect(JSON.stringify(manager.store().node('post2'))).to.eq(JSON.stringify(post))
        })

        it('pending hydration', () => {
            manager.pendingHydrationStore().set({'post2': post})
            Post2.setState({content: 'wijfeofwefweofwe'})
            expect(Post2.to().string()).to.eq(JSON.stringify(post2))
            expect(manager.pendingHydrationStore().count()).to.eq(1)
            manager.pendingHydrationStore().reset()
            expect(manager.pendingHydrationStore().count()).to.eq(0)
            manager.pendingHydrationStore().set({'post2': post})
            manager.pendingHydrationStore().execute()
            expect(Post2.to().string()).to.eq(JSON.stringify(post))
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
            expect(PostList.super().option().nodeModel()).to.equal(PostModel)
            expect(PostList.super().option().nodeModel()).to.not.equal(PostCollection)
        })
        it('nodeCollection', () => {
            expect(PostList.super().option().collectionModel()).to.equal(PostCollection)
            expect(PostList.super().option().collectionModel()).to.not.equal(PostModel)
        })
        it('kids', () => {
            const node = PostList.nodeAt(0)
            PostList.push(post2)
            const node2 = PostList.nodeAt(1)

            expect(node?.action().save).to.equal(PostList.kids().save)
            /* COOKIE ENABLE */
            //expect(node.action().cookie).to.equal(PostList.super().kids().cookie)
            expect(node?.action().store).to.equal(PostList.kids().store)

            expect(node?.action().save).to.equal(node2?.action().save)
            // expect(node.action().cookie).to.equal(node2.action().cookie)
            expect(node?.action().store).to.equal(node2?.action().store)

            expect(node?.action().save).to.equal(node2?.kids().save)
            // expect(node.action().cookie).to.equal(node2.kids().cookie)
            expect(node?.action().store).to.equal(node2?.kids().store)
        })
    })

    describe('Model: watch', () => {
        
        it('store', () => {
            let i = 0;
            let j = 0;
            const watch1 = PostList.watch().store((prevStateStore, newStateStore) => {
                expect(JSON.stringify(prevStateStore)).to.not.eq(JSON.stringify(newStateStore))
                i++
            })
            const watch2 = PostList.watch().store((prevStateStore, newStateStore) => {
                expect(JSON.stringify(prevStateStore)).to.not.eq(JSON.stringify(newStateStore))
                j++
            })
            PostList.push(post2).save()
            const node = PostList.nodeAt(1)
            node?.setState({content: 'coco rio'}).save()
            node?.setState({content: 'coco rio2'})
            node?.setState({content: 'coco rio3'})
            node?.action().save()
            expect(i).to.eq(3)
            expect(j).to.eq(3)
            watch1.stop()
            node?.setState({content: 'coco rio4'}).save()
            expect(i).to.eq(3)
            expect(j).to.eq(4)
            watch2.stop()
            node?.setState({content: 'coco rio5'}).save()
            expect(i).to.eq(3)
            expect(j).to.eq(4)
        });

        it('state', () => {
            let i = 0;
            let j = 0;
            const watcher1 = PostList.watch().state((prevState, newState) => {
                expect(JSON.stringify(prevState)).to.not.eq(JSON.stringify(newState))
                i++
            })
            PostList.push(post2) //1
            PostList.pop() //2
            PostList.shift() //3 
            PostList.push(post2) //4
            PostList.delete(post2) //5
            PostList.delete({id: '90cccc'}) 
            PostList.push(post2) //6
            PostList.deleteBy({id: post2.id}) //7
            PostList.push(post2) //8
            expect(i).to.eq(8)
            PostList.deleteBy({id: '8934rnefwe'}) 
            PostList.deleteIndex(PostList.findIndex(post2)) // 9
            expect(i).to.eq(9)
            PostList.shift()
            expect(i).to.eq(9)
            PostList.push(post2) //10
            PostList.push(post2) //11
            expect(i).to.eq(11) 
            PostList.splice(PostList.count() - 1, 1) //12
            PostList.push(post2) //13
            expect(i).to.eq(13)
            PostList.updateAt(post, PostList.findIndex(post2)) //14
            expect(i).to.eq(14)
            const head = PostList.nodeAt(0)
            head?.setState({content: 'Miky :)'}) //15
            head?.deleteKeys('content') //16
            expect(i).to.eq(16)
            head?.deleteKeys('id', 'random') //17
            expect(i).to.eq(17)
            const count = PostList.count()
            PostList.delete(head) //18
            const newCount = PostList.count()
            expect(count - 1).to.eq(newCount)
            expect(i).to.eq(18)
            const watcher2 = PostList.watch().state((prevState, newState) => {
                expect(JSON.stringify(prevState)).to.not.eq(JSON.stringify(newState))
                j++
            })
            PostList.push(post)
            PostList.push(post2)
            expect(i).to.eq(20)
            expect(j).to.eq(2)
            PostList.deleteBy({random: 9332})
            expect(i).to.eq(21)
            expect(j).to.eq(3)
            expect(PostList.count()).to.eq(1)            
            PostList.deleteIndex(3)
            expect(i).to.eq(21)
            expect(j).to.eq(3)
            expect(PostList.count()).to.eq(1)       
            watcher1.stop()
            PostList.pop()
            expect(i).to.eq(21)
            expect(j).to.eq(4)
            expect(PostList.count()).to.eq(0)
            PostList.push(post2).save()
            const node = PostList.nodeAt(0)
            node?.setState({content: 'hey zin'}).save()
            expect(j).to.eq(6)
            watcher2.stop()
            node?.setState({content: 'hey zine'}).save()
            PostList.deleteIndex(0).save()
            expect(j).to.eq(6)
            let h = 0;
            const watcher3 = Post.watch().state((prevState, newState) => {
                expect(JSON.stringify(prevState)).to.not.eq(JSON.stringify(newState))
                h++
            })
            Post.deleteKeys('random')
            Post.setState({'content': 'new content'})
            watcher3.stop()
            Post.setState({'content': 'new content!'})
            expect(h).to.equal(2)

        });

        // it('all', () => {
        //     let i = 0;
        //     const watch = PostList.watch().all((prevState, newState) => {
        //         expect(JSON.stringify(prevState)).to.not.eq(JSON.stringify(newState))
        //         i++
        //     })
        //     PostList.push(post2).save()
        //     expect(i).to.eq(2)
        //     const node = PostList.nodeAt(PostList.count() - 1)
        //     const action = node?.setState({content: 'YESSSS!'})
        //     expect(i).to.eq(3)
        //     action?.save()
        //     expect(i).to.eq(4)
        //     watch.stop()
        //     node?.setState({content: 'PO:)'}).save()
        //     expect(i).to.eq(4)        
        //     node?.setState({content: 'PO:('})
        //     node?.setState({content: 'PO:('})
        //     node?.setState({content: 'PO:('})
        //     node?.setState({content: 'PO:('})
        //     node?.setState({content: 'PO:('})
        //     node?.setState({content: 'PO:('})
        //     node?.setState({content: 'PO:('})
        //     expect(i).to.eq(4)        
        // })
    
    });
    


}

main()