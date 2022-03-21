import axios from "axios"
import { FETCH_ROLE_FAILURE, FETCH_ROLE_REQUEST, FETCH_ROLE_SUCCESS, ADD_ROLE, UPDATE_ROLE, DELETE_ROLE, SEARCH_ROLE } from "../actionType/roleTypes"
import { BASE_URL } from "../actionType/apiConfig"
import Swal from "sweetalert2";

export const fetchRoleRequest = () => {
    return {
        type: FETCH_ROLE_REQUEST
    }
}
export const fetchRoleSuccess = roles => {
    return {
        type: FETCH_ROLE_SUCCESS,
        payload: roles
    }
}
export const fetchRoleFailure = error => {
    return {
        type: FETCH_ROLE_FAILURE,
        payload: error
    }
}
export const roleAdded = () => {
    return {
        type: ADD_ROLE
    }
}
export const roleUpdated = () => {
    return {
        type: UPDATE_ROLE
    }
}
export const roleDeleted = () => {
    return {
        type: DELETE_ROLE
    }
}


// List of Roles 
export const fetchRoles = () => {
    return (dispatch) =>{
        dispatch(fetchRoleRequest)
        axios.get(BASE_URL + "/Roles")
        .then(response => {
            const roles = response.data
            dispatch(fetchRoleSuccess(roles))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchRoleFailure(errorMsg))
        })
    }
}

// Post Role
export const addedRole = (roles) => {
    return (dispatch) =>{
        dispatch(fetchRoleRequest)
        axios
        .post(BASE_URL + "/CreateRole",roles)
        .then((response) => {
            dispatch(roleAdded())
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchRoleFailure(errorMsg))
        })
    }
}

// Update Role 
export const updatedRole = (state,roleId) => {
    var data = {roleId:roleId,applicationId:state.applicationId,
                roleName:state.roleName,
                modifiedBy:state.modifiedBy}
    return (dispatch) =>{
        // dispatch(fetchRoleRequest)
        axios
        .put(BASE_URL + "/UpdateRole",data)
        .then((response) => {
            dispatch(roleUpdated())
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}


// Delete Role 
export const deletedRole = (state) => {
    var data = {roleId:state.roleId,
                modifiedDate:state.modifiedDate,
                modifiedBy:state.modifiedBy,
                userIP:state.userIP
                }
    return (dispatch) =>{
        axios
        .put(BASE_URL + "/DeleteRole",data)
        .then((response) => {
            dispatch(roleDeleted())
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}


// Role Search Api
export const searchRole = (params) => async dispatch =>  {
    const searchData = await axios
    .get(BASE_URL + "/SearchRoles/" + params.name)
    .then(response => {
        if (response.data.length === 0){
            Swal.fire({
                customClass: {
                  container: 'my-swal'
                },
                text: 'No Result Found',
                icon: 'warning',
                confirmButtonText: `Close`,
                confirmButtonColor: '#d33',
              })
        }
        else{
        const access = response.data
        dispatch(fetchRoleSuccess(access))
        }
    })
    .catch(error =>{
        const errorMsg = error.message
        dispatch(fetchRoleFailure(errorMsg))
    })
    return{
        type: SEARCH_ROLE,
        searchData: searchData
    }
}

