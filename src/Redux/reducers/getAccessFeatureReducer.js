import { FETCH_ACCESS_FEATURE_FAILURE, FETCH_ACCESS_FEATURE_SUCCESS, FETCH_ACCESS_FEATURE_REQUEST} from "../actionType/getAccessFeatureType"
const initialState = {
    loading: false,
    accessfeature: [],
    error: ''
}
const accessFeatureReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ACCESS_FEATURE_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_ACCESS_FEATURE_SUCCESS:
        return {
          loading: false,
          accessfeature: action.payload,
          error: ''
        }
      case FETCH_ACCESS_FEATURE_FAILURE:
        return {
          loading: false,
          accessfeature: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default accessFeatureReducer