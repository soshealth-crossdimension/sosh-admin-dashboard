import axios from '../axios';
import { CREATE_PRICE_PROVIDER } from "../URI_CONFIG";

export const createPriceForIndividual = async (payload) => {
    const response = await axios.post(CREATE_PRICE_PROVIDER, {
        ...payload   
    });
    return response.data;
};