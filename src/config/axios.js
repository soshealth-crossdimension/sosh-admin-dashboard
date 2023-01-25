import axios from 'axios';
import { BASE_URL } from '../api/URI_CONFIG';

const instance = axios.create({
    baseURL: BASE_URL,
})

export default instance