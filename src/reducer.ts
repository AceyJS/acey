import { combineReducers } from 'redux'
import Model from './model'
import State from './state'

export interface IParams {
    STORE_KEY: string,
	DEFAULT_STATE: any,
}

export const CurrentState = new Model({})

const bind = (states: State[] = [], extraReducer: any = {}) => {
	let reducer: any = {}
	for (let i = 0; i < states.length; i++) {
		const {STORE_KEY, DEFAULT_STATE } = states[i].getReducerConfig()
		reducer[STORE_KEY] = (state: any = DEFAULT_STATE, action: any) => {
			const { payload, type } = action			
			let s = state
			if (type == STORE_KEY){
				s = payload || state
			}
			let store = CurrentState.get()
			store[STORE_KEY] = s
			CurrentState.set(store)
			return s
		}
	}
	return combineReducers(Object.assign(reducer, extraReducer))
}

export default bind