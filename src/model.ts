import objectPath from "object-path"
import _ from 'lodash'
import { STORE } from './store'
import { bindToReducer } from './bind'
import { checkIfContainArrayOfModel } from './debug'

type TOptionSave = Function | null

export interface IOptions {
    key: string
    connected: boolean,
    save: TOptionSave
}

export const DEFAULT_OPTIONS: IOptions = {
    key: '',
    connected: false,
    save: null
}

export interface IAction {
    save(): any
}


export default class Model {

    private _state: any = null
    private _defaultState: any = null
    private _options: IOptions = DEFAULT_OPTIONS
    protected __childOptions: IOptions = this._options

    constructor(state: any, ...props: any){
        this._handleInitializationWithOptions(props[0])
        this._set(state)
        this._defaultState = this.toPlain()
        this._setChildOptions()
    }

    public get options(){
        return _.cloneDeepWith(this._options)
    }

    public get state(){
        return this._state
    }

    public get defaultState(){
        return this._defaultState
    }

    private _setChildOptions = () => {
        const { save } = this.options
        this.__childOptions = Object.assign({}, this.__childOptions, {
            save: this.isConnected() || !save ? this._getConnectedActions().save : save
        })
    }

    private _handleInitializationWithOptions = (opt = DEFAULT_OPTIONS) => {

        this._options = Object.assign({}, DEFAULT_OPTIONS, opt)
        const { key } = this.options
        
        if (this.isConnected() && ((key && this._isKeyTaken(key)) || !key))
            this._setOption({key: this._generateKey()})
        
        if (this.isConnected())
            bindToReducer(this)
    }

    private _getConnectedActions = (): IAction => {
        const { save } = this.options
        return { save: this.isConnected() ? this._save : () => save ? save() : null }
    }

    private _setOption = (o: any) => this._options = Object.assign({}, this.options, o)

    private _set = (state: any = this.state): IAction => {
        if (this._isObject(state) || this._isArray(state)){
            this._state = state
        } else {
            if (!this.isCollection())
                throw new Error(`The state of a Model, can only be instanced and replaced with an object type.`)
            else 
                throw new Error(`The state of a Collection, can only be instanced and replaced with an array type.`)
        }
        return this._getConnectedActions()
    }

    private _save = () => {
        this.isConnected() && STORE.dispatch({
            type: this.options.key,
            payload: this.toPlain()
        })
    }

    public hydrate = (store: any) => {
        const {key} = this.options
        if (!this.isEmpty())
            this._checkArrayModel()

        key in store ? this.assignDeep(store[key]) : this.assignDeep(store)
        return this._set()
    }

    //Only usable in a Model/State
    public setState = (o: any) => {
        if (this.isCollection())
            return this._set(o)
        
        return this._set(Object.assign({}, this.state, o))
    }

    //Only usable in a Model/State
    public deleteKey = (key: string) => {
        if (this.isCollection())
            throw new Error(`deleteKey can't be used on a Collection`)

        delete this.state[key]
        return this._set(this.state)
    }
    /*
        This function copy the src Model class into the state of the current class
        It avoids the reference of the unchanged values to be changed when an update occurs
    */
    public copyDeep = (src: Model) => {

        const recur = (src: any, dest: any) => {

            //if the destination value is a Model type
            if (dest instanceof Model){
                const destState = dest.state
                const srcState = src.state

                //If the destination value is NOT a collection 
                if (!dest.isCollection()){
                    //We concat the src and dest state, and loop over it.
                    for (let key in srcState){
                        //if a value doesn't exist in dest and exist in src (DELETION)
                        if ( !(key in srcState) && (key in destState))
                            //we delete the key in the object
                            dest.deleteKey(key)
                        else {
                            const o: any = {}
                            //we restart the recursive function on the current value
                            o[key] = recur(srcState[key], destState[key])
                            dest.setState(o)
                        }
                    }
                //If the destination value is a collection
                } else {
                    //if the number of element in the collection are different between the src and the dest
                    if (destState.length != srcState.length)
                        //we directly change the reference of the array by the new one.
                        dest.setState(src.state)
                    else {
                        for (let i = 0; i < destState.length; i++)
                            //we restart the recursive function since each element is a Model.
                            //we want them to be handle by the first part of the recursive function.
                            recur(srcState[i], destState[i])
                    }
                }
                //we return the reference of dest to don't change the reference of the instanced Model class
                return dest

            //if the destination value is NOT a Model
            } else {

                //if the value is an object
                if (this._isObject(dest)){

                    //We concat the src and dest state, and loop over it.
                    for (let key in src){
                        //if the value exists in src and don't in dest
                        if ( !(key in dest) && (key in src))
                            //we delete it
                            delete dest[key]
                        else
                            //we restart the recursive function on the current value
                            dest[key] = recur(src[key], dest[key])
                    }
                }
                //if the value is an array
                if (this._isArray(dest)){
                    //recopying the array if the length is different 
                    if (dest.length != src.length)
                        dest = src.slice()
                    else {
                        for (let i = 0; i < dest.length; i++)
                            //restarting the recursive function on the current element.
                            dest[i] = recur(src[i], dest[i])
                        
                    }
                }
                //we return the value of src since there to assign it in the dest current model
                return src
            }
        }
        return recur(src, this)
    }

    assignDeep = (obj: any) => {

        const recur = (o: any, path: string) => {
    
            if (this._isArray(o))
                updateInState(o, path)
            else if (this._isObject(o)){
                for (let key in o)
                    recur(o[key], path + '.' + key)
            } else
                updateInState(o, path)
        }
    
        const getValueAtPath = (path: string) => {
            const pathSplited = path.replace(/^[\|]+|[\|]+$/g, ".").split('.').filter(function(x){
                return (x !== (undefined || null || ''));
            });
        
            let v = this
            for (let i = 0; i < pathSplited.length; i++){
                if (v instanceof Model)
                    v = v.state[pathSplited[i]]
                else
                    v = v[pathSplited[i]]
            }
            return v
        }
        
        const updateInState = (value: any, path: string) => {
            const pathSplited = path.replace(/^[\|]+|[\|]+$/g, ".").split('.').filter(function(x){
                return (x !== (undefined || null || ''));
            });
            const lastKey = pathSplited[pathSplited.length - 1]
            pathSplited.splice(pathSplited.length - 1, 1)
        
            const v: any = getValueAtPath(pathSplited.join('.'))

            if (v instanceof Model && !this._isCollection(v.state[lastKey])){
                const o: any= {}
                o[lastKey] = value
                v.setState(o)
            } else if (this._isCollection(v.state[lastKey])){
                const collec = v.state[lastKey]
                collec.setState(collec.toListClass(value))
            } else 
                v[lastKey] = value
        }
    
        recur(obj, '')
    }

    //Return the state to JSONified object.
    //It implies that the state is an array, an object or a Model typed class (model or extended from Model)
    public toPlain = (): any => {
        const ret: any = {}; 
        
        const recur = (o: any, path: string) => {
            
            //if this is a plain object
            if (this._isObject(o) && Object.keys(o).length > 0){
                for (var key in o)
                    recur(o[key], !path ? key : path + '.' + key)
                return
            }

            //if this is an array
            if (this._isArray(o) && o.length > 0){
                for (let i = 0; i < o.length; i++)
                    recur(o[i], path + '.' + i.toString())
                return
            }

            //if this is a Model class
            if (o instanceof Model){
                recur(o.state, path)
                return
            }

            objectPath.set(ret, path, o)
        }

        recur(this.state, '')

        if (this.isCollection()){
            if (!ret[''])
                return []
            return ret['']
        }

        return ret
    }

    public toString = (): string => JSON.stringify(this.toPlain())

    public isConnected = (): boolean => this.options.connected 
    public isEqual = (m: Model): boolean => this.toString() === m.toString()
    public isEmpty = (): boolean => _.isEmpty(this.state)
    public isCollection = (): boolean => this._isArray(this.state)

    private _generateKey = (): string => {
        let i = 1;
        let key = '_auto_' + this.constructor.name
        let suffix;
        while (true){
            suffix = '_' + i.toString()
            if (!this._isKeyTaken(key + suffix))
                break;
            i++
        }
        return key + suffix
    }

    private _isArray = (value: any): boolean => Array.isArray(value)
    private _isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Model) && !this._isDateClass(value)
    private _isDateClass = (value: any): boolean => value instanceof Date
    private _isCollection = (value: any): boolean => value instanceof Model && value.isCollection()
    private _isKeyTaken = (value: string): boolean => STORE.isReducerExist(value)

    private _checkArrayModel = () => {
        if (checkIfContainArrayOfModel(this))
            throw new Error(this.constructor.name + "'s state contains an Array of Model. Please use a Collection instead.")
    }
}
