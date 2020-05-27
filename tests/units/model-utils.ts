import { expect } from 'chai';
import 'mocha';

import { 
    USER_DATA,
    UserModel,
    PostCollection,
    PostModel,
    USER_DATA_2
} from './datas'



describe('Model: setState', () => {
    const User = new UserModel(USER_DATA, undefined)
    const User2 = new UserModel(USER_DATA_2, undefined)
    const PostList = new PostCollection(USER_DATA.post_list, undefined)
    const ConnectedPostList = new PostCollection(USER_DATA.post_list, {connected: true})

    it('setting a Collection', () => {
        expect(() => User.setState(PostList)).to.throw(Error)
    });
    it('setting an Array', () => {
        expect(() => User.setState(PostList.toPlain())).to.throw(Error)
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
        expect(() => User.setState({post_list: [new PostModel(USER_DATA.post_list[0], undefined), new PostModel(USER_DATA.post_list[1], undefined) ]})).to.throw(Error)
    });
    it('setting an array', () => {
        expect(() => User.setState({post_list: USER_DATA.post_list})).to.not.throw(Error)
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
    const User = new UserModel(USER_DATA, undefined)
    const PostList = new PostCollection(USER_DATA.post_list, undefined)

    it('deleting a key on a Collection', () => {
        expect(() => PostList.deleteKey('l')).to.throw(Error)
    });
    it('deleting a key on a Model : testing no Error', () => {
        expect(() => User.deleteKey('l')).to.not.throw(Error)
    });
    it('deleting a key on a Model : testing result', () => {
        const key = 'first_name'
        const User = new UserModel(USER_DATA, undefined)
        const data = User.toPlain()
        User.deleteKey(key)
        delete data[key]
        expect(User.toString()).to.equal(JSON.stringify(data))
    });
});


