import { combineReducers } from 'redux'


import { topHodlersReducer } from './reducer_hodlers'
import { eventsReducer } from './reducer_events'
import { coinsReducer } from './reducer_coins'


const rootReducer = combineReducers({
  topHodlers: topHodlersReducer,
  events: eventsReducer,
  coins: coinsReducer,
})

export default rootReducer
