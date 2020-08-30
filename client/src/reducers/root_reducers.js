import { combineReducers } from 'redux'


import { topHodlersReducer } from './reducer_hodlers'
import { eventsReducer } from './reducer_events'
import { coinsReducer, selectedCoinReducer } from './reducer_coins'
import {blockchainReducer} from './reducer_blockchain'

const rootReducer = combineReducers({
  topHodlers: topHodlersReducer,
  events: eventsReducer,
  coins: coinsReducer,
  selectedCoin: selectedCoinReducer,
  blockchain: blockchainReducer,
})

export default rootReducer
