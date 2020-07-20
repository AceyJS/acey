import { expect } from 'chai';
import 'mocha';

import { 
    USER_DATA,
    UserModel,
    PostCollection
} from './datas'

describe('Testing toPlain (Model/Collection)', () => {
    const User = new UserModel(USER_DATA, undefined)
    const PostList = new PostCollection(USER_DATA.post_list, undefined)

    it('output should be equal with initialState (Model) 1/2', () => {
      expect(User.to().string()).to.equal(JSON.stringify(USER_DATA));
    });
    it('output should be equal with initialState (Model) 2/2', () => {
        expect(User.device().to().string()).to.equal(JSON.stringify(USER_DATA.device));
    });
    it('output should be equal with initialState (Collection)', () => {
        expect(PostList.to().string()).to.equal(JSON.stringify(USER_DATA.post_list));
    });
});
