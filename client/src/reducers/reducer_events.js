import { NEW_EVENT, CLEAR_EVENTS } from '../actions/action_events'

export function eventsReducer(state = [], action) {
  switch (action.type) {
    case CLEAR_EVENTS:
      return []
    case NEW_EVENT:
      let existingEvents = state
      let event = action.payload
      event['fromAddressBalance'] = action.fromAddressBalance
    	existingEvents.unshift(event)
      return Object.assign([], state, existingEvents)
    default:
      return state
  }
}
