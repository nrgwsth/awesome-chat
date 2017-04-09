import { createStore,applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'

export default function configureStore() {
	const store=createStore(rootReducer,applyMiddleware(thunkMiddleware,createLogger()));
	return store;
}