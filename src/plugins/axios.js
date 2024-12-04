import axios from 'axios'
import config from './config';

const axiosIns = axios.create({
    baseURL: config.API_BASE_URL,
// You can add your headers here
// ================================
// baseURL: 'https://some-domain.com/api/',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
})

export default axiosIns
