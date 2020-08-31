import { NEW_EVENT, CLEAR_EVENTS } from '../actions/action_events'
import {getTransactionType, getFromAddress} from '../utils/event';

export function eventsReducer(state = [], action) {
  switch (action.type) {
    case CLEAR_EVENTS:
      return []
    case NEW_EVENT:
      let existingEvents = state
      let event = action.payload
      const transactionType = getTransactionType(event, action.currentToken)
      const fromAddress = getFromAddress(event, transactionType)

      event['fromAddressBalance'] = action.fromAddressBalance
      event['fromAddress'] = fromAddress
      event['transactionType'] = transactionType
    	existingEvents.unshift(event)
      existingEvents.sort( (a, b) => b.timestamp - a.timestamp)
      return Object.assign([], existingEvents)
    default:
      return state
  }
}
