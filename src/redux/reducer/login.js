import { setItemInStorage } from 'utils/useLocalStorage';
import loginAction from '../types';

const initialState = {
    isUserLogin: false,
    isError: false,
    isLoadingResetPassword: false,
    isLoadingAdminLogin: false,
    isValidAdmin: false,
    invalidErrorMessage: '',
    phoneNumber: '',
    isValidOtp: false,
}

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case loginAction.isLoginSuccess:
            const isUserAuthenticate = action.payload.status === 'OK' ? true : false;
            setItemInStorage('isUserLogin', isUserAuthenticate)
            return {
                ...state,
                ...action.payload,
                isLoggedIn: isUserAuthenticate,
                isError: false,
            }
        case loginAction.isLoadingResetPassword:
            return {
                ...state,
                ...action.payload,
            }

        case loginAction.isLoadingAdminLogin:
            return {
                ...state,
                ...action.payload,
            }
        case loginAction.isLoginFailure:
            setItemInStorage('isUserLogin', false)
            return {
                ...state,
                ...action.payload,
                isError: true
            }
        case loginAction.isResetPasswordSuccess:
            return {
                ...state,
                ...action.payload,
                showNotification: true,
                severity: "success",
                message: 'Password has been updated successfully.Please login with new password.'
            }
        case loginAction.isResetPasswordFailed:
            return {
                ...state,
                showNotification: true,
                severity: "error",
                message: action.payload.error || action.payload['error message']
            }
        case loginAction.setNotificationClose:
            return {
                ...state,
                showNotification: false,
                severity: "",
                message: ''
            }
        case loginAction.resetData:
            return {
                ...initialState
            }
        
        case loginAction.isAdminValidationSuccess:
            return {
                ...state,
                isValidAdmin: action.payload
            }
        case loginAction.isAdminValidationFaliure:
            return {
                ...state,
                ...action.payload,
                isValidAdmin: false
            }
        case loginAction.setPhoneNumber:
            return {
                ...state,
                ...action.payload
            }
        default:
            return { ...state }

    }
}