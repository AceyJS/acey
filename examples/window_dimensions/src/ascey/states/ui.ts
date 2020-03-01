import { State } from 'react-ascey'

import WindowModel from '../models/window'

export const INITIAL_STATE = {
    window: {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

class UIState extends State {

    new = (state = INITIAL_STATE) => new UIState(state)
    constructor(state = INITIAL_STATE) {
        super({
            window: new WindowModel(state.window)
        }, 'ui')
    }

    public get window(){
        return this.get().window
    }

    public set window(wd: WindowModel){
        this.run((state: any) => state.window = wd)
    }
}

export default new UIState(INITIAL_STATE)