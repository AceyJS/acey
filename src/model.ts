import objectPath from "object-path"
import _ from 'lodash'

export default class Model {

    private state: any
    constructor(state: any){
        this.state = state
    }

    public get = (): any => this.state
    public set = (state: any) => {
        this.state = state
        return this.state
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

    //Return the state to JSONified object.
    //It implies that the state is an array, an object or a Model typed class (model or extended from Model)
    public toPlain = (): any => {
        const ret: any = {}; 
        
        const recur = (o: any, path: string) => {
            
            //if this is a plain object
            if (this.isObject(o) && Object.keys(o).length > 0){
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

            //if this is a State class
            if (Model.isModelClass(o)){
                recur(o.get(), path)
                return
            }

            //if this is a Date class
            //convert the date to unix time in ms
            if (this.isDateClass(o))
                o = o.getTime()

            objectPath.set(ret, path, o)
        }

        recur(this.get(), '')

        if (this.isArray()){
            return ret['']
        }

        return ret
    }

    public isArray = (): boolean => this._isArray(this.get())

    private _isArray = (value: any): boolean => Array.isArray(value)
    private isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value) && !Model.isModelClass(value) && !this.isDateClass(value)
    public static isModelClass = (value: any): boolean => value instanceof Model
    private isDateClass = (value: any): boolean => value instanceof Date
}
