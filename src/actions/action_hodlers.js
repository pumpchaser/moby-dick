import Api, { TOP_HODLERS_URL } from '../api/api'

export const GET_TOP_HODLERS = 'GET_TOP_HODLERS'


export function fetchTopHodlers(token, limit=100) {
  console.log('enter fetchTopHodlers')
  return (dispatch) => {
    return Api.get(`${TOP_HODLERS_URL}?token=${token}&limit=${limit}`)
      .then((request) => {
        dispatch({ type: GET_TOP_HODLERS, payload: request.data.hodlers })
      }).catch((error) => {
        console.log(error)
      })
  }
}
