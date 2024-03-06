import { ADMIN_LOGIN, IS_VALID_ADMIN } from '../../api/URI_CONFIG';
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
        await axios.get(IS_VALID_ADMIN, { params: {...requestPayload}});
        dispatch({type: actionType.isAdminValidationSuccess, payload: {isValidAdmin: true, invalidErrorMessage: ''}});
    } catch(err){
        dispatch({type: actionType.isAdminValidationFaliure, payload: {invalidErrorMessage: err?.response?.data?.['error message']} });
    } finally {
        dispatch({ type: actionType.isLoadingResetPassword, payload:{isLoadingResetPassword: false}})
    }
}

export const setPhoneNumberAction = (payload) => async (dispatch) => {
    
    dispatch({type: actionType.setPhoneNumber, payload })
}