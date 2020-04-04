import { Model } from 'react-ascey'

const DEFAULT_DATA = {
    name: '',
    gender: '',
    age: 0
}

class User extends Model {

    constructor(user = DEFAULT_DATA){
        super(user)
    }

    getName = (): string => this.get().name
    getGender = (): string => this.get().gender
    getAge = (): number => this.get().age
}

export default User