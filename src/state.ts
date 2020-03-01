import Model from './model'

interface IParams {
    STORE_KEY: string,
	DEFAULT_STATE: any,
}

export default abstract class State extends Model {
    
    private _storeKey: string
    private _defaultState: any 

    abstract new(state: any): State 

    constructor(state: any, storeKey: string){
        super(state)
        this._storeKey = storeKey
        this._defaultState = this.toPlain()
    }

    public storeKey = (): string => this._storeKey
    public defaultState = (): any => this._defaultState

    /*
        eg: https://github.com/Fantasim/react-ascey/blob/master/src/reducer.ts#L15
    */

    public getReducerConfig = (): IParams => {
        return {
            STORE_KEY: this.storeKey(),
            DEFAULT_STATE: this.defaultState()
        }
    }
}