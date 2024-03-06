import { SEND_OTP, RESET_PASSWORD, OTP_AUTHENTICATION } from "api/URI_CONFIG";
import actionType from '../types';
import axios from '../../config/axios';

export const fetchOtpAction = (payload) => async (dispatch) => {
    // dispatch({type: actionType.isLoadingOtp, payload: { isLoadingOtp: true }})
    try {
        await axios.post(SEND_OTP, payload);
        dispatch({type: actionType.fetchOtpSuccess });
    } catch(err){
        dispatch({type: actionType.fetchOtpFailed, payload: err.response.data });
    } finally {
    // dispatch({type: actionType.isLoadingOtp, payload: { isLoadingOtp: false }})
    }
}

export const otpValidationAction = (payload) => async (dispatch) => {
    dispatch({type: actionType.isLoadingOtp, payload: { isLoadingOtp: true}})
    try {
        const res = await axios.post(OTP_AUTHENTICATION, {...payload, appType: 'AD'})
        console.log(res, 'res----otp')
        dispatch({ type: actionType.submitOtpSuccess, payload: res.data })
    } catch(err) {
        dispatch({ type: actionType.submitOtpFailed, payload: err.response.data })
    } finally {
    dispatch({type: actionType.isLoadingOtp, payload: { isLoadingOtp: false}})

    }
}

export const resetPassword = (payload) => async (dispatch) => {
    dispatch({ type: actionType.isLoadingResetPassword, payload: {isLoadingResetPassword: true} })
    try {
        const res = await axios.post(RESET_PASSWORD, payload);
        dispatch({ type: actionType.isResetPasswordSuccess, payload: res.data})
    } catch(err) {
        dispatch({ type: actionType.isResetPasswordFailed, payload: { errorMessage: 'Something went wrong'}})
    } finally {
        dispatch({ type: actionType.isLoadingResetPassword, payload: {isLoadingResetPassword: false} })
    }

}

export const resetDataPasswordAction = () => (dispatch) => {
    dispatch({ type: actionType.resetDataPassword})
}