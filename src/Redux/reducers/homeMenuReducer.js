import { HOME_MENU_FAILURE, HOME_MENU_REQUEST, HOME_MENU_SUCCESS } from "../actionType/homeMenuType"
const initialState = {
    loading: false,
    homemenus: [],
    error: ''
}   
const homeMenuReducer = (state = initialState, action) => {
    switch (action.type) {   
      case HOME_MENU_REQUEST:
        return {
          ...state,
          loading: true
        }
      case HOME_MENU_SUCCESS:
        return {
          loading: false,
          homemenus: action.payload,
          error: ''
        }
      case HOME_MENU_FAILURE:
        return {
          loading: false,
          homemenus: [],
          error: action.payload
        }
        
      default: return state
    }
  }
  
  export default homeMenuReducer