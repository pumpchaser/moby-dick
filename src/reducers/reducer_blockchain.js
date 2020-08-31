import { NEW_EVENT } from '../actions/action_events'

export function blockchainReducer(state = {}, action) {
  switch (action.type) {
    case NEW_EVENT:
      let newState = {}
      newState['currentBlock'] = action.currentBlock
      return Object.assign({}, newState)
    default:
      return state
  }
}
