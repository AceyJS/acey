import { Model, Collection } from '../../index'

export const USER_DATA = {
    first_name: 'Mike',
    created_at: new Date(),
    id: '1234567',
    age: 24,
    indexs: [1, 3, 22, -1345],
    device: {
        id: '4gremog',
        connected_at: new Date(),
        n_connexion: 10,
        ips: ['IP_1', 'IP_2']
    },
    post_list: [{
        id: 'ID_1',
        content: 'CONTENT_1',
        created_at: new Date(),
        random: 232,
        device_origin: {
            id: '869504334',
            connected_at: new Date('08/08/2019'),
            n_connexion: 134,
            ips: ['IP_1', 'IP_2']
        }
    },
    {
        id: 'ID_2',
        content: 'CONTENT_2',
        created_at: new Date(),
        random: 4356,
        device_origin: {
            id: '869504334',
            connected_at: new Date('08/08/2019'),
            n_connexion: 134,
            ips: ['IP_1', 'IP_2']
        }
    },
    {
        id: 'ID_3',
        content: 'CONTENT_3',
        created_at: new Date(),
        random: 65,
        device_origin: {
            id: '869504334',
            connected_at: new Date('08/08/2019'),
            n_connexion: 134,
            ips: ['IP_1', 'IP_2']
        }
    }]
}

export const USER_DATA_2 = {
    first_name: 'Jon',
    created_at: new Date('07/07/2019'),
    id: '354',
    age: 21,
    indexs: [2, 0, -1],
    device: {
        id: '534245',
        connected_at: new Date('09/09/2017'),
        n_connexion: 23,
        ips: ['PI_FK', 'PI_FK903245']
    },
    post_list: [{
        id: 'DI_12',
        content: 'Cr5T_1',
        created_at: new Date('10/10/2010'),
        random: 23456,
        device_origin: {
            id: '354535353',
            connected_at: new Date('01/01/2019'),
            n_connexion: 13454,
            ips: ['PI_FK', 'PI_FK903245']
        }
    },
    {
        id: 'DI_13',
        content: 'Cr5T_2',
        created_at: new Date('10/10/2010'),
        random: 87,
        device_origin: {
            id: '354535353',
            connected_at: new Date('01/01/2019'),
            n_connexion: 13454,
            ips: ['PI_FK', 'PI_FK903245']
        }
    },
    {
        id: 'DI_14',
        content: 'Cr5T_3',
        created_at: new Date('10/10/2010'),
        random: 546,
        device_origin: {
            id: '354535353',
            connected_at: new Date('01/01/2019'),
            n_connexion: 13454,
            ips: ['PI_FK', 'PI_FK903245']
        }
    }]
}

const DEFAULT_DEVICE_STATE = {
    id: '',
    connected_at: new Date(),
    n_connexion: 0,
    ips: []
}

export class DeviceModel extends Model {

    constructor(initialState: any = DEFAULT_DEVICE_STATE, options: any){
        super(initialState, options)
    }

    ID = () => this.state.id
    connectedAt = () => this.state.connected_at
    nConnexion = () => this.state.n_connexion
    getIPs = () => this.state.ips
}

const DEFAULT_POST_STATE = {
    id: '',
    content: '',
    created_at: new Date(),
    random: 0,
    device_origin: undefined
}

export class PostModel extends Model {

    constructor(initialState: any = DEFAULT_POST_STATE, options: any){
        super(initialState, options)
        this.setState({
            device_origin: new DeviceModel(initialState.device_origin, this.option().kids())
        })
    }

    ID = () => this.state.id
    content = () => this.state.content
    createdAt = () => this.state.created_at
    random = () => this.state.random
    deviceOrigin = () => this.state.device_origin
}

export class PostCollection extends Collection {
    constructor(initialState: any[] = [], options: any){
        super(initialState, PostModel, options)
    }
}

const DEFAULT_USER_STATE = {
    first_name: '',
    created_at: new Date(),
    id: '',
    age: 0,
    indexs: [],
    device: undefined,
    post_list: [],
}

export class UserModel extends Model {

    constructor(initialState: any = DEFAULT_USER_STATE, options: any){
        super(initialState, options)
        this.setState({
            device: new DeviceModel(initialState.device, this.option().kids()),
            post_list: new PostCollection(initialState.post_list, this.option().kids()),
        })
    }

    device = () => this.state.device
    postList = () => this.state.post_list
    firstName = () => this.state.first_name
    createdAt = () => this.state.created_at
    ID = () => this.state.id
    age = () => this.state.age
    indexs = () => this.state.indexs
}