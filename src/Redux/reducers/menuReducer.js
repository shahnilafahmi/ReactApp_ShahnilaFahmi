import { MENU_FAILURE, MENU_REQUEST, MENU_SUCCESS,ADD_MENU, UPDATE_MENU, DELETE_MENU, SEARCH_MENU, PARENT_MENU_SUCCESS} from "../actionType/menuType"
const initialState = {
    loading: false,
    menus: [],
    error: ''
}
const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case MENU_REQUEST:
            return {
            ...state,
            loading: true
            }
        case MENU_SUCCESS:
            return {
            loading: false,
            menus: action.payload,
            error: ''
            }
        case MENU_FAILURE:
            return {
            loading: false,
            menus: [],
            error: action.payload
            }
        case ADD_MENU:
            return {
                ...state,
                loading: false
            }
        case UPDATE_MENU:
            return {
                ...state,
                loading: false
            }
        case DELETE_MENU:
            return {
                ...state,
                loading: false
            }
        case SEARCH_MENU:
            return {
                loading: false,
                menus: action.payload,
                error: ''
            }
      default: return state
    }
  }
  
  export default menuReducer