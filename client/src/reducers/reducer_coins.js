import { GET_COINS, SELECT_COIN } from '../actions/action_coins'


export function coinsReducer(state = [], action) {
  switch (action.type) {
    case GET_COINS:
      return Object.assign([], state, action.payload)
    default:
      return state
  }
}


export function selectedCoinReducer(state = {}, action) {
  switch (action.type) {
    case SELECT_COIN:
      return action.payload
    default:
      return state
  }

}
