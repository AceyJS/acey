import State from './state'
import { CurrentState } from './reducer'
import { STORE } from './store'
import _ from 'lodash'

export default class Controller {
    private stateClass: any

    constructor(stateClass: any){
        this.stateClass = stateClass
    }
    
    public getAttachedStateClass = () => this.stateClass
    private _getReducerKey = (): string => this.getAttachedStateClass().getStoreKey()

    public getStore = () => STORE.get()

    //get the current (whole) redux store
    public getState = (): any => CurrentState.get()

    //get the current state binded with the controller
    public getAttachedState = (): any => CurrentState.get()[this._getReducerKey()]

    /*
        function to call to dispatch a new state
        e.g: https://github.com/Fantasim/react-ascey-example/blob/master/src/redux/controllers/user.ts#L44
    */
    public dispatch = (action: (state: State) => any) => {
        let state = this.extendLocal()
        action(state)
        this.getStore().dispatch({
            type: this._getReducerKey(),
            payload: state.toPlain()
        })
    }

    /*
        same than the extend function, but use the current store updated by react-ascey directly.
        so don't expect any thing as a parameter.
    */
    public extendLocal = (): any => {
        return this.getAttachedStateClass().new(this.getAttachedState())
    }

    /*
        take as parameter the entire redux state
        select and return the right State binded with the controller.
        
        info: this function is used most of the time in the mapStateToProps function
        in the components.
        eg: 
        const mapStateToProps = (state) => {
            return {
                token: UserController.extend(state).GetToken()
            }
        }

        eg2: https://github.com/Fantasim/react-ascey-example/blob/master/src/scenes/Home/index.js#L103
    */
    public extend = (store: any): any => {
        const key = this._getReducerKey()

        if (!store[key]){
            throw new Error("You must bind " + Object.getPrototypeOf(this.getAttachedStateClass()).constructor.name + " to your store")
        }
        try {
            return this.stateClass.new(store[key])
        } catch (e){
            console.log(e)
        }
    }
}
