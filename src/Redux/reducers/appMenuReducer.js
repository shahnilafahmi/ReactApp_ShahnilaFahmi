import { APPLICATION_SUCC} from "../actionType/applicationType"
const initialState = {
    loading: false,
    appMenus: [],
    error: ''
}
const appMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case APPLICATION_SUCC:
            return {
            loading: false,
            appMenus: action.payload,
            error: ''
            }
        
      default: return state
    }
  }
  
  export default appMenuReducer