import axios from "axios"
import { FETCH_APPLICATIONCOMPANY_FAILURE, FETCH_APPLICATIONCOMPANY_REQUEST, FETCH_APPLICATIONCOMPANY_SUCCESS, ROLEAPP_ADDED} from "../../actionType/Setup/applByCompanyType"
import { BASE_URL } from "../../actionType/apiConfig"
import Swal from "sweetalert2";

export const fetchAppComapnyRequest = () => {
    return {
        type: FETCH_APPLICATIONCOMPANY_REQUEST
    }
}
export const fetchAppComapnySuccess = data => {
    return {
        type: FETCH_APPLICATIONCOMPANY_SUCCESS,
        payload: data
    }
}
export const fetchAppComapnyFailure = error => {
    return {
        type: FETCH_APPLICATIONCOMPANY_FAILURE,
        payload: error
    }
}
export const roleAppAdded = () => {
    return {
        type: ROLEAPP_ADDED
    }
}

// APPLICATIONType Search Api
export const fetchAppByCompany = (params) => async dispatch =>  {
    const appData = await axios
    .get(BASE_URL + "/ApplicationByCompany?companyId=" + params.id)
    .then(response => {
        const comp = response.data
        dispatch(fetchAppComapnySuccess(comp))
    })
    .catch(error =>{
        const errorMsg = error.message
        dispatch(fetchAppComapnyFailure(errorMsg))
    })
    return{
        type: FETCH_APPLICATIONCOMPANY_SUCCESS,
        applByComp: appData
    }
}
export const addedUserRole = (data) => {
    console.log(data)
      return (dispatch) =>{
          dispatch(fetchAppComapnyRequest)
          axios
          .post(BASE_URL + "/CreateUserRoleApplicationMapping",data)
          .then((response) => {
              dispatch(roleAppAdded())
          })
          .catch(error =>{
              const errorMsg = error.message
              dispatch(fetchAppComapnyFailure(errorMsg))
          })
      }
  }