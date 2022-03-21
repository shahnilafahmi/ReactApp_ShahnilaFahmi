import axios from "axios"
import { MENU_FAILURE, MENU_REQUEST, MENU_SUCCESS, ADD_MENU, UPDATE_MENU, DELETE_MENU, SEARCH_MENU} from "../actionType/menuType"
import { BASE_URL_SETUP } from "../actionType/apiConfig"
import Swal from "sweetalert2";

export const menuRequest = () => {
    return {
        type: MENU_REQUEST
    }
}
export const menuSuccess = menus => {
    return {
        type: MENU_SUCCESS,
        payload: menus
    }
}
export const menuFailure = error => {
    return {
        type: MENU_FAILURE,
        payload: error
    }
}
export const menuAdded = () => {
    return {
        type: ADD_MENU
    }
}
export const menuUpdated = () => {
    return {
        type: UPDATE_MENU
    }
}
export const menuDeleted = () => {
    return {
        type: DELETE_MENU
    }
}


// List of Menus
export const fetchMenu = () => {
    return (dispatch) =>{
        dispatch(menuRequest)
        axios.get(BASE_URL_SETUP + "/Menus")
        .then(response => {
            const menus = response.data
            dispatch(menuSuccess(menus))
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(menuFailure(errorMsg))
        })
    }
}

// Post Menu
export const addedMenu = (menus) => {
    var data = {menuName:menus.menuName,
        menuURL:menus.menuURL,
        sortOrder:menus.sortOrder,
        parentId:menus.parentId,
        modifiedBy:menus.modifiedBy,
        createdBy:menus.createdBy,
        userIp:menus.userIp,
        applicationId:menus.applicationId}
    return (dispatch) =>{
        dispatch(menuRequest)
        axios
        .post(BASE_URL_SETUP + "/CreateMenu",data)
        .then((response) => {
            dispatch(menuAdded())
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(menuFailure(errorMsg))
        })
    }
}

// Update Menu
export const updatedMenu = (menus,menuId) => {
    var data = {menuName:menus.menuName,
        menuId:menuId,
        parentId:menus.parentId,
        modifiedBy:menus.modifiedBy,
        applicationId:menus.applicationId,
        userIp:menus.userIp}
    return (dispatch) =>{
        axios
        .put(BASE_URL_SETUP + "/UpdateMenu",data)
        .then((response) => {
            dispatch(menuUpdated())
        })
        .catch(error =>{
            const errorMsg = error.message
            // dispatch(fetchRoleFailure(errorMsg))
        })
    }
}


// Delete Menu
export const deletedMenu = (state) => {
    var data = {menuId:state.menuId,
                modifiedBy:state.modifiedBy,
                userIP:state.userIP
                }
    return (dispatch) =>{
        axios
        .put(BASE_URL_SETUP + "/DeleteMenu",data)
        .then((response) => {
            dispatch(menuDeleted())
        })
        .catch(error =>{
            const errorMsg = error.message
        })
    }
}


// Menu Search Api
export const searchMenu = (params) => async dispatch =>  {
    const menuData = await axios
    .get(BASE_URL_SETUP + "/SearchMenu/" + params.name)
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
        const menu = response.data
        dispatch(menuSuccess(menu))
        }
    })
    .catch(error =>{
        const errorMsg = error.message
        dispatch(menuFailure(errorMsg))
    })
    return{
        type: SEARCH_MENU,
        menu: menuData
    }
}



