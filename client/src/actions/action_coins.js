import Api, { TOKENS_URL } from '../api/api'
import web3 from '../web3';

export const GET_COINS = 'GET_COINS'

export function fetchCoins(token, limit=10) {
  return (dispatch) => {
    return Api.get(`${TOKENS_URL}`)
      .then((request) => {
        dispatch({ type: GET_COINS, payload: request.data.tokens })
      }).catch((error) => {
        console.log(error)
      })
  }
}




