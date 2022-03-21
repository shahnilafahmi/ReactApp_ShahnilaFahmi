import { FETCH_APPLICATIONCOMPANY_FAILURE, FETCH_APPLICATIONCOMPANY_REQUEST, FETCH_APPLICATIONCOMPANY_SUCCESS, ROLEAPP_ADDED} from "../../actionType/Setup/applByCompanyType"
const initialState = {
    loading: false,
    appcompany: [],
    error: ''
}
const applicationCompanyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_APPLICATIONCOMPANY_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_APPLICATIONCOMPANY_SUCCESS:
        return {
          loading: false,
          appcompany: action.payload,
          error: ''
        }
      case FETCH_APPLICATIONCOMPANY_FAILURE:
        return {
          loading: false,
          appcompany: [],
          error: action.payload
        }
        case ROLEAPP_ADDED:
            return {
              ...state,
              loading: false
            }
      
      default: return state
    }
  }
  
  export default applicationCompanyReducer