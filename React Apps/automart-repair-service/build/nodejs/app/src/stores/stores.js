import {createStore, applyMiddleware} from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import '../myfirebase.js'
import { apiMiddleware } from 'redux-api-middleware'

// let a = myfirebase
// console.log(a)
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)

export default createStoreWithMiddleware(reducers, {}, applyMiddleware(thunk))
