import { 
    createStore,
    bindStates
} from 'react-ascey'

import UIState from './states/ui'

export default createStore(bindStates([
    UIState
]))
