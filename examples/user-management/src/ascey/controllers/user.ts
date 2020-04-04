import { Controller } from 'react-ascey'
import UserState from '../states/user'

class UserController extends Controller {

    constructor(userState: any){
        super(userState, 'user')
    }

    fetchUser = async () => {
        //timeout 1000ms
        await new Promise((resolve) => setTimeout(resolve, 1000))

        this.dispatch((state: UserState) => {
            state.getUser().setState({
                name: 'Mike',
                age: 28,
                gender: 'male'
            })
            state.setDevice('iPhone X')
        })
    }
}


export default new UserController(UserState)