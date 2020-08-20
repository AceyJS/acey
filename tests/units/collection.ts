import { Collection } from '../../index'
import { expect } from 'chai';
import 'mocha';
import _ from 'lodash'

import { 
    PostCollection,
    PostModel,
    USER_DATA
} from './datas'

describe('Collection: initialization', () => {
    it('Collection of Collection (must error)', () => {
        class CollectionOfCollection extends Collection {
            constructor(data: any[] = [], options: any){
                super(data, [PostCollection, CollectionOfCollection], options)
            }
        }    
        expect(() => new CollectionOfCollection([], undefined)).to.throw(Error)
    })
})

describe('Collection: methods', () => {
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
    const postModel = new PostModel(post, undefined)

    it('push', () => {
        PostList.push(post)
        expect(PostList.count()).to.eq(1)  
        expect(PostList.state[0].to().string()).to.eq(postModel.to().string())  

        PostList.hydrate([])
        PostList.push(postModel)
        expect(PostList.state[0].to().string()).to.eq(postModel.to().string())  
    })

    it('count', () => {
        expect(PostList.count()).to.eq(1)
    })

    it('concat', () => {
        const copy = PostList.copy()
        copy.concat([post, postModel])
        expect(copy.to().string()).to.eq(new PostCollection([post, postModel, post], undefined).to().string())
    })

    it('delete', () => {
        PostList.push(postModel)
        PostList.delete(postModel)
        PostList.delete(post)
        expect(PostList.count()).to.eq(0)
    })

    it('deleteBy', () => {
        PostList.push(postModel)
        PostList.push(Object.assign({}, post, {id: '58903', content: 'polipo'}))
        expect(PostList.count()).to.eq(2)
        PostList.deleteBy({'id': '123456'})
        expect(PostList.count()).to.eq(1)
        expect(PostList.state[0].ID()).to.eq('58903')
    })

    it('deleteIndex', () => {
        PostList.push(postModel)
        const index = PostList.findIndex({'id': postModel.ID()})
        expect(index).to.gt(-1)
        expect(PostList.count()).to.eq(2)
        PostList.deleteIndex(index)
        expect(PostList.count()).to.eq(1)
        expect(PostList.state[0].ID()).to.eq('58903')
    })

    it('find', () => {
        PostList.push(postModel)
        expect((PostList.find({'id': postModel.ID()}) as PostModel).to().string()).to.eq(postModel.to().string())
    })

    it('findIndex', () => {
        const index = PostList.findIndex({'id': '58903'})
        expect(index).to.eq(0)
    })

    it('filter', () => {
        PostList.push(Object.assign({}, post, {id: '3249', content: '90ef', random: 8923}))
        PostList.push(Object.assign({}, post, {id: '9143289', content: 'f23j0f930f2f', random: 12039}))
        PostList.push(Object.assign({}, post, {id: 'fepof', content: '211', random: 8923}))

        expect(PostList.filter((o: PostModel) => o.random() === 8923).count() ).to.eq(2)
        expect(PostList.filter({id: '9143289'}).count()).to.eq(1)
    })

    it('indexOf', () => {
        expect(PostList.indexOf(PostList.nodeAt(4))).to.eq(4)
    })

    it('limit', () => {
        expect(PostList.limit(2).count()).to.eq(2)
    })

    it('map', () => {
        let prevIndex = -1
        PostList.map((node: PostModel, index: number) => {
            expect(index).to.be.gt(prevIndex)
            prevIndex = index
            expect(PostList.nodeAt(index)?.to().string()).to.eq(node.to().string())
        })
    })

    it('newCollection', () => {
        const a = PostList.newCollection(PostList)
        const b = PostList.newCollection(PostList.to().plain())
        expect(a.to().string()).to.eq(b.to().string())
    })

    it('newNode', () => {
        const a = PostList.newNode(PostList.state[0])
        const b = PostList.newNode(PostList.state[0].to().plain())
        expect(a.to().string()).to.eq(b.to().string())
    })

    it('nodeAt', () => {
        const a = PostList.nodeAt(2)
        const b = PostList.state[2]
        expect(a?.to().string()).to.eq(b.to().string())
    })

    it('offset', () => {
        expect(PostList.offset(2).count()).to.eq(3)
        expect(PostList.offset(0).count()).to.eq(5)
    })

    it('orderBy', () => {
        let prevRandom = 100000000
        PostList.orderBy(['random'], ['desc']).map((node: PostModel, index: number) => {
            expect(node.random()).to.be.lte(prevRandom)
            prevRandom = node.random()
        })
        prevRandom = 0
        PostList.orderBy(['random'], ['asc']).map((node: PostModel, index: number) => {
            expect(node.random()).to.be.gte(prevRandom)
            prevRandom = node.random()
        })
    })

    it('pop', () => {
        PostList.pop()
        expect(PostList.count()).to.eq(4)
        expect((PostList.nodeAt(PostList.count() - 1) as PostModel).ID()).to.eq('9143289')
    })

    it('reduce', () => {
        const ret = PostList.reduce((total: number, node: PostModel) => total += node.random(), 0)
        expect(ret).to.eq(8923 + 12039 + 1001 + 1001)
    })

    it('reverse', () => {
        const head = PostList.nodeAt(0)
        const tail = PostList.nodeAt(PostList.count() -1)
        const newList = PostList.reverse()
       
        const newHead = newList.nodeAt(0)
        const newTail = newList.nodeAt(newList.count() -1)

        expect(head?.to().string()).to.eq(newTail?.to().string())
        expect(newHead?.to().string()).to.eq(tail?.to().string())
    })

    it('shift', () => {
        const last = PostList.nodeAt(PostList.count() - 1)
        PostList.shift()
        PostList.shift()
        PostList.shift()
        expect(PostList.nodeAt(0)?.to().string()).to.eq(last?.to().string())
    })

    it('slice', () => {
        PostList.push(Object.assign({}, post, {id: '57849', content: 'gij43g34', random: 342}))
        PostList.push(Object.assign({}, post, {id: '13912111', content: 'fewnew few fwefw', random: 12}))
        PostList.push(Object.assign({}, post, {id: '1230-124-121', content: 'fdjsfnd we dwe fewfwq', random: 392}))

        expect(PostList.slice(1, 4).count()).to.eq(3)
        expect(PostList.slice(0, 4).count()).to.eq(4)
        expect(PostList.slice(0, 10).count()).to.eq(4)
        expect(PostList.slice(2).count()).to.eq(2)
        expect(PostList.slice().count()).to.eq(4)
        expect(PostList.slice(1).count()).to.eq(3)
        expect(PostList.slice(4).count()).to.eq(0)
    })

    it('splice', () => {
        PostList.push(Object.assign({}, post, {id: '57849', content: 'gij43g34', random: 342}))
        PostList.push(Object.assign({}, post, {id: '13912111', content: 'fewnew few fwefw', random: 12}))
        PostList.push(Object.assign({}, post, {id: '1230-124-121', content: 'fdjsfnd we dwe fewfwq', random: 392}))

        PostList.splice(4)
        expect(PostList.count()).to.eq(4)
        PostList.splice(0, -1, Object.assign({}, post, {id: '57849', content: 'gij43g34', random: 342}), Object.assign({}, post, {id: '13912111c', content: 'fewnew few fwefw', random: 12}))
        expect((PostList.nodeAt(1) as PostModel).ID()).to.eq('13912111c')
        expect(PostList.count()).to.eq(6)
        PostList.splice(2, 3)
        expect(PostList.count()).to.eq(3)
    })

    it('updateAt', () => {
        PostList.updateAt(Object.assign({}, post, {id: '57849', content: 'gij43g34', random: 342}), 10)
        expect(PostList.count()).to.eq(4)
        expect((PostList.nodeAt(3) as PostModel).ID()).to.eq('57849')
        const node2 = new PostModel(PostList.nodeAt(2)?.to().plain(), undefined)
        node2.setState({'id': 'HELLO_GUYS'})
        PostList.updateAt(node2, 2)
        expect((PostList.nodeAt(2) as PostModel).ID()).to.eq('HELLO_GUYS')
    })

    it('updateWhere', () => {
        expect(PostList.filter({'id': 'HELLO_GUYS'}).count()).to.eq(1)
        expect(PostList.updateWhere({'id': 'HELLO_GUYS'}, {'id': 'HELLO_GIRLS'}).value).to.eq(1)
        expect(PostList.filter({'id': 'HELLO_GIRLS'}).count()).to.eq(1)
    })

    it('copy', () => {
        expect(PostList.copy().is().equal(PostList))
    })

    it('append', () => {
        let list = PostList.copy()
        list.append([PostList.nodeAt(0)?.to().plain()])
        expect(list.count()).to.eq(5)
        
        expect((list.nodeAt(0) as PostModel).to().string()).to.eq((list.nodeAt(4) as PostModel).to().string())
        const newList = list.copy()
        newList.append([list.nodeAt(1), list.nodeAt(2)])

        expect(newList.count()).to.eq(7)
    })

    it('prepend', () => {
        expect(PostList.nodeAt(0)?.is().equal(PostList.nodeAt(1))).to.eq(false)
        const list = PostList.copy()
        list.prepend([PostList.nodeAt(0)?.to().plain()])
        expect(list.count()).to.eq(5)
        expect(list.nodeAt(0)?.is().equal(list.nodeAt(1)))
    })

    it('chunk', () => {
        const list = PostList.chunk(2)
        expect(list.length).to.eq(2)
        expect((list[0] as PostCollection).nodeAt(1)?.is().equal(PostList.nodeAt(1)))
        expect((list[1] as PostCollection).nodeAt(1)?.is().equal(PostList.nodeAt(3)))
        expect(list[0].count()).to.equal(2)
        expect(list[1].count()).to.equal(2)
    })

    it('nth', () => {
        PostList.nth(-1)?.is().equal(PostList.nodeAt(3))
        PostList.nth(0)?.is().equal(PostList.nodeAt(0))
        PostList.nth(-2)?.is().equal(PostList.nodeAt(2))
        PostList.nth(-3)?.is().equal(PostList.nodeAt(1))
    })

    it('uniq', () => {
        expect(PostList.count()).to.eq(4)
        expect(PostList.uniq().count()).to.eq(3)
    })

    it('uniqBy', () => {
        expect(PostList.uniqBy( (o: PostModel) => o.deviceOrigin().nConnexion() ).count()).to.eq(1)
        expect(PostList.uniqBy('id').count()).to.eq(3)
    })
})