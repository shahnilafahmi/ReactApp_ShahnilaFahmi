import axios from "axios"
import { FETCH_ACCESS_FEATURE_REQUEST, FETCH_ACCESS_FEATURE_FAILURE, FETCH_ACCESS_FEATURE_SUCCESS} from "../actionType/getAccessFeatureType"
import { BASE_URL } from "../actionType/apiConfig"
import { employeeAccess } from "../../utils/globalVariables"

// Types 
export const fetchAccessFeatureRequest = () => {
    return {
        type: FETCH_ACCESS_FEATURE_REQUEST
    }
}
export const fetchAccessFeatureSuccess = ACCESS_FEATURE => {
    return {
        type: FETCH_ACCESS_FEATURE_SUCCESS,
        payload: ACCESS_FEATURE
    }
}
export const fetchAccessFeatureFailure = error => {
    return {
        type: FETCH_ACCESS_FEATURE_FAILURE,
        payload: error
    }
}

// Access ACCESS_FEATURE by Id 
export const fetchAccessFeature = (data) => {
    var storedNames = JSON.parse(localStorage.getItem("loginData"));
    
    return (dispatch) =>{
        dispatch(fetchAccessFeatureRequest)
        axios.get(BASE_URL + `/GetAccessFeatureRolewise?roleId=${storedNames.roleId}&menuItemId=${employeeAccess.EmployeeList}`)
        .then(response => {
            const data = response.data
            // console.log(data)
            dispatch(fetchAccessFeatureSuccess(data))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchAccessFeatureFailure(errorMsg))
        })
    }
}