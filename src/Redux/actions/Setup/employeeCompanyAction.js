import axios from "axios"
import { FETCH_EMPLOYEECOMPANY_FAILURE, FETCH_EMPLOYEECOMPANY_REQUEST, FETCH_EMPLOYEECOMPANY_SUCCESS} from "../../actionType/Setup/employeeByCompanyType"
import { BASE_URL } from "../../actionType/apiConfig"
import Swal from "sweetalert2";

export const fetchEmployeeComapnyRequest = () => {
    return {
        type: FETCH_EMPLOYEECOMPANY_REQUEST
    }
}
export const fetchEmployeeComapnySuccess = data => {
    return {
        type: FETCH_EMPLOYEECOMPANY_SUCCESS,
        payload: data
    }
}
export const fetchEmployeeComapnyFailure = error => {
    return {
        type: FETCH_EMPLOYEECOMPANY_FAILURE,
        payload: error
    }
}

// EmployeeType Search Api
export const fetchEmployeeByCompany = (params) => async dispatch =>  {
    const empData = await axios
    .get(BASE_URL + "/EmployeeByCompany?companyId=" + params.id)
    .then(response => {
        const comp = response.data
        dispatch(fetchEmployeeComapnySuccess(comp))
    })
    .catch(error =>{
        const errorMsg = error.message
        dispatch(fetchEmployeeComapnyFailure(errorMsg))
    })
    return{
        type: FETCH_EMPLOYEECOMPANY_SUCCESS,
        emplyByComp: empData
    }
}