import { FETCH_COMPANY_FAILURE, FETCH_COMPANY_SUCCESS, FETCH_COMPANY_REQUEST} from "../actionType/companyType"
const initialState = {
    loading: false,
    company: [],
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
          company: action.payload,
          error: ''
        }
      case FETCH_COMPANY_FAILURE:
        return {
          loading: false,
          company: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default companyReducer