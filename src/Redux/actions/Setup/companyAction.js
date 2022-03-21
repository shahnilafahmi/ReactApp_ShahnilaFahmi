import axios from "axios"
import { FETCH_COMPANY_FAILURE, FETCH_COMPANY_REQUEST, FETCH_COMPANY_SUCCESS, ADD_COMPANY, UPDATE_COMPANY, DELETE_COMPANY, SEARCH_COMPANY } from "../../actionType/Setup/companyTypes"
import { BASE_URL_SETUP } from "../../actionType/apiConfig"
import Swal from "sweetalert2";

export const fetchCompanyRequest = () => {
    return {
        type: FETCH_COMPANY_REQUEST
    }
}
export const fetchCompanySuccess = roles => {
    return {
        type: FETCH_COMPANY_SUCCESS,
        payload: roles
    }
}
export const fetchCompanyFailure = error => {
    return {
        type: FETCH_COMPANY_FAILURE,
        payload: error
    }
}
export const companyAdded = () => {
    return {
        type: ADD_COMPANY
    }
}
export const companyUpdated = () => {
    return {
        type: UPDATE_COMPANY
    }
}
export const companyDeleted = () => {
    return {
        type: DELETE_COMPANY
    }
}


// List  
export const fetchCompany = () => {
    return (dispatch) =>{
        dispatch(fetchCompanyRequest)
        axios.get(BASE_URL_SETUP + "/Company")
        .then(response => {
            const comp = response.data
            dispatch(fetchCompanySuccess(comp))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchCompanyFailure(errorMsg))
        })
    }
}
      
// Post
export const addedCompany = (roles) => {
    
    return (dispatch) =>{
        dispatch(fetchCompanyRequest)
        axios
        .post(BASE_URL_SETUP + "/CreateCompany",roles)
        .then((response) => {
           // console.log("rest", response)
            dispatch(companyAdded())
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchCompanyFailure(errorMsg))
        })
    }
}

// Update  
export const updatedCompany = (state,companyId) => {
   
    var data = {companyId:companyId,companyName:state.companyName,
                 modifiedBy:state.modifiedBy}
             
    return (dispatch) =>{
      
        axios
        .put(BASE_URL_SETUP + "/UpdateCompany",data)
        .then((response) => {
            //console.log("rest", response)
            dispatch(companyUpdated())
        })
        .catch(error =>{
            const errorMsg = error.message
          
        })
    }
}


// Delete 
export const deletedCompany = (state) => {
   // console.log("Delete Bank",state)
    var data = {companyId:state.companyId,
                modifiedDate:state.modifiedDate,
                modifiedBy:state.modifiedBy,
                userIP:""
                }
    return (dispatch) =>{
       
        axios
        .put(BASE_URL_SETUP + "/DeleteCompany",data)
        .then((response) => {
            //console.log("rest", response)
            dispatch(companyDeleted())
        })
        .catch(error =>{
            const errorMsg = error.message
            // dispatch(fetchRoleFailure(errorMsg))
        })
    }
}


//  Search Api
export const searchCompany = (params) => async dispatch =>  {
   
    //console.log(params.name)
    const searchData = await axios
    .get(BASE_URL_SETUP + "/SearchCompany/"  + params.name)
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
        dispatch(fetchCompanySuccess(access))
        }
    })
    .catch(error =>{
        const errorMsg = error.message
        dispatch(fetchCompanyFailure(errorMsg))
    })
    return{
        type: SEARCH_COMPANY,
        searchData: searchData
    }
}

