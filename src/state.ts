import Model from './model'

interface IParams {
    STORE_KEY: string,
	DEFAULT_STATE: any,
}

export default abstract class State extends Model {
    
    private storeKey: string
    private defaultState: any 

    abstract new(state: any): State 

    constructor(state: any, storeKey: string){
        super(state)
        this.storeKey = storeKey
        this.defaultState = this.toPlain()
    }

    public getStoreKey = (): string => this.storeKey
    public getDefaultState = (): any => this.defaultState

    /*
        Get the reducer config to add in the array expected by the initialize function
        the creation of the store.
        eg: https://github.com/Fantasim/react-ascey-example/blob/master/src/redux/store.ts#L5&L13
    */

    public getReducerConfig = (): IParams => {
        return {
            STORE_KEY: this.getStoreKey(),
            DEFAULT_STATE: this.getDefaultState()
        }
    }
}