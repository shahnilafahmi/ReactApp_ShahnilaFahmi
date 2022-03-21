import axios from "axios"
import { FETCH_COMPANYCORRES_FAILURE, FETCH_COMPANYCORRES_REQUEST, FETCH_COMPANYCORRES_SUCCESS} from "../../actionType/Setup/companyCorresType"
import { BASE_URL } from "../../actionType/apiConfig"

export const fetchComapnyCoresRequest = () => {
    return {
        type: FETCH_COMPANYCORRES_REQUEST
    }
}
export const fetchComapnyCoresSuccess = data => {
    return {
        type: FETCH_COMPANYCORRES_SUCCESS,
        payload: data
    }
}
export const fetchComapnyCoresFailure = error => {
    return {
        type: FETCH_COMPANYCORRES_FAILURE,
        payload: error
    }
}

// EmployeeType Search Api
export const fetchCompanyCorres = () => {
    return (dispatch) =>{
        dispatch(fetchComapnyCoresRequest)
        axios.get(BASE_URL + "/CompanyofCorrespondentAdmin")
        .then(response => {
            const data = response.data
            dispatch(fetchComapnyCoresSuccess(data))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchComapnyCoresFailure(errorMsg))
        })
    }
}