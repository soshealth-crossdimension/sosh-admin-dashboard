import axios from 'axios';
import { BASE_URL } from './URI_CONFIG';

const instance = axios.create({
    baseURL: BASE_URL,
})

export default instance