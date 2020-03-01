import { Controller, State } from 'react-ascey'
import UIState from '../states/ui'
import WindowModel from '../models/window'

class UIController extends Controller {

    constructor(stateClass: State){
        super(stateClass)
    }
    
    updateWindowDimensions = (dimensions = {width: 0, height: 0}) => {
        this.dispatch((state: any) => {
            state.window = new WindowModel(dimensions)
        })
    }
}


export default new UIController(UIState)