import { Controller } from 'react-ascey'
import UserModel from '../models/user'

class User extends Controller {

    constructor(){
        super(UserModel, 'user')
    }

    fetchUserData = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.dispatch((user: UserModel) => {
            user.setState({first_name: 'Mike', age: 20, created_at: new Date('01/01/2020')})
        })
        return 200
    }


}

export default new User()