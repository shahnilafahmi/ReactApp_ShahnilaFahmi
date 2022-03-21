import axios from "axios"
import { PARENT_MENU_FAILURE, PARENT_MENU_REQUEST, PARENT_MENU_SUCCESS} from "../actionType/ParentMenuType"
import { BASE_URL_SETUP } from "../actionType/apiConfig"

export const parentMenuRequest = () => {
    return {
        type: PARENT_MENU_REQUEST
    }
}
export const parentMenuSuccess = parentMenus => {
    return {
        type: PARENT_MENU_SUCCESS,
        payload: parentMenus
    }
}
export const parentMenuFailure = error => {
    return {
        type: PARENT_MENU_FAILURE,
        payload: error
    }
}

// fetch Parent Menu
export const fetchParentMenu = () => {
    return (dispatch) =>{
        dispatch(parentMenuRequest)
        axios.get(BASE_URL_SETUP + "/ParentMenus")
        .then(response => {
            const ParentMenus = response.data
            dispatch(parentMenuSuccess(ParentMenus))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(parentMenuFailure(errorMsg))
        })
    }
}