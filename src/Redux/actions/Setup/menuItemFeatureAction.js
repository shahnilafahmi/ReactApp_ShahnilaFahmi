import axios from "axios"
import { FETCH_MENUITEMFEATURE_REQUEST, FETCH_MENUITEMFEATURE_FAILURE, FETCH_MENUITEMFEATURE_SUCCESS, DELETE_MENUITEMFEATURE, ADD_MENUITEMFEATURE, DELETE_MENUITEMFEATURE_BY_MENUID } from "../../actionType/Setup/menuItemFeature"
import { BASE_URL_SETUP } from "../../actionType/apiConfig"


// Types 
export const fetchMenuItemFeatureRequest = () => {
    return {
        type: FETCH_MENUITEMFEATURE_REQUEST
    }
}
export const fetchMenuItemFeatureSuccess = access => {
    return {
        type: FETCH_MENUITEMFEATURE_SUCCESS,
        payload: access
    }
}
export const fetchMenuItemFeatureFailure = error => {
    return {
        type: FETCH_MENUITEMFEATURE_FAILURE,
        payload: error
    }
}
export const menuItemFeatureDeleted = () => {
    return {
        type: DELETE_MENUITEMFEATURE
    }
}
export const menuItemFeatureAdded = () => {
    return {
        type: ADD_MENUITEMFEATURE
    }
}

// Fetch Access Role Api 
export const fetchMenuItemFeature = (params) => async dispatch =>  {
    const menuFeatureItem = await axios.get(BASE_URL_SETUP + "/GetFeatureMappingByMenuId/" + params.id)
    .then(response => {
        const access = response.data
        dispatch(fetchMenuItemFeatureSuccess(access))
    })
    .catch(error =>{
        const errorMsg = error.message
        // const errorMsg = "Please Select Field"
        dispatch(fetchMenuItemFeatureFailure(errorMsg))
    })
    return{
        type: FETCH_MENUITEMFEATURE_SUCCESS,
        // payload: error,
        menuFeatureItem: menuFeatureItem
    }
}

export const addedMenuItemFeature = (data) => {
    return (dispatch) =>{
        dispatch(fetchMenuItemFeatureRequest)
        axios
        .post(BASE_URL_SETUP + "/CreateMenuItemFeatureMapping",data)
        .then((response) => {
            dispatch(menuItemFeatureAdded())
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchMenuItemFeatureFailure(errorMsg))
        })
    }
}

export const DeleteMenuItemById = (state) => {
    console.log(state)
    return (dispatch) =>{
        axios
        .delete(BASE_URL_SETUP + "/DeleteMenuItemFeatureMapping/"+ state.menuItemFeatureId,state)
        .then((response) => {
            dispatch(menuItemFeatureDeleted())
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}
