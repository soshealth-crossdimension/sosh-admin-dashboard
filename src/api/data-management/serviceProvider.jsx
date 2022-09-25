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

export const updateServiceProviderGrade = async (patchElemet, serviceProviderId) => {
    const response = await axios.patch(GET_SERVICE_PROVIDER_ALL, patchElemet, {
        params: {
            serviceProviderId
        },
        headers: {
            'Content-Type': 'application/json-patch+json',
            'Accept-Language': ' application/json-patch+json'
        }
    });
    return response.data;
};