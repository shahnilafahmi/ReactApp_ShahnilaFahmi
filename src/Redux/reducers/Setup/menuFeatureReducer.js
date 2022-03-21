import { FETCH_MENUFEATURE_REQUEST, FETCH_MENUFEATURE_FAILURE, FETCH_MENUFEATURE_SUCCESS, ADD_MENUFEATURE} from "../../actionType/Setup/MenuFeatureType"
const initialState = {
    loading: false,
    menufeature: [],
    error: ''
}
const menuFeatureReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MENUFEATURE_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_MENUFEATURE_SUCCESS:
        return {
          loading: false,
          menufeature: action.payload,
          error: ''
        }
      case FETCH_MENUFEATURE_FAILURE:
        return {
          loading: false,
          menufeature: [],
          error: action.payload
        }
        case ADD_MENUFEATURE:
        return {
          ...state,
          loading: false
        }
        
      default: return state
    }
  }
  
  export default menuFeatureReducer