import _ from 'lodash'
import { connect as nativeConnect } from 'react-redux'
import { mapStateToPropsMiddleware } from './middleware'

let ID = 0
export default (mapStateToProps: Function, ...props: any /* actionBinder: any, param: any, options: any */) => {
    //id of the connected component.
    const mstpID = ID
    ID += 1

    const mps = (state: any) => {
        return mapStateToPropsMiddleware(mapStateToProps(state), mstpID)
    }

    const actionBinder = null
    const param: any = null
    const options = props[0] || {}

    return nativeConnect(mps, actionBinder, param, options)
}