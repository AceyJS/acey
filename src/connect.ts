import _ from 'lodash'
import { connect as nativeConnect } from 'react-redux'
import { mapStateToPropsMiddleware } from './middleware'

type mapStateToPropsType = null | Function

export default (mapStateToProps: mapStateToPropsType, ...props: any /* actionBinder: any, param: any, options: any */) => {
    const mapSTP = mapStateToProps ? (state: object) => {
        return mapStateToPropsMiddleware(state, mapStateToProps)
    } : null


    const actionBinder = props[0] || null
    const param: any = props[1] || null
    const options = props[2] || {}

    return nativeConnect(mapSTP, actionBinder, param, options)
}