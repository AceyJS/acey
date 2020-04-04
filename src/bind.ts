import { combineReducers } from 'redux'
import Controller from './controller'

const bind = (controllers: Controller[] = [], extraReducers: any = {}) => {
	
	let reducer: any = {}
	for (let i = 0; i < controllers.length; i++) {
		const STORE_KEY = controllers[i].getIDKey()
		//initialization of the default state with the default state 
		//of the state linked with the current controller.
		const DEFAULT_STATE = new (controllers[i].getStateClass())(undefined).defaultState()
		
		reducer[STORE_KEY] = (state: any = DEFAULT_STATE, action: any) => {
			const { payload, type } = action			
			let s = state
			if (type == STORE_KEY)
				s = payload || state
			return s
		}
	}

	return combineReducers(Object.assign(reducer, extraReducers))
}

export default bind