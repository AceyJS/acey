import State from './state'
import { CurrentState } from './reducer'
import { STORE } from './store'
import _ from 'lodash'

export default class Controller {
    private _stateClass: any

    constructor(stateClass: any){
        this._stateClass = stateClass
    }

    private _getReducerKey = (): string => this.getAttachedStateClass().storeKey()
    private _getStateObject = (): any => this._store().getState()[this._getReducerKey()]
    private _store = () => STORE.get()

    public getStoreObject = () => this._store().getState()
    public getAttachedStateClass = () => this._stateClass

    /*
        function to call to dispatch a new state
    */
    public dispatch = (action: (state: State) => any) => {
        const state = this.extendLocal()
        action(state)
        this._store().dispatch({
            type: this._getReducerKey(),
            payload: state.toPlain()
        })
    }

    /*
        same than the extend function, but use the current store updated by react-ascey directly.
        so don't expect any thing as a parameter.
    */
    public extendLocal = (): any => {
        return this.getAttachedStateClass().new(this._getStateObject())
    }

    /*
        take as parameter the entire store object
        select and return the right State binded with the controller.
        
        info: this function is used most of the time in the mapStateToProps function
        in the components.
        eg: 
        const mapStateToProps = (state) => {
            return {
                token: UserController.extend(state).GetToken()
            }
        }
    */
    public extend = (store: any): any => {
        const key = this._getReducerKey()

        if (!store[key]){
            throw new Error("You must bind " + Object.getPrototypeOf(this.getAttachedStateClass()).constructor.name + " to your store")
        }
        try {
            return this.getAttachedStateClass().new(store[key])
        } catch (e){
            console.log(e)
        }
    }
}
