import axios from '../axios';
import { GET_SERVICE_PROVIDER_ALL } from "../URI_CONFIG";

export const getServiceProviderPendingApproval = async () => {
    const response = await axios.get(GET_SERVICE_PROVIDER_ALL, {
        params: {
            filters: 'registrationStatus==PENDING'
        }
    });
    return response.data;
};