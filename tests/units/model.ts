import { expect } from 'chai';
import 'mocha';
import { Model } from '../../index'

import { 
    USER_DATA,
    UserModel,
    PostCollection,
    PostModel,
    USER_DATA_2
} from './datas'



describe('Model: setState', () => {
    const User = new UserModel(USER_DATA)
    const User2 = new UserModel(USER_DATA_2)
    const PostList = new PostCollection(USER_DATA.post_list)
    const ConnectedPostList = new PostCollection(USER_DATA.post_list, {connected: true})

    it('setting a Collection', () => {
        expect(() => User.setState(PostList)).to.throw(Error)
    });
    it('setting an Array', () => {
        expect(() => User.setState(PostList.to().plain())).to.throw(Error)
    });
    it('setting a Bool', () => {
        expect(() => User.setState(true)).to.throw(Error)
    });
    it('setting a Number', () => {
        expect(() => User.setState(12345.33)).to.throw(Error)
    });
    it('setting a String', () => {
        expect(() => User.setState("Hello")).to.throw(Error)
    });
    it('setting a Date', () => {
        expect(() => User.setState(new Date())).to.throw(Error)
    });
    it('setting null', () => {
        expect(() => User.setState(null)).to.throw(Error)
    });
    it('setting NaN', () => {
        expect(() => User.setState(NaN)).to.throw(Error)
    });
    it('setting a Model', () => {
        expect(() => User.setState(User)).to.throw(Error)
    });
    it('setting Object with known key', () => {
        expect(() => User.setState({first_name: 'Louis'})).to.not.throw(Error)
    });
    it('setting Object with a not known key', () => {
        expect(() => User.setState({pppppp23: 123456})).to.not.throw(Error)
    });
    it('setting an array of Model', () => {
        expect(() => User.setState({post_list: [new PostModel(USER_DATA.post_list[0]), new PostModel(USER_DATA.post_list[1]) ]})).to.throw(Error)
    });
    it('setting an array', () => {
        expect(() => User.setState({ post_list: USER_DATA.post_list })).to.throw(Error)
    });
    it('setting a Collection in an object', () => {
        expect(() => User.setState({post_list: PostList})).to.not.throw(Error)
    });
    it('setting a Model in an object', () => {
        expect(() => User.setState({ole: User2})).to.not.throw(Error)
    });
    it('setting a Connected Model/Collection in an object', () => {
        expect(() => User.setState({ole: ConnectedPostList})).to.throw(Error)
    });
});

describe('Model: deleteKey', () => {
    const User = new UserModel(USER_DATA)
    const PostList = new PostCollection(USER_DATA.post_list)

    it('deleting a key on a Collection', () => {
        expect(() => PostList.deleteKeys('l')).to.throw(Error)
    });
    it('deleting a key on a Model : testing no Error', () => {
        expect(() => User.deleteKeys('l')).to.not.throw(Error)
    });
    it('deleting a key on a Model : testing result', () => {
        const key = 'first_name'
        const User = new UserModel(USER_DATA)
        const data = User.to().plain()
        User.deleteKeys(key)
        delete data[key]
        expect(User.to().string()).to.equal(JSON.stringify(data))
    });
});

describe('Model: toListClass', () => {
    const User = new UserModel(USER_DATA)
    const PostList = new PostCollection([])

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

    it('call it from a Model', () => {
        expect(() => User.to().listClass([])).to.throw(Error)
    });
});


describe('Model: Local Storage and Date', () => {
    const User = new UserModel(USER_DATA)
    const PostList = new PostCollection(USER_DATA.post_list)

    it('from a Model', () => {
        const uStr = User.to().string()
        const uLocalStr = User.to().locallyStorableString()

        const parsedLocalStr = Model.ParseStoredJSON(uLocalStr)
        User.hydrate(parsedLocalStr)
        expect(User.to().string()).to.equal(uStr)
    });

    it('from a Collection', () => {
        const plStr = PostList.to().string()
        const uLocalStr = PostList.to().locallyStorableString()
        const parsedLocalStr = Model.ParseStoredJSON(uLocalStr)
        PostList.hydrate(parsedLocalStr)
        expect(PostList.to().string()).to.equal(plStr)
    });

});

describe('Model: BigInt', () => {
    
    interface IState {
        tick: BigInt
        liquidity: BigInt
    }
    
    class Slot0 extends Model {
        constructor(initialState: IState, options: any){
            super(initialState, options)
        }

        get = () => {
            return {
                tick: () => this.state.tick as BigInt,
                liquidity: () => this.state.liquidity as BigInt
            }
        }
    }

    it ('BigInt', () => {
        const slot0 = new Slot0({tick: BigInt(123456789), liquidity: BigInt(987654321)}, {connected: false})
        const slot1 = new Slot0({tick: BigInt(0), liquidity: BigInt(0)}, {connected: false})
        const uStr = slot0.to().string()
        const uLocalStr = slot0.to().locallyStorableString()
         const parsedLocalStr = Model.ParseStoredJSON(uLocalStr)
        slot0.hydrate(parsedLocalStr)

        expect(slot0.to().string()).to.equal(uStr)
        expect(slot0.get().tick()).to.equal(BigInt(123456789))
        expect(slot0.get().liquidity()).to.equal(BigInt(987654321))
        expect(slot1.get().tick()).to.equal(BigInt(0))
        expect(slot1.get().liquidity()).to.equal(BigInt(0))
        slot1.hydrate(slot0.to().plain())
        expect(slot1.get().tick()).to.equal(BigInt(123456789))
        expect(slot1.get().liquidity()).to.equal(BigInt(987654321))
    })
})




