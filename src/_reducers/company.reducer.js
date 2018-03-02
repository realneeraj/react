import { companyConstants } from '../_constants';

const initialState = {
    list: {
        loading: false,
        error: null,
        data: []
    },    
    view: {
        loading: false,
        error: null,
        data: {}
    }
}

export const company = (state = initialState, action) => {
    switch(action.type){
        // List Compnay
        case companyConstants.LIST_REQUEST:
            return {
                ...state,
                list: {
                    loading: true,
                    data: []
                }
            }
        case companyConstants.LIST_SUCCESS: 
            return {
                ...state,
                list: {
                    loading: false,
                    data: action.data
                }
            }
        case companyConstants.LIST_FAILURE:
            return {
                ...state,
                list: {
                    loading: false,
                    error: action.error
                }
            }
        
        // View Company
        case companyConstants.VIEW_REQUEST:
            return {
                ...state,
                view: {
                    loading: true
                }
            }
        case companyConstants.VIEW_SUCCESS: 
            return {
                ...state,
                view: {
                    loading: false,
                    data: action.data
                }
            }
        case companyConstants.VIEW_FAILURE:
            return {
                ...state,
                view: {
                    loading: false,
                    error: action.error
                }
            }
        default:
            return state;
    }
}