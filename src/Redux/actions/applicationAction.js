import axios from "axios"
import { APPLICATION_SUCC} from "../actionType/applicationType"
import { BASE_URL_SETUP } from "../actionType/apiConfig"

export const appSucce = appMenus => {
    return {
        type: APPLICATION_SUCC,
        payload: appMenus
    }
}

export const appMenu = () => {
    return (dispatch) =>{
        // dispatch(parentMenuRequest)
        axios.get(BASE_URL_SETUP + "/Applications")
        .then(response => {
            const appMenus = response.data
            dispatch(appSucce(appMenus))
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}