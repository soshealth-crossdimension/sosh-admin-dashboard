import axios from '../axios';
import { GET_SERVICE_PROVIDER_ALL, UPDATE_SERVICE_PROVIDER_DETAILS } from "../URI_CONFIG";

export const getServiceProviderPendingApproval = async () => {
    const response = await axios.get(GET_SERVICE_PROVIDER_ALL, {
        params: {
            filters: 'registrationStatus==PENDING'
        }
    });
    return response.data;
};

export const updateServiceProviderGrade = async (patchElemet, serviceProviderId) => {
    const response = await axios.post(UPDATE_SERVICE_PROVIDER_DETAILS, patchElemet, {
        params: {
            serviceProviderId
        },
        headers: {
            'Content-Type': 'application/json-patch+json'
        }
    });
    return response.data;
};