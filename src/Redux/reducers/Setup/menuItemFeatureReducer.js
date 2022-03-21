import { FETCH_MENUITEMFEATURE_REQUEST, FETCH_MENUITEMFEATURE_FAILURE, FETCH_MENUITEMFEATURE_SUCCESS, ADD_MENUITEMFEATURE} from "../../actionType/Setup/menuItemFeature"
const initialState = {
    loading: false,
    menuitem: [],
    error: ''
}
const menuItemFeatureReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MENUITEMFEATURE_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_MENUITEMFEATURE_SUCCESS:
        return {
          loading: false,
          menuitem: action.payload,
          error: ''
        }
      case FETCH_MENUITEMFEATURE_FAILURE:
        return {
          loading: false,
          menuitem: [],
          error: action.payload
        }
        case ADD_MENUITEMFEATURE:
        return {
          ...state,
          loading: false
        }
        
      default: return state
    }
  }
  
  export default menuItemFeatureReducer