const {Model, Collection   } = require("../../dist")

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

// export interface ILastCostChangeProposal {
//     created_at: number
//     price: number
//     index: number
//     pubkh: string
//     t: string
// }

// export interface IAuthor {
//     public_key_hashed: string
//     pp: string
//     username: string
// }

// export interface IAlias {
//     pp: string | null,
//     username: string,
//     address: string
// }

// export interface ICost {
//     thread: number
//     proposal: number
//     upvote: number
//     reaction_0: number
//     reaction_1: number
//     reaction_2: number
// }

// export interface IScriptOrigin {
//     tx_id: string | null
//     vout: number
// }

// export interface IScriptProposal {
//     origin: IScriptOrigin
//     pubkh: string
//     content_nonce: number
// }

// export interface IConstitutionRule {
//     title: string
//     content: string
// }

// export type TConstitution = IConstitutionRule[]


// export interface IConstitutionData {
//     proposal: IScriptProposal
//     constitution: TConstitution
// }

// export interface IContributorStats { 
//     addr: string
//     position: number
//     sid: number
// }

// export interface ISociety {
//     // id: number
//     // name: string
//     // created_at: Date
//     // currency_symbol: string
//     // description: string
//     // domain: string,
//     // currency_route_api: string
//     // pp: null
//     stats: ISocietyStats
//     // costs: ICost
//     // constitution: IConstitutionData
//     // contributor: IContributorStats
// }

const DEFAULT_ALIAS_STATE/*: IAlias */ = {
    pp: null,
    username: '',
    address: ''
}


// export interface ISocietyStats {
//     // last_height: number
//     // total_contributor: number
//     // active_addresses: number
//     // most_active_addresses: IAuthor[]
//     // circulating_supply: string
//     // circulating_vp_supply: string
//     last_thread_cost_change: ILastCostChangeProposal
//     last_proposal_cost_change: ILastCostChangeProposal
// }

const DEFAULT_LAST_COST_CHANGE_STATE /*: ILastCostChangeProposal */ = {
    // created_at: 0,
    price: 0,
    // index: 0,
    // pubkh: '',
    // t: '' 
}

const DEFAULT_SOCIETY_STATS_STATE /*: ISocietyStats */ = {
    // total_contributor: 0,
    // last_height: 0,
    // active_addresses: 0,
    // most_active_addresses: [] as any,
    // circulating_supply:  '',
    // circulating_vp_supply : '',
    last_thread_cost_change: DEFAULT_LAST_COST_CHANGE_STATE,
    last_proposal_cost_change: DEFAULT_LAST_COST_CHANGE_STATE
}

const DEFAULT_STATE_CONSTITUTION/* : IConstitutionData */ = {
    proposal: {
        origin: {
            tx_id: '',
            vout: -1
        },
        pubkh: '',
        content_nonce: -1
    },
    constitution: [] 
}

const DEFAULT_COSTS_STATE/*: ICost */ = {
    thread: 0, 
    proposal: 0, 
    upvote: 0, 
    reaction_0: 0, 
    reaction_1: 0, 
    reaction_2: 0
}

const DEFAULT_STATE /*: ISociety*/ = {
    // id: 0,
    // created_at: new Date(),
    // name: '',
    // description: '',
    // domain: '',
    // currency_route_api: '',
    // currency_symbol: '',
    // pp: null,
    stats: DEFAULT_SOCIETY_STATS_STATE,
    // contributor: {
    //     addr: '',
    //     position: 0,
    //     sid: 0,
    // },
    // constitution: DEFAULT_STATE_CONSTITUTION,
    // costs: DEFAULT_COSTS_STATE
}

class Alias extends Model {
    constructor(state/*: IAlias */ = DEFAULT_ALIAS_STATE, options){
        super(state, options) 
    }
}

class AliasCollection extends Collection {
    constructor(initialState /*: any*/, options){
        super(initialState, [Alias, AliasCollection], options)
    }
}

class SocietyStatsModel extends Model {
    
    constructor(state/*: ISocietyStats*/ = DEFAULT_SOCIETY_STATS_STATE, options){
        super(state, options)
        this.setState({
            // most_active_addresses: new AliasCollection(state.most_active_addresses, this.kids()),
        })
    }
}
class ConstitutionModel extends Model {

    constructor(initialState = DEFAULT_STATE_CONSTITUTION, options){
        super(initialState, options)
    }
}


class Costs extends Model {

    constructor(initialState = DEFAULT_COSTS_STATE, options){
        super(initialState, options)
    }
}


class SocietyModel extends Model {

    constructor(state/*: ISociety*/ = DEFAULT_STATE, options){
        super(state, options)
        this.setState({
            stats: new SocietyStatsModel(state.stats, this.kids()),
            // costs: new Costs(state.costs, this.kids()),
            // constitution: new ConstitutionModel(state.constitution, this.kids()),
        })
    }

}


const so = new SocietyModel(undefined, {connected: false})
so.hydrate(data)
console.log(so.to().plain())