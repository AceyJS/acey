import { Model } from 'react-ascey'

const DEFAULT_DATA = {
    first_name: '',
    age: 0,
    created_at: new Date(),
    device: undefined
}

const DEFAULT_DEVICE_DATA = {
    phone_name: 'iPhone X',
    version: 10
}

class Device extends Model {

    constructor(data = DEFAULT_DEVICE_DATA){
        super(data)
    }

    getPhoneName = () => this.get().phone_name
    getVersion = () => this.get().version

}

class User extends Model {

    constructor(data = DEFAULT_DATA){
        super(Object.assign({}, data, {
            device: new Device(data.device)
        }))
    }

    getName = () => this.get().first_name
    getAge = () => this.get().age
    getDevice = () => this.get().device
    getCreatedAt = () => this.get().created_at
}

export default User