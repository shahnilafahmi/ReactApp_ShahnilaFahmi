import axios from "axios"
import { FETCH_COMPANY_REQUEST, FETCH_COMPANY_FAILURE, FETCH_COMPANY_SUCCESS} from "../actionType/companyType"
import { BASE_URL } from "../actionType/apiConfig"

// Types 
export const fetchCompanyRequest = () => {
    return {
        type: FETCH_COMPANY_REQUEST
    }
}
export const fetchCompanySuccess = company => {
    return {
        type: FETCH_COMPANY_SUCCESS,
        payload: company
    }
}
export const fetchCompanyFailure = error => {
    return {
        type: FETCH_COMPANY_FAILURE,
        payload: error
    }
}

// Access Company by Id 
export const fetchByCompanyId = (params) => {
    return (dispatch) =>{
        dispatch(fetchCompanyRequest)
        axios.get(BASE_URL + "/GetModuleAccessByCompnay/" + params.id)
        .then(response => {
            const companyData = response.data
            dispatch(fetchCompanySuccess(companyData))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchCompanyFailure(errorMsg))
        })
    }
}