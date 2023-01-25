import {combineReducers}  from 'redux';
import { serviceProviderReducer } from './reducer/serviceProvider';

const store = combineReducers({
    serviceProvider: serviceProviderReducer,
})
export default store;