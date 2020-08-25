import { combineReducers } from 'redux'


import { topHodlersReducer } from './reducer_hodlers'


const rootReducer = combineReducers({
  topHodlers: topHodlersReducer
})

export default rootReducer
