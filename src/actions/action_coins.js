import Api, { TOKENS_URL } from '../api/api'

import { fetchTopHodlers } from './action_hodlers'
import { processEvents } from './action_events'

export const GET_COINS = 'GET_COINS'
export const SELECT_COIN = 'SELECT_COIN'

export function fetchCoins() {
  console.log('enter fetchCoins')
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

export function createToken(params) {
  return (dispatch) => {
    return Api.post(`${TOKENS_URL}`, params)
      .then((request) => {
        return { type: 'success' }
      }).catch((error) => {
        return { type: 'error' }
      })
  }
}

export function editToken(params) {
  return (dispatch) => {
    return Api.post(`${TOKENS_URL}/edit`, params)
      .then((request) => {
        return { type: 'success' }
      }).catch((error) => {
        return { type: 'error' }
      })
  }

}
