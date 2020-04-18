import Model from './model'
import { STORE } from './store'

export const bindToReducer = (m: Model) => {
	const reducer: any = {}
	if (!m.isConnected())
		return
	const STORE_KEY = m.options.key
	
	//initialization of the default state with the default state 
	//of the state linked with the current controller.
	const DEFAULT_STATE = m.defaultState
	reducer[STORE_KEY] = (state: any = DEFAULT_STATE, action: any) => {
		const { payload, type } = action			
		let s = state
		if (type == STORE_KEY)
			s = payload || state
		return s
	}
	STORE.addReducers(Object.assign({}, STORE.getReducers(), reducer))
	STORE.refreshReducer()
}