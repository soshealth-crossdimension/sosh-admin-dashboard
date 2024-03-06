import serviceProviderAction from '../types'; 

const initialState = {
    serviceProviderList: [],
    isServiceProviderListLoading: false,
}

export function serviceProviderReducer(state=initialState, action){
    switch(action.type){
            case serviceProviderAction.fetchServiceProviderListSuccess:
                return {...state, serviceProviderList: action.payload, isServiceProviderListLoading:false}
            
        default:
           return {...state}
                    
    }
}