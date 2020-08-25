import axios from 'axios'

export const ROOT_URL = "https://mobydick-server.herokuapp.com"

// Token URL
export const TOKENS_URL = `{ROOT_URL}/tokens`

// Hodlers URL
export const TOP_HODLERS_URL = `${ROOT_URL}/hodlers`


export const get = (url, config = {}) => axios.get(url, {
  ...config,
  headers: { },
})

export const post = (url, data, config = {}) => axios.post(url, data, {
  ...config,
  headers: { },
})

export const put = (url, data, config = {}) => axios.put(url, data, {
  ...config,
  headers: { },
})

export default { get, post, put }
