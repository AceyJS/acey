import { State } from 'react-ascey'
import UserModel from '../models/user'

const DEFAULT_DATA = {
    user: undefined,
    device: ''
}

class UserState extends State {

    constructor(data = DEFAULT_DATA){
        super({
            user: new UserModel(data.user),
            device: data.device
        })
    }

    getUser = (): UserModel => this.get().user
    getDevice = (): string => this.get().device

    setUser = (user: any) => this.setState({ user: new UserModel(user) })
    setDevice = (device: string) => this.setState({ device })
}

export default UserState
