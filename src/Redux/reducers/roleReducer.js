import { FETCH_ROLE_FAILURE, FETCH_ROLE_REQUEST, FETCH_ROLE_SUCCESS,ADD_ROLE, UPDATE_ROLE, DELETE_ROLE, SEARCH_ROLE } from "../actionType/roleTypes"
const initialState = {
    loading: false,
    roles: [],
    error: ''
}
const roleReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ROLE_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_ROLE_SUCCESS:
        return {
          loading: false,
          roles: action.payload,
          error: ''
        }
      case FETCH_ROLE_FAILURE:
        return {
          loading: false,
          roles: [],
          error: action.payload
        }
      case ADD_ROLE:
        return {
          ...state,
          loading: false
        }
        case UPDATE_ROLE:
        return {
          ...state,
          loading: false
        }
        case DELETE_ROLE:
        return {
          ...state,
          loading: false
        }
        case FETCH_ROLE_REQUEST:
        return {
          ...state,
          loading: true
        }
        case SEARCH_ROLE:
          return {
            loading: false,
            roles: action.payload,
            error: ''
          }
      default: return state
    }
  }
  
  export default roleReducer