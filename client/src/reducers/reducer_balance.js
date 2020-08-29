import { USER_BALANCE } from '../actions/action_balance'

export function userBalanceReducer(state, action) {
  switch (action.type) {
    case USER_BALANCE:
      return action.payload
    default:
      return state
  }
}
