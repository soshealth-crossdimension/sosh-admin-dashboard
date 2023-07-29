import { ADMIN_LOGIN, RESET_PASSWORD } from '../../api/URI_CONFIG';
import actionType from '../types';
import axios from '../../config/axios';

export const setIsUserLoginAction = (payload) => async (dispatch) => {
    
    dispatch({type: actionType.isLoginSuccess, payload })
}

export const resetDataAction = () => async (dispatch) => {
    
    dispatch({type: actionType.resetData })
}

export const setNotificationClose = () => async(dispatch) => {
    dispatch({ type: actionType.setNotificationClose})
}

export const loginAdminAction = (payload) => async (dispatch) => {
    const { requestPayload } = payload;
    dispatch({ type: actionType.isLoadingResetPassword, payload:{isLoadingAdminLogin: true}})

    try {
        const response = await axios.post(ADMIN_LOGIN, requestPayload);
        dispatch({type: actionType.isLoginSuccess, payload: response.data })
    } catch(err){
        dispatch({type: actionType.isLoginFailure, payload: err.response.data })
  }
  finally {
    dispatch({ type: actionType.isLoadingResetPassword, payload:{isLoadingAdminLogin: false}})
  }
}

export const resetPasswordAction = (payload) => async (dispatch) => {
    const { phoneNumber } = payload
    dispatch({ type: actionType.isLoadingResetPassword, payload:{isLoadingResetPassword: true}})
    try {
        const response = await axios.post(`${RESET_PASSWORD}/${phoneNumber}`);
        dispatch({type: actionType.isResetPasswordSuccess, payload: response.data })
    } catch(err){
        dispatch({type: actionType.isResetPasswordFailed, payload: err.response.data })
  }
  finally {
    dispatch({ type: actionType.isLoadingResetPassword, payload:{isLoadingResetPassword: false}})
  }
}