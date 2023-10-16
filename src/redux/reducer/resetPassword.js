import resetPasswordAction from '../types'; 

const initialState = {
    errorMessage: '',
    isResetSuccess: false,
    isLoadingResetPassword: false,
    isInvalidValidOtp: false,
    isValidOtp: false,
    isLoadingOtp: false,
    smsErrorMessage: ''
}

export function resetPasswordReducer(state=initialState, action){
    switch(action.type){
            case resetPasswordAction.fetchOtpFailed:
                    return { ...state, smsErrorMessage: 'Something went wrong.Please try again later.' }
            case resetPasswordAction.submitOtpFailed:
                return { ...state, isInvalidValidOtp: true } 
            case resetPasswordAction.submitOtpSuccess:
                const { otpValid} = action.payload;
                return { ...state, 
                    ...(otpValid && {isValidOtp : true}), ...(!otpValid && {isInvalidValidOtp : true})}  
            case resetPasswordAction.fetchOtpSuccess:
                return { ...state, smsErrorMessage: '' }
            case resetPasswordAction.isLoadingOtp:
                return { ...state, ...action.payload }
            case resetPasswordAction.isLoadingResetPassword:
                return { ...state, ...action.payload }
            case resetPasswordAction.isResetPasswordSuccess:
                return {...state, isResetSuccess: true }
            case resetPasswordAction.isResetPasswordFailed:
                return {...state, isResetSuccess: false, ...action.payload }
            case resetPasswordAction.resetDataPassword:
                return {...initialState}
        default:
           return {...state}
                    
    }
}