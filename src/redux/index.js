import {combineReducers}  from 'redux';
import { serviceProviderReducer } from './reducer/serviceProvider';
import { loginReducer } from './reducer/login';

const store = combineReducers({
    logInUser: loginReducer,
    serviceProvider: serviceProviderReducer,
})
export default store;