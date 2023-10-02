import { SEND_OTP } from "api/URI_CONFIG";
import actionType from '../types';

export const fetchOtpAction = (payload) => async (dispatch) => {
    try {
        const response = await axios.post(SEND_OTP, payload);
        dispatch({type: actionType.fetchOtpSuccess, payload: response.data });
    } catch(err){
        dispatch({type: actionType.fetchOtpFailed, payload: err.response.data });
    }
}