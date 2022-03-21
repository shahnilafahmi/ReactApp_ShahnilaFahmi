import { FETCH_FEATURE_FAILURE, FETCH_FEATURE_REQUEST, FETCH_FEATURE_SUCCESS,ADD_FEATURE, UPDATE_FEATURE, DELETE_FEATURE, SEARCH_FEATURE } from "../../actionType/Setup/featureTypes"
const initialState = {
    loading: false,
    features: [],
    error: ''
}   
const featureReducer = (state = initialState, action) => {
    switch (action.type) {   
      case FETCH_FEATURE_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_FEATURE_SUCCESS:
        return {
          loading: false,
          features: action.payload,
          error: ''
        }
      case FETCH_FEATURE_FAILURE:
        return {
          loading: false,
          features: [],
          error: action.payload
        }
        case ADD_FEATURE:
            return {
              ...state,
              loading: false
            }
            case UPDATE_FEATURE:
            return {
              ...state,
              loading: false
            }
            case DELETE_FEATURE:
            return {
              ...state,
              loading: false
            }
            case FETCH_FEATURE_REQUEST:
            return {
              ...state,
              loading: true
            }
            case SEARCH_FEATURE:
              return {
                loading: false,
                features: action.payload,
                error: ''
              }
      default: return state
    }
  }
  
  export default featureReducer