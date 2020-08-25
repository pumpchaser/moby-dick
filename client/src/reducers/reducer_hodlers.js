import { GET_TOP_HODLERS } from '../actions/action_hodlers'


export function topHodlersReducer(state = '', action) {
  switch (action.type) {
    case GET_TOP_HODLERS:
      return action.payload
    default:
      return []
  }
}
