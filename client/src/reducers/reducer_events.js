import { NEW_EVENT } from '../actions/action_events'



export function eventsReducer(state = [], action) {
  switch (action.type) {
    case NEW_EVENT:
      let existingEvents = state
    	existingEvents.unshift(action.payload)
      return Object.assign([], state, existingEvents)
    default:
      return state
  }
}
