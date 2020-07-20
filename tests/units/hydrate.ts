import { expect } from 'chai';
import 'mocha';

import { 
    USER_DATA_2,
    USER_DATA,
    UserModel,
    PostCollection
} from './datas'

describe('Testing hydrate (Model/Collection)', () => {
    const User = new UserModel(USER_DATA, undefined)
    const User2 = new UserModel(USER_DATA_2, undefined)

    const PostList = new PostCollection(USER_DATA.post_list, undefined)
    const PostList2 = new PostCollection(USER_DATA_2.post_list, undefined)
    const PostList3 = new PostCollection([], undefined)

    User.hydrate(USER_DATA_2)

    it('Use state should be equal to User2 state (Model)', () => {
        expect(User.toString()).to.equal(User2.toString());
    })
    it("User's device should be equal to User2's device (Model)", () => {
        expect(User.device().toString()).to.equal(User2.device().toString());
    })
    
    it('Test 1 hydration on Collection', () => {
        PostList2.hydrate(PostList.to().plain())
        expect(PostList2.toString()).to.equal(PostList.toString());
    });
    it('Test 2 hydration on Collection', () => {
        PostList2.hydrate([])
        expect(PostList3.toString()).to.equal(PostList2.toString());
    });
    it('Test 3 hydration on Collection', () => {
        PostList3.hydrate(PostList.to().plain())
        expect(PostList3.toString()).to.equal(PostList.toString());
    });
});
