import { GET_TOP_HODLERS } from '../actions/action_hodlers'
import { UPDATE_HODLER_STREAK } from '../actions/action_events'
import { BUY, SELL } from '../constants/transactions'

const TRANSACTION_DIRECTION = {
	[BUY]: 1,
	[SELL]: -1
}

function isTopHodler(topHodlers, hodlerAddress){
	return topHodlers.map(h => h.address.toLowerCase()).includes(hodlerAddress.toLowerCase())
}

function topHodlerIndex(topHodlers, hodlerAddress){
	return topHodlers.map(h => h.address.toLowerCase()).indexOf(hodlerAddress.toLowerCase())
}

function reverseStreak(hodler, transactionType) {
	return (hodler['streak'] < 0 && transactionType === BUY) || 
		   (hodler['streak'] > 0 && transactionType === SELL)
}

function getStreakCount(hodler, transactionType) {
	if (!hodler['streak'] || reverseStreak(hodler, transactionType)) {
		return TRANSACTION_DIRECTION[transactionType]
	}
	return hodler['streak'] += TRANSACTION_DIRECTION[transactionType]
}

export function topHodlersReducer(state = [], action) {
  switch (action.type) {
    case GET_TOP_HODLERS:
      return action.payload
    case UPDATE_HODLER_STREAK:
    	let topHodlers = state
    	if (!isTopHodler(topHodlers, action.hodlerAddress)){
    		return state
    	}
    	let topHodler = topHodlers[topHodlerIndex(topHodlers, action.hodlerAddress)]
    	topHodler['streak'] = getStreakCount(topHodler, action.transactionType)
    	console.log("New Top Hodler Streak", topHodler)
    	return Object.assign([], topHodlers)
    default:
      return state
  }
}
