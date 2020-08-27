import { NEW_EVENT, CLEAR_EVENTS } from '../actions/action_events'

export function eventsReducer(state = [], action) {
  switch (action.type) {
    case CLEAR_EVENTS:
      return []
    case NEW_EVENT:
      let existingEvents = state
    	existingEvents.unshift(action.payload)
      return Object.assign([], state, existingEvents)
    default:
      return state
  }
}
