import React, { useState,useEffect } from 'react'
// import { Col, Container, Nav, Row } from 'reactstrap'
import { Button, CardBody,Container,Nav, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import Header from '../Components/Header'
import ChangePasswordDetails from '../Components/ChangePasswordDetails'
import Sidebar from '../Components/Sidebar'
import axios from "axios"
import { BASE_URL } from "../Redux/actionType/apiConfig"
import { useHistory } from 'react-router'
import Swal from "sweetalert2";
import Footer from '../Components/Footer'
import { TokenConst } from '../utils/globalVariables';

       
const ForgetPassword = () => {
    let history = useHistory();
    var storedNames = JSON.parse(localStorage.getItem("loginData"));
 
    
  const [password, setPassword] = useState('');
  const [state, setState] = useState({
    userId: storedNames.userId,
    newPassword: "",
    oldPassword: "",
    applicationId: storedNames.applicationId,
    createdBy: storedNames.createdBy,
    modifiedBy: storedNames.modifiedBy,
    userIp: ""
});
useEffect(() => {
    verifyToken()
}, [])

function verifyToken()
{
    const urlForgotPassword = new URLSearchParams(window.location.search);
    const paramToken = urlForgotPassword.get('Token');
  
    axios.get(BASE_URL + "/IsTokenExist?token="  + paramToken )
    .then(response => {
      
    const isTokenExist = response.data.token;
  
    if(response.data == "")
    {
        Swal.fire({
            customClass: {
              container: 'my-swal'
            },
            text: 'Token does not Exist!',
            icon: 'error',
            confirmButtonColor: '#bf1e2e',
            focusConfirm: false,
            cancelButtonText: `Cancel`,
            cancelButtonColor: '#2f4050',
        })
         history.push("/login");
    }
   
    const TokenTime = response.data.modifiedDate.toLocaleString();
    var currentTime = new Date().toLocaleString();

    const currDate = new Date(currentTime)
    const oldDate  = new Date(TokenTime)
    const time =   (currDate - oldDate) / 60000 
    var expiryTime = response.data.tokenExpiryTime;
   
   if(isTokenExist == paramToken)
   {
 
       if(time > expiryTime )
       {
           
        Swal.fire({
            customClass: {
              container: 'my-swal'
            },
            text: 'Link is Expired!',
            icon: 'error',
            confirmButtonColor: '#bf1e2e',
            focusConfirm: false,
            cancelButtonText: `Cancel`,
            cancelButtonColor: '#2f4050',
        })
       //Token and Expiry Time Field in UserLogin table is null when Link got Expire
     var data = {userId:state.userId}
        
     axios
    .put(BASE_URL + "/UpdateTokenOnExpiredLink",data)
    .then((response) => {
       debugger
    })
   .catch(error =>{
      const errorMsg = error.message
    })
        setTimeout(() => {
            history.push("/login");
        }, 3000);
       
       
       }
  
   }
   else{
      
    history.push("/login")
   }
    

   })
   .catch(error =>{
  
    const errorMsg = error.message
    })


} // end of verify Token


function preventPaste()
{
    var newPasswordValue = document.getElementById('newPassword');
    var oldPasswordValue = document.getElementById('confirmPassword');
    newPasswordValue.onpaste = e => e.preventDefault();
    oldPasswordValue.onpaste = e => e.preventDefault();
 
}
function viewPasswordNew(e)
{
  
    var newPasswordValue = document.getElementById('newPassword');
    var oldPasswordValue = document.getElementById('confirmPassword');

    var newPasswordpassStatus= document.getElementById('newPasswordpassStatus');
    var oldPasswordpassStatus= document.getElementById('oldPasswordpassStatus');

    if (newPasswordValue.type == 'password')
    {
        newPasswordValue.type='text';
        newPasswordpassStatus.className='fa fa-eye-slash';
    }
    else
    {
        oldPasswordValue.type='password';
        oldPasswordpassStatus.className='fa fa-eye';
    }
   
}
function viewPasswordConfirm(e)
{
  
    var newPasswordValue = document.getElementById('newPassword');
    var oldPasswordValue = document.getElementById('confirmPassword');

    var newPasswordpassStatus= document.getElementById('newPasswordpassStatus');
    var oldPasswordpassStatus= document.getElementById('oldPasswordpassStatus');

    if (oldPasswordValue.type == 'password')
    {
        oldPasswordValue.type='text';
        oldPasswordpassStatus.className='fa fa-eye-slash';
    }
    else
    {
        newPasswordValue.type='password';
        newPasswordpassStatus.className='fa fa-eye';
    }
   
}


//Update Role Dispatch
const submitUpdatePassword = (e) =>{
    e.preventDefault()
  var shouldExpire = false;
  var newPasswordValue = document.getElementById('newPassword').value;
  var oldPasswordValue = document.getElementById('confirmPassword').value;
//   var oldPasswordValue = document.getElementById('oldPassword').value;
  state.newPassword = newPasswordValue;
  state.oldPassword = oldPasswordValue;
      
     if(newPasswordValue == '' ||  oldPasswordValue == ""){
       alert("Please add  password to Continue");
        //setUpdateError("Please add new Field to Continue")
    }
    else{

        //Check > password should not be less than 12 Character
        if(document.getElementById('newPassword') != null)
        {
        var newPasswordValue = document.getElementById('newPassword').value;
        var num = newPasswordValue.length;
        if(num < 12 || num > 128)
        {
            Swal.fire({
                    customClass: {
                      container: 'my-swal'
                    },
                    text: 'Number should be atleast 12 Character and Max 128 Character!',
                    icon: 'error',
                    confirmButtonColor: '#bf1e2e',
                    focusConfirm: false,
                    cancelButtonText: `Cancel`,
                    cancelButtonColor: '#2f4050',
                })
            return;
        }

        ////password and confirm password matching
        if(oldPasswordValue != newPasswordValue)
        {
            Swal.fire({
                customClass: {
                  container: 'my-swal'
                },
                text: 'Password and Confirm Password should be Match!',
                icon: 'error',
                confirmButtonColor: '#bf1e2e',
                focusConfirm: false,
                cancelButtonText: `Cancel`,
                cancelButtonColor: '#2f4050',
            })
        return;
        }
        

        //Check theer should no Space in password
        
       if (newPasswordValue.indexOf(' ') !== -1) {
        Swal.fire({
            customClass: {
              container: 'my-swal'
            },
            text: 'There should no Space at all in Password!',
            icon: 'error',
            confirmButtonColor: '#bf1e2e',
            focusConfirm: false,
            cancelButtonText: `Cancel`,
            cancelButtonColor: '#2f4050',
        })
        return true
       } 
 }

 //Verify Token if Token is going to Expire , User will not able to Update password

 const urlForgotPassword = new URLSearchParams(window.location.search);
 const paramToken = urlForgotPassword.get('Token');
 axios.get(BASE_URL + "/IsTokenExist?token="  + paramToken )
 .then(response => {
 const isTokenExist = response.data.token;
 if(response.data == "")
 {
     Swal.fire({
         customClass: {
           container: 'my-swal'
         },
         text: 'Token does not Exist!',
         icon: 'error',
         confirmButtonColor: '#bf1e2e',
         focusConfirm: false,
         cancelButtonText: `Cancel`,
         cancelButtonColor: '#2f4050',
     })
      history.push("/login");
 }

 const TokenTime = response.data.modifiedDate.toLocaleString();
 var currentTime = new Date().toLocaleString();

 const currDate = new Date(currentTime)
 const oldDate  = new Date(TokenTime)
 const time =   (currDate - oldDate) / 60000 
 var expiryTime = response.data.tokenExpiryTime;
 //  var expiryTime = TokenConst.TokenExpiryTime;
 
if(isTokenExist == paramToken)
{

    if(time > expiryTime )
    {
     Swal.fire({
         customClass: {
           container: 'my-swal'
         },
         text: 'Link is Expired!',
         icon: 'error',
         confirmButtonColor: '#bf1e2e',
         focusConfirm: false,
         cancelButtonText: `Cancel`,
         cancelButtonColor: '#2f4050',
     }) 
    
     shouldExpire = true;

     //Token and Expiry Time Field in UserLogin table is null when Link got Expire
     var data = {userId:state.userId}
        
     axios
    .put(BASE_URL + "/UpdateTokenOnExpiredLink",data)
    .then((response) => {
       debugger
    })
   .catch(error =>{
      const errorMsg = error.message
    })
   
     setTimeout(() => {
         history.push("/login");
     }, 3000);
    return;
     
    }

}
else{
   
 history.push("/login")
}
 

})
.catch(error =>{

 const errorMsg = error.message
 })


       axios.get(BASE_URL + "/CheckPasswordExist?password="  + newPasswordValue )
          .then(response => {
        const isPasswordExist = response.data;
        if(isPasswordExist == "")
        {
           
            var data = {userId:state.userId, oldPassword:oldPasswordValue,
                newPassword:newPasswordValue,
                modifiedBy:state.modifiedBy}
          if(shouldExpire == false)
          {
             
            axios
            .put(BASE_URL + "/UpdateUserLoginPassword",data)
            .then((response) => {
             
             Swal.fire({  
            
              icon: 'success',  
              title: 'Password Updated Successfully!!',  
              showConfirmButton: false,  
              timer: 1500  
            });  
            })
           .catch(error =>{
              const errorMsg = error.message
            })
          }
            
        }
        

    })
    .catch(error =>{
        const errorMsg = error.message
    })
     
      
        document.getElementById('newPassword').value = ""
        document.getElementById('confirmPassword').value = ""

    }
    
}

    return (
        <div>
            {/* <Header/>
            <Sidebar /> */}
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <Row className="heading-bg">
                        <Col lg="3" md="4" sm="4" xs="12">
                            <h5 className="txt-dark">Forget Password</h5>
                        </Col>
                        <Col lg="9" md="8" sm="8" xs="12">
                            <ol className="breadcrumb">
                                <li><a href="/">Dashboard</a></li>
                                <li className="active">Forget Password</li>
                            </ol>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <form role="form">
                                        <div className="panel-body">
                                            <Row>
                                                <Col sm="6">
                                                <div className="form-group control-group">
                                                        <label className="control-label ">New Password</label>
                                                        <Input type="text"
                                                        type="password"
                                                        id="newPassword"
                                                        className="form-control"
                                                        placeholder='New Password' 
                                                        onChange={ e => setPassword(e.target.value)}
                                                        onMouseDown = {preventPaste }
                                                        />
                                              
                                                       <i className="fa fa-eye" aria-hidden="true" 
                                                         id="newPasswordpassStatus"  onClick={viewPasswordNew} ></i>
                                                    </div>


                                                   
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="6">
                                                <div className="form-group control-group">
                                                        <label className="control-label ">Confirm Password</label>
                                                        <Input type="text" 
                                                        type="password" 
                                                        id="confirmPassword"
                                                        placeholder='Confirm Password' 
                                                        onMouseDown = {preventPaste }
                                                        className="form-control"/>
                                                         <i  id="oldPasswordpassStatus" className="fa fa-eye" aria-hidden="true" 
                                                           onClick={viewPasswordConfirm} ></i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="6">
                                                    <ChangePasswordDetails password={password} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="6">
                                                    <Button  
                                                    className="btn" 
                                                    color="primary" 
                                                    onClick={submitUpdatePassword} >
                                                        Update Password
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        </div>

    )
}

export default ForgetPassword
