import axios from "axios"
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, USER_DATA, RESET_PASSWORD } from "../actionType/userTypes"
import {BASE_URL} from '../actionType/apiConfig';
import Swal from "sweetalert2";
export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}
export const fetchUserSuccess = users => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}
export const fetchUserFailure = error => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}
export const resetPassword = () => {
    return {
        type: RESET_PASSWORD
    }
}

export const fetchParam = (params) => async dispatch =>  {
    const myProps = params.propLink;

    const loginData = await axios.get(BASE_URL + "/Authenticate/" + params.email + "/" + params.password
        ).then((result) => {
            if(result.status == 200){
                const loginData = result.data
                debugger;
                Swal.fire({
                  customClass: {
                    container: 'my-swal'
                  },
                  text: 'Login Successfully',
                  icon: 'success',
                  confirmButtonText: `OK`,
                  timer: 3000,
                }).then((result) => { 
                    if(result.isDismissed){
                        setTimeout(() => {
                            localStorage.setItem("loginData", JSON.stringify(loginData));
                            myProps.history.push("/")
                        }, 500);
                    }
                    else if(result.isConfirmed){
                        setTimeout(() => {
                            localStorage.setItem("loginData", JSON.stringify(loginData));
                            myProps.history.push("/")
                        }, 500);
                    }
                });
                
              }
      
              else{
                Swal.fire({
                    customClass: {
                      container: 'my-swal'
                    },
                    text: 'Wrong Email or Password or Account is Lock.',
                    icon: 'error',
                    confirmButtonText: `OK`,
                    confirmButtonColor: '#bf1e2e',
                  })
              }
      })
    // const loginData = await axios.get(BASE_URL + params.email + "/" + params.password);
    return{
        // type: USER_DATA,
        // userData: loginData
        type: USER_DATA,
        userData: loginData
    }
}

// Post Menu
export const passwordReset = (data) => {
    var myData = {loginId:data.loginId}
    const myProps = data.propLink;
   
    return (dispatch) =>{
        dispatch(fetchUserRequest)
        axios
        //.post(BASE_URL + "/ResetPassword/" , myData)
        .post(BASE_URL + "/ResetPassword?loginId="  + data.loginId)
        .then((response) => {
            
                dispatch(resetPassword())
                Swal.fire({
                    customClass: {
                      container: 'my-swal'
                    },
                    text: 'Password Reset Successfully',
                    icon: 'success',
                    confirmButtonText: `OK`,
                  }).then(() => { 
                   myProps.history.go(0)
                } );
           
            
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchUserFailure(errorMsg))
        })
    }
}

// http://192.168.61.32:8191/API/SecuritySetup/ResetPassword/{loginId}