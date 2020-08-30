import axios from 'axios'

// Token URL
export const TOKENS_URL = `${process.env.REACT_APP_BACKEND_URI}/tokens`

// Hodlers URL
export const TOP_HODLERS_URL = `${process.env.REACT_APP_BACKEND_URI}/hodlers`


export const get = (url, config = {}) => axios.get(url, {
  ...config,
  headers: {},
})

export const post = (url, data, config = {}) => axios.post(url, data, {
  ...config,
  headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
})

export const put = (url, data, config = {}) => axios.put(url, data, {
  ...config,
  headers: { },
})

export default { get, post, put }
