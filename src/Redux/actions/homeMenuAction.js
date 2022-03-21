import axios from "axios"
import { HOME_MENU_SUCCESS, HOME_MENU_FAILURE, HOME_MENU_REQUEST} from "../actionType/homeMenuType"
import { BASE_URL } from "../actionType/apiConfig"
import Swal from "sweetalert2";

export const homeMenuRequest = () => {
    return {
        type: HOME_MENU_REQUEST
    }
}
export const homeMenuSuccess = homemenus => {
    return {
        type: HOME_MENU_SUCCESS,
        payload: homemenus
    }
}
export const homeMenuFailure = error => {
    return {
        type: HOME_MENU_FAILURE,
        payload: error
    }
}


// Home Menus get 
export const fetchHomeMenu = (params) => {
    return (dispatch) =>{
        dispatch(homeMenuRequest)
        axios.get(BASE_URL + "/GetHomeMenuItemByRoleId/" + params)
        .then(response => {
            const homeMenu = response.data
          
            dispatch(homeMenuSuccess(homeMenu))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(homeMenuFailure(errorMsg))
        })
    }
}
      
// http://192.168.61.32:8191/API/SecuritySetup/GetHomeMenuItemByRoleId/{roleid}