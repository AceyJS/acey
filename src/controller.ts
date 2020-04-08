import Model from './model'
import { STORE } from './store'
import _ from 'lodash'

interface Type<T> extends Function { new (...args: any[]): T; }

export default class Controller {

    private _IDKey : string
    private _model: Model
    private _modelClass: Type<Model>

    constructor(modelClass: Type<Model>, IDKey: string){
        this._IDKey = IDKey
        this._model = new modelClass(undefined)
        this._modelClass = modelClass
    }

    private _store = () => STORE.get()

    private _updateState = () => {
        const store = this.getStore()
        const key = this.getIDKey()

        const newState = new (this.getStateClass())(store[key])
        this.getState().copyDeep(newState)
    }

    protected getStore = (): any => this._store().getState()
    public getIDKey = () => this._IDKey

    public getStateClass = (): Type<Model> => this._modelClass
    public getState = (): any => this._model

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
