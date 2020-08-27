import { GET_COINS } from '../actions/action_coins'



export function coinsReducer(state = [], action) {
  switch (action.type) {
    case GET_COINS:
      return Object.assign([], state, action.payload)
    default:
      return state
  }
}
