import { TOGGLE } from "../actionType/toggleType"

export const toggleFetch = data => {
    return {
        type: TOGGLE,
        payload: data
    }
}

export const fetchToggle = (params) => {
    return (dispatch) =>{
        dispatch(toggleFetch(params))
    }
}