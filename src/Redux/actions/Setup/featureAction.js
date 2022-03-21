import axios from "axios"
import { FETCH_FEATURE_FAILURE, FETCH_FEATURE_REQUEST, FETCH_FEATURE_SUCCESS, ADD_FEATURE, UPDATE_FEATURE, DELETE_FEATURE, SEARCH_FEATURE } from "../../actionType/Setup/featureTypes"
import { BASE_URL_SETUP } from "../../actionType/apiConfig"
import Swal from "sweetalert2";

export const fetchFeatureRequest = () => {
    return {
        type: FETCH_FEATURE_REQUEST
    }
}
export const fetchFeatureSuccess = features => {
    return {
        type: FETCH_FEATURE_SUCCESS,
        payload: features
    }
}
export const fetchFeatureFailure = error => {
    return {
        type: FETCH_FEATURE_FAILURE,
        payload: error
    }
}
export const featureAdded = () => {
    return {
        type: ADD_FEATURE
    }
}
export const featureUpdated = () => {
    return {
        type: UPDATE_FEATURE
    }
}
export const featureDeleted = () => {
    return {
        type: DELETE_FEATURE
    }
}


// List of Feature 
export const fetchFeature = () => {
  
    return (dispatch) =>{
        dispatch(fetchFeatureRequest)
        axios.get(BASE_URL_SETUP + "/Features")
        .then(response => {
            const data = response.data
            dispatch(fetchFeatureSuccess(data))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchFeatureFailure(errorMsg))
        })
    }
}
      
// Post Feature
export const addedFeature = (data) => {
    return (dispatch) =>{
        dispatch(fetchFeatureRequest)
        axios
        .post(BASE_URL_SETUP + "/CreateFeature",data)
        .then((response) => {
            dispatch(featureAdded())
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchFeatureFailure(errorMsg))
        })
    }
}

// Update Feature 
export const updatedFeature = (state,featureId) => {
    var data = {featureId:featureId,
                feature:state.feature,
                modifiedBy:state.modifiedBy}
             
    return (dispatch) =>{
      
        axios
        .put(BASE_URL_SETUP + "/UpdateFeature",data)
        .then((response) => {
            dispatch(featureUpdated())
        })
        .catch(error =>{
            const errorMsg = error.message
          
        })
    }
}


// Delete Feature 
export const deletedFeature = (state) => {
    var data = {featureId:state.featureId,
                modifiedDate:state.modifiedDate,
                modifiedBy:state.modifiedBy,
                userIP:""
                }
    return (dispatch) =>{
        axios
        .put(BASE_URL_SETUP + "/DeleteFeature",data)
        .then((response) => {
            dispatch(featureDeleted())
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}

 
// Feature Search Api
export const searchFeature = (params) => async dispatch =>  {
   const searchData = await axios
    .get(BASE_URL_SETUP + "/SearchFeature/"  + params.name)
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
        dispatch(fetchFeatureSuccess(access))
        }
    })
    .catch(error =>{
        const errorMsg = error.message
        dispatch(fetchFeatureFailure(errorMsg))
    })
    return{
        type: SEARCH_FEATURE,
        searchData: searchData
    }
}

