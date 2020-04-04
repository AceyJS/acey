import { bindControllers, createStore } from 'react-ascey'
import UserController from './controllers/user'

export default createStore(
    bindControllers([
        UserController
    ])
)