import { ADMIN_LOGIN, IS_VALID_ADMIN, RESET_PASSWORD } from '../../api/URI_CONFIG';
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

export const validAdminAction = (payload) => async (dispatch) => {
    const { requestPayload } = payload;
    dispatch({ type: actionType.isLoadingResetPassword, payload:{isLoadingResetPassword: true}})
    try {
        const response = await axios.post(IS_VALID_ADMIN, requestPayload);
        dispatch({type: actionType.isAdminValidationSuccess, payload: response.data});
    } catch(err){
        dispatch({type: actionType.isAdminValidationFaliure, payload: err.response.data });
    } finally {
        dispatch({ type: actionType.isLoadingResetPassword, payload:{isLoadingResetPassword: false}})
    }
}