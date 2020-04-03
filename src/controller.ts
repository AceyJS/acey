import State from './state'
import { STORE } from './store'
import _ from 'lodash'

interface Type<T> extends Function { new (...args: any[]): T; }

export default class Controller {

    private _IDKey : string
    private _state: State
    private _stateClass: Type<State>

    constructor(stateClass: Type<State>, IDKey: string){
        this._IDKey = IDKey
        this._state = new stateClass(undefined)
        this._stateClass = stateClass
    }

    private _store = () => STORE.get()

    private _updateState = () => {
        const store = this.getStore()
        const key = this.getIDKey()

        const newState = new (this.getStateClass())(store[key])
        this.getState().copyDeep(newState)
    }

    public getStore = (): any => this._store().getState()
    public getIDKey = () => this._IDKey

    public getStateClass = (): Type<State> => this._stateClass
    public getState = (): any => this._state

    /*
        function to call to dispatch a new state
    */
    public dispatch = (action: (state: any) => any) => {
        const state = this.getState()
        action(state)

        this._store().dispatch({
            type: this.getIDKey(),
            payload: state.toPlain()
        })
        this._updateState()
    }
}
