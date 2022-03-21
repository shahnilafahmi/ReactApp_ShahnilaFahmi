import axios from "axios"
import { FETCH_MENUFEATURE_REQUEST, FETCH_MENUFEATURE_FAILURE, FETCH_MENUFEATURE_SUCCESS, DELETE_MENUFEATURE, ADD_MENUFEATURE, DELETE_MENUFEATURE_BY_MENUID } from "../../actionType/Setup/MenuFeatureType"
import { BASE_URL_SETUP } from "../../actionType/apiConfig"


// Types 
export const fetchMenuFeatureRequest = () => {
    return {
        type: FETCH_MENUFEATURE_REQUEST
    }
}
export const fetchMenuFeatureSuccess = access => {
    return {
        type: FETCH_MENUFEATURE_SUCCESS,
        payload: access
    }
}
export const fetchMenuFeatureFailure = error => {
    return {
        type: FETCH_MENUFEATURE_FAILURE,
        payload: error
    }
}
export const menuFeatureDeleted = () => {
    return {
        type: DELETE_MENUFEATURE
    }
}
export const menuFeatureAdded = () => {
    return {
        type: ADD_MENUFEATURE
    }
}

// Fetch Access Role Api 
export const fetchMenuFeature = () => {
    return (dispatch) =>{
        dispatch(fetchMenuFeatureRequest)
        axios.get(BASE_URL_SETUP + "/MenuListInApplication")
        .then(response => {
            const data = response.data
            dispatch(fetchMenuFeatureSuccess(data))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchMenuFeatureFailure(errorMsg))
        })
    }
}
// http://192.168.61.32:8191/API/Setup/MenuListInApplication