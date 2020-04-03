import Model from './model'

export default abstract class State extends Model {
    private _defaultState: any 

    constructor(state: any){
        super(state)
        this._defaultState = this.toPlain()
    }

    public defaultState = (): any => this._defaultState
}