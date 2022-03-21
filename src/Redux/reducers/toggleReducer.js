import { TOGGLE } from "../actionType/toggleType"
const initialState = {
    loading: false,
    toggle: [],
    error: ''
}   
const toggleReducer = (state = initialState, action) => {
    switch (action.type) {   
      
      case TOGGLE:
        return {
          loading: false,
          toggle: action.payload,
          error: ''
        }
      
      default: return state
    }
  }
  
  export default toggleReducer