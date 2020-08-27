import Api, { TOKENS_URL } from '../api/api'

import { fetchTopHodlers } from './action_hodlers'
import { processEvents } from './action_events'

export const GET_COINS = 'GET_COINS'
export const SELECT_COIN = 'SELECT_COIN'

export function fetchCoins() {
  return (dispatch) => {
    return Api.get(`${TOKENS_URL}`)
      .then((request) => {
        dispatch({ type: GET_COINS, payload: request.data.tokens })
      }).catch((error) => {
        console.log(error)
      })
  }
}

export function selectCoin(coin) {
  return (dispatch) => {
    dispatch({ type: SELECT_COIN, payload: coin })
    dispatch(fetchTopHodlers(coin.name))
    dispatch(processEvents(coin))
  }
}


