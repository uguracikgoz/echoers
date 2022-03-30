import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { EchoBotReducer } from './features/echobot'
import echoBotMiddleware from './features/echobot/store/middleware'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  messageHistory: EchoBotReducer,
})

const middlewares = [thunkMiddleware, echoBotMiddleware]
const middleWareEnhancer = applyMiddleware(...middlewares)
const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer))

export type ReduxStoreState = ReturnType<typeof rootReducer>
export default store
