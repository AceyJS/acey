import _ from 'lodash'
import { connect as nativeConnect } from 'react-redux'
import { mapStateToPropsMiddleware } from './middleware'

export default (stateToProps: any, ...props: any /* actionBinder: any, param: any, options: any */) => {
    const mps = (state: any) => {
        return mapStateToPropsMiddleware(stateToProps)
    }

    const actionBinder = null
    const param: any = null
    const options = props[0] || {}

    return nativeConnect(mps, actionBinder, param, options)
}