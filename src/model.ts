import objectPath from "object-path"
import _ from 'lodash'

export default class Model {

    private state: any
    constructor(state: any){
        if (this._isObject(state) || this._isArray(state)){
            this.state = state
        } else {
            throw new Error(`Model and State can only be instanced with an array or object type.`)
        }
    }

    public get = (): any => this.state

    public set = (state: any) => {
        this.state = state
        return this.state
    }

    //Only usable in a Model/State
    public setState = (o: any) => {
        if (this.isCollection()){
            throw new Error(`setState can't be used on a Collection`)
        }
        const state = this.get()
        this.set(Object.assign({}, state, o))
    }

    //Only usable in a Model/State
    public deleteKey = (key: string) => {
        if (this.isCollection()){
            throw new Error(`deleteKey can't be used on a Collection`)
        }
        const state = this.get()
        delete state[key]
        this.set(state)
    }

    //this function works sort of the same way than setState in react
    //the only difference is that it doesn't require the state in parameters.
    //basically this function get the state, send it to the function passed in parameters.
    //when the action has modified it and is over, re-set it. 
    protected run = (action: (newState: any) => void) => {
        const state = this.get()
        action(state)
        return this.set(state)
    }

    /*
        This function copy the src Model class into the state of the current class
        It avoids the reference of the unchanged values to be changed when an update occurs
    */
    public copyDeep = (src: Model) => {

        const recur = (src: any, dest: any): any => {
            
            //if the destination value is a Model type
            if (dest instanceof Model){
                const destState = dest.get()
                const srcState = src.get()
    
                //If the destination value is NOT a collection 
                if (!dest.isCollection()){
                    
                    //We concat the src and dest state, and loop over it.
                    for (let key in Object.assign({}, srcState, destState)){
                        //if a value doesn't exist in dest and exist in src (DELETION)
                        if (!destState[key] && srcState[key])
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
                        dest.set(src.get())
                    else {
                        for (let i = 0; i < destState.length; i++){
                            //we restart the recursive function since each element is a Model.
                            //we want them to be handle by the first part of the recursive function.
                            recur(srcState[i], destState[i])
                        }
                    }
                }
                //we return the reference of dest to don't change the reference of the instanced Model class
                return dest
    
            //if the destination value is NOT a Model
            } else {
                
                //if the value is an object
                if (this._isObject(dest)){
                    //We concat the src and dest state, and loop over it.
                    for (let key in Object.assign({}, src, dest)){
                        //if the value exists in src and don't in dest
                        if (!dest[key] && src[key])
                            //we delete it
                            delete dest[key]
                        else {
                            //we restart the recursive function on the current value
                            dest[key] = recur(src[key], dest[key])
                        }
                    }
                }
                //if the value is an array
                if (this._isArray(dest)){
                    //recopying the array if the length is different 
                    if (dest.length != src.length)
                        dest = src.slice()
                    else {
                        for (let i = 0; i < dest.length; i++){
                            //restarting the recursive function on the current element.
                            dest[i] = recur(src[i], dest[i])
                        }
                    }
                }

                //we return the value of src since there to assign it in the dest current model
                return src
            }
        }
        return recur(src, this)
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
                recur(o.get(), path)
                return
            }

            objectPath.set(ret, path, o)
        }

        recur(this.get(), '')

        if (this.isCollection()){
            return ret['']
        }

        return ret
    }

    public isCollection = (): boolean => this._isArray(this.get())

    private _isArray = (value: any): boolean => Array.isArray(value)
    private _isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Model) && !this._isDateClass(value)
    private _isDateClass = (value: any): boolean => value instanceof Date
}
