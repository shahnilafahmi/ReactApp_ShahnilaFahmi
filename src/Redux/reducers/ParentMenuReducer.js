import { PARENT_MENU_FAILURE, PARENT_MENU_REQUEST, PARENT_MENU_SUCCESS} from "../actionType/ParentMenuType"
const initialState = {
    loading: false,
    parentMenus: [],
    error: ''
}
const parentMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case PARENT_MENU_REQUEST:
            return {
            ...state,
            loading: true
            }
        case PARENT_MENU_SUCCESS:
            return {
            loading: false,
            parentMenus: action.payload,
            error: ''
            }
        case PARENT_MENU_FAILURE:
            return {
            loading: false,
            parentMenus: [],
            error: action.payload
            }
      default: return state
    }
  }
  
  export default parentMenuReducer