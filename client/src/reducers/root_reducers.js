import { combineReducers } from 'redux'


import { topHodlersReducer } from './reducer_hodlers'
import { eventsReducer } from './reducer_events'


const rootReducer = combineReducers({
  topHodlers: topHodlersReducer,
  events: eventsReducer
})

export default rootReducer
