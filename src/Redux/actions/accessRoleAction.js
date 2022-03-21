import axios from "axios"
import { FETCH_ACCESS_ROLE_REQUEST, FETCH_ACCESS_ROLE_FAILURE, FETCH_ACCESS_ROLE_SUCCESS, DELETE_ACCESS_ROLE, ADDED_ACCESS_ROLE, DELETE_ACCESS_ROLE_BY_MENUID } from "../actionType/accessType"
import { BASE_URL } from "../actionType/apiConfig"


// Types 
export const fetchAccessRoleRequest = () => {
    return {
        type: FETCH_ACCESS_ROLE_REQUEST
    }
}
export const fetchAccessRoleSuccess = access => {
    return {
        type: FETCH_ACCESS_ROLE_SUCCESS,
        payload: access
    }
}
export const fetchAccessRoleFailure = error => {
    return {
        type: FETCH_ACCESS_ROLE_FAILURE,
        payload: error
    }
}
export const accessRoleDeleted = () => {
    return {
        type: DELETE_ACCESS_ROLE
    }
}
export const accessRoleDeletedByMenuId = () => {
    return {
        type: DELETE_ACCESS_ROLE_BY_MENUID
    }
}
export const roleAccessAdded = () => {
    return {
        type: ADDED_ACCESS_ROLE
    }
}

// Fetch Access Role Api 
export const fetchAccessRoles = (params) => async dispatch =>  {
    const accessData = await axios.get(BASE_URL + "/GetMenuItemByRoleId/" + params.id)
    .then(response => {
        const access = response.data
        dispatch(fetchAccessRoleSuccess(access))
    })
    .catch(error =>{
        const errorMsg = error.message
        // const errorMsg = "Please Select Field"
        dispatch(fetchAccessRoleFailure(errorMsg))
    })
    return{
        type: FETCH_ACCESS_ROLE_SUCCESS,
        // payload: error,
        accessData: accessData
    }
}

// Delete Access Role Api 
export const deleteAccessRole = (params) => {
    var data = {paramId:params
        }
    return (dispatch) =>{
        axios
        .put(BASE_URL + `/DeleteMenuAccess/${params}`, data)
        .then((response) => {
            dispatch(accessRoleDeleted())
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}

// Insert Access Role Api 
export const addedAccessRole = (data) => {
  
    return (dispatch) =>{
        dispatch(fetchAccessRoleRequest)
        axios
        .post(BASE_URL + "/CreateMenuAccess",data)
        .then((response) => {
            dispatch(roleAccessAdded())
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchAccessRoleFailure(errorMsg))
        })
    }
}


// Delete Access Role by Paramater 
export const deleteAccessRoleByPara = (data) => {
    return (dispatch) =>{
        axios
        .put(BASE_URL + `/DeleteMenuAccess/${data.roleId}/${data.menuItemFeatureId}`)
        .then((response) => {
           // dispatch(accessRoleDeleted())
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}
export const deleteAccessRoleByMenuId = (data) => {
    return (dispatch) =>{
        axios
        .put(BASE_URL + `/DeleteMenuByMenuId/${data.roleId}/${data.menuItemId}`)
        .then((response) => {
           // dispatch(accessRoleDeletedByMenuId())
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}
// http://192.168.61.32:8191/API/SecuritySetup/DeleteMenuAccess/{roleId}/{MenuItemId}/{FeatureId}