import axios from 'axios'
const http = axios.create({
  baseURL: '',
  timeout: 100000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606890049759706700218369"}'
  }
})
export default http
