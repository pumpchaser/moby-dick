import { NEW_EVENT } from '../actions/action_events'


export function eventsReducer(state = '', action) {
  switch (action.type) {
    case NEW_EVENT:
      // notify logic
      console.log("NEW_EVENT!", action.payload)
      return action.payload
    default:
      return []
  }
}
