import { createStore, bindControllers } from 'react-ascey'
import UserController from '../ascey/controllers/user'

export default createStore(bindControllers(
    [
        UserController
    ]
))
