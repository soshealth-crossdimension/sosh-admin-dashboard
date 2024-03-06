import axios from '../../config/axios';
import actionType from '../types';
import { GET_SERVICE_PROVIDER_ALL, UPDATE_SERVICE_PROVIDER_DETAILS } from '../../api/URI_CONFIG';

export const fetchServiceProviderListAction = () => async (dispatch) => {
    
    try {
        const response = await axios.get(GET_SERVICE_PROVIDER_ALL, {
            // params: {
            //     filters: 'registrationStatus==PENDING'
            // }
        });
        dispatch({type: actionType.fetchServiceProviderListSuccess, payload: response.data })
    } catch(err){
      console.log(err, 'err----- fetch customer----', JSON.stringify(err))
  }
}

export const updateServiceProviderAction = (payload) => async (dispatch) => {
    const { patchElemet, serviceProviderId } = payload;
    try {
        const response = await axios.post(UPDATE_SERVICE_PROVIDER_DETAILS, patchElemet, {
            params: {
                serviceProviderId
            },
            headers: {
                'Content-Type': 'application/json-patch+json'
            }
        });
        console.log(response.data, 'update response-----')
        // dispatch({type: actionType.fetchServiceProviderListSuccess, payload: response.data })
    } catch(err){
      console.log(err, 'err----- fetch customer----', JSON.stringify(err))
  }
}