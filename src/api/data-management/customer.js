import axios from '../axios';
import { GET_ALL_CUSTOMER } from "../URI_CONFIG";

export const getAllCustomer = async () => {
    const response = await axios.get(GET_ALL_CUSTOMER, { });
    return response.data;
};