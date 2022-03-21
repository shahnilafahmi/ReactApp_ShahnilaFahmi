import { FETCH_COMPANY_FAILURE, FETCH_COMPANY_REQUEST, FETCH_COMPANY_SUCCESS,ADD_COMPANY, UPDATE_COMPANY, DELETE_COMPANY, SEARCH_COMPANY } from "../../actionType/Setup/companyTypes"
const initialState = {
    loading: false,
    companies: [],
    error: ''
}   
const companyReducer = (state = initialState, action) => {
    switch (action.type) {   
      case FETCH_COMPANY_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_COMPANY_SUCCESS:
        return {
          loading: false,
          companies: action.payload,
          error: ''
        }
      case FETCH_COMPANY_FAILURE:
        return {
          loading: false,
          companies: [],
          error: action.payload
        }
        case ADD_COMPANY:
            return {
              ...state,
              loading: false
            }
            case UPDATE_COMPANY:
            return {
              ...state,
              loading: false
            }
            case DELETE_COMPANY:
            return {
              ...state,
              loading: false
            }
            case FETCH_COMPANY_REQUEST:
            return {
              ...state,
              loading: true
            }
            case SEARCH_COMPANY:
              return {
                loading: false,
                companies: action.payload,
                error: ''
              }
      default: return state
    }
  }
  
  export default companyReducer