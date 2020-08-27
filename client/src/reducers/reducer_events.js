import { NEW_EVENT } from '../actions/action_events'
import { COIN_CONFIG } from '../coin_config'

function getTransactionType(transaction, currentToken){
  if (transaction.event === 'Transfer') {
    if (transaction.returnValues.to.toLowerCase() === COIN_CONFIG[currentToken]['uniswap'].toLowerCase()){
      return 'Sell'
    } else {
      return 'Buy'
    }
  }
  return transaction.event
}

export function eventsReducer(state = [], action) {
  switch (action.type) {
    case NEW_EVENT:
      // notify logic
      const transaction = action.payload
      const txURL = `https://etherscan.io/tx/${transaction.transactionHash}`
	    const newEvent = {
	      'type': getTransactionType(transaction, action.currentToken),
	      'from': transaction.returnValues.from || transaction.returnValues.owner,
	      'to': transaction.returnValues.to,
	      'value': transaction.returnValues.value/1000000000000000000,
	      'txId': transaction.id,
	      'url': txURL,
	    }      
      let existingEvents = state
    	existingEvents.unshift(newEvent)
      return Object.assign([], state, existingEvents)
    default:
      return state
  }
}
