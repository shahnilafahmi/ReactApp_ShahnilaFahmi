import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, RESET_PASSWORD, USER_DATA } from "../actionType/userTypes"
const initialState = {
    loading: false,
    users: [],
    error: ''
}
const usReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_USER_SUCCESS:
        return {
          loading: false,
          users: action.payload,
          error: ''
        }
      case FETCH_USER_FAILURE:
        return {
          loading: false,
          users: [],
          error: action.payload
        }
        case RESET_PASSWORD:
        return {
          ...state,
          loading: false
        }
      default: return state
    }
  }
  
  export default usReducer