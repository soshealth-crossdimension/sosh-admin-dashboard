import {combineReducers}  from 'redux';
import { serviceProviderReducer } from './reducer/serviceProvider';
import { loginReducer } from './reducer/login';
import { resetPasswordReducer } from './reducer/resetPassword';

const store = combineReducers({
    logInUser: loginReducer,
    serviceProvider: serviceProviderReducer,
    resetPassword: resetPasswordReducer
})
export default store;