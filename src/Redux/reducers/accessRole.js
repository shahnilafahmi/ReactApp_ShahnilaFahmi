import { FETCH_ACCESS_ROLE_FAILURE, FETCH_ACCESS_ROLE_SUCCESS, FETCH_ACCESS_ROLE_REQUEST, ADDED_ACCESS_ROLE, DELETE_ACCESS_ROLE, DELETE_ACCESS_ROLE_BY_MENUID } from "../actionType/accessType"
const initialState = {
    loading: false,
    access: [],
    error: ''
}
const accessRoleReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ACCESS_ROLE_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_ACCESS_ROLE_SUCCESS:
        return {
          loading: false,
          access: action.payload,
          error: ''
        }
      case FETCH_ACCESS_ROLE_FAILURE:
        return {
          loading: false,
          access: [],
          error: action.payload
        }
        case ADDED_ACCESS_ROLE:
        return {
          ...state,
          loading: false
        }
        case DELETE_ACCESS_ROLE:
          return{
            ...state,
          loading: false
          }
          case DELETE_ACCESS_ROLE_BY_MENUID:
          return{
            ...state,
          loading: false
          }
      default: return state
    }
  }
  
  export default accessRoleReducer