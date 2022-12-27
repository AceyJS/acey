const {Model } = require('../../index')
import 'mocha';
import { expect } from 'chai';

import { 
    USER_DATA_2,
    USER_DATA,
    UserModel,
    PostCollection
} from './datas'
import { IOptions } from '../../src/model/option';


const DEFAULT_LAST_COST_CHANGE_STATE = {
    price: 0,
}

const DEFAULT_SOCIETY_STATS_STATE = {
    last_thread_cost_change: DEFAULT_LAST_COST_CHANGE_STATE,
    last_proposal_cost_change: DEFAULT_LAST_COST_CHANGE_STATE
}

const DEFAULT_STATE  = {
    stats: DEFAULT_SOCIETY_STATS_STATE,
}

class SocietyModel extends Model {

    constructor(state = DEFAULT_STATE, options: IOptions | void){
        super(state, options)
    }
}

describe('Testing hydrate (Model/Collection)', () => {
    const User = new UserModel(USER_DATA)
    const User2 = new UserModel(USER_DATA_2)

    const PostList = new PostCollection(USER_DATA.post_list)
    const PostList2 = new PostCollection(USER_DATA_2.post_list)
    const PostList3 = new PostCollection([])

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
    it("Test hydrating wrong data",  () => {
        const data = {
            "stats": {
                "last_thread_cost_change": {
                    "price": 10000000000,
                },
                "last_proposal_cost_change": {
                    "price": 500000000000,
                }
            }
        }
        const s = new SocietyModel(undefined)
        expect(() => {
            s.hydrate(data)
        }).to.throw(Error)
    })
});
