import axios from "axios"
import { FETCH_EMPLOYEETYPE_FAILURE, FETCH_EMPLOYEETYPE_REQUEST, FETCH_EMPLOYEETYPE_SUCCESS,ADD_EMPLOYEETYPE, UPDATE_EMPLOYEETYPE, DELETE_EMPLOYEETYPE, SEARCH_EMPLOYEETYPE } from "../../actionType/Setup/employeeType"
import { BASE_URL_SETUP } from "../../actionType/apiConfig"
import Swal from "sweetalert2";

export const fetchEmployeeTypeRequest = () => {
    return {
        type: FETCH_EMPLOYEETYPE_REQUEST
    }
}
export const fetchEmployeeTypeSuccess = data => {
    return {
        type: FETCH_EMPLOYEETYPE_SUCCESS,
        payload: data
    }
}
export const fetchEmployeeTypeFailure = error => {
    return {
        type: FETCH_EMPLOYEETYPE_FAILURE,
        payload: error
    }
}
export const employeeTypeAdded = () => {
    return {
        type: ADD_EMPLOYEETYPE
    }
}
export const employeeTypeUpdated = () => {
    return {
        type: UPDATE_EMPLOYEETYPE
    }
}
export const employeeTypeDeleted = () => {
    return {
        type: DELETE_EMPLOYEETYPE
    }
}


// List of EmployeeType
export const fetchEmployeeType = () => {
    return (dispatch) =>{
        dispatch(fetchEmployeeTypeRequest)
        axios.get(BASE_URL_SETUP + "/EmployeeType")
        .then(response => {
            const city = response.data
            dispatch(fetchEmployeeTypeSuccess(city))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchEmployeeTypeFailure(errorMsg))
        })
    }
}

// Post EmployeeType
export const addedEmployeeType = (data) => {
    return (dispatch) =>{
        dispatch(fetchEmployeeTypeRequest)
        axios
        .post(BASE_URL_SETUP + "/CreateEmployeeType",data)
        .then((response) => {
            dispatch(employeeTypeAdded())
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchEmployeeTypeFailure(errorMsg))
        })
    }
}

// Update EmployeeType
export const updatedEmployeeType = (state,id) => {
    var data = {employeeTypeId:id,employeeTypeName:state.employeeTypeName,
        companyId:state.companyId,
        modifiedBy:state.modifiedBy,
        userIP:""    
        }
    return (dispatch) =>{
        // dispatch(fetchRoleRequest)
        axios
        .put(BASE_URL_SETUP + "/UpdateEmployeeType",data)
        .then((response) => {
            dispatch(employeeTypeUpdated())
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}


// Delete EmployeeType
export const deletedEmployeeType = (state) => {
    var data = {employeeTypeId:state.employeeTypeId,
                modifiedBy:state.modifiedBy,
                userIP:state.userIP
                }
    return (dispatch) =>{
        axios
        .put(BASE_URL_SETUP + "/DeleteEmployeeType",data)
        .then((response) => {
            dispatch(employeeTypeDeleted())
        })
        .catch(error =>{
            const errorMsg = error.message
            // dispatch(fetchRoleFailure(errorMsg))
        })
    }
}


// EmployeeType Search Api
export const searchEmployeeType = (params) => async dispatch =>  {
    const searchData = await axios
    .get(BASE_URL_SETUP + "/SearchEmployeeType/" + params.name)
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
        dispatch(fetchEmployeeTypeSuccess(access))
        }
    })
    .catch(error =>{
        const errorMsg = error.message
        dispatch(fetchEmployeeTypeFailure(errorMsg))
    })
    return{
        type: SEARCH_EMPLOYEETYPE,
        searchData: searchData
    }
}