import { combineReducers } from 'redux'


import { topHodlersReducer } from './reducer_hodlers'
import { eventsReducer } from './reducer_events'
import { coinsReducer, selectedCoinReducer } from './reducer_coins'


const rootReducer = combineReducers({
  topHodlers: topHodlersReducer,
  events: eventsReducer,
  coins: coinsReducer,
  selectedCoin: selectedCoinReducer,
})

export default rootReducer
