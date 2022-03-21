import React, { useState } from 'react'
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

       
const ChangePassword = () => {
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
function preventPaste()
{
    var newPasswordValue = document.getElementById('newPassword');
    var oldPasswordValue = document.getElementById('oldPassword');
    newPasswordValue.onpaste = e => e.preventDefault();
    oldPasswordValue.onpaste = e => e.preventDefault();
 
}

function viewPasswordOld(e)
{
   // var newPasswordValue = document.getElementById('newPassword');
    var oldPasswordValue = document.getElementById('oldPassword');

   // var newPasswordpassStatus= document.getElementById('newPasswordpassStatus');
    var oldPasswordpassStatus= document.getElementById('oldPasswordpassStatus');

    if (oldPasswordValue.type == 'password')
    {
        oldPasswordValue.type='text';
        oldPasswordpassStatus.className='fa fa-eye-slash';
    }
    else
    {
        oldPasswordValue.type='password';
        oldPasswordpassStatus.className='fa fa-eye';
    }


    
   
}
function viewPasswordNew(e)
{
  
    var newPasswordValue = document.getElementById('newPassword');
    //var oldPasswordValue = document.getElementById('oldPassword');

    var newPasswordpassStatus= document.getElementById('newPasswordpassStatus');
   // var oldPasswordpassStatus= document.getElementById('oldPasswordpassStatus');

    if (newPasswordValue.type == 'password')
    {
        newPasswordValue.type='text';
        newPasswordpassStatus.className='fa fa-eye-slash';
    }
    else
    {
        newPasswordValue.type='password';
        newPasswordpassStatus.className='fa fa-eye';
    }
   
}


function viewPasswordConfirm(e)
{
  
    var confirmPasswordValue = document.getElementById('confirmPassword');
    var confirmPasswordpassStatus= document.getElementById('confirmPasswordpassStatus');
  
    if (confirmPasswordValue.type == 'password')
    {
        confirmPasswordValue.type='text';
        confirmPasswordpassStatus.className='fa fa-eye-slash';
    }
    else
    {
        confirmPasswordValue.type='password';
        confirmPasswordpassStatus.className='fa fa-eye';
    }
   
}


//Update Role Dispatch
const submitUpdatePassword = (e) =>{
    e.preventDefault()
  

  
  var newPasswordValue = document.getElementById('newPassword').value;
  var oldPasswordValue = document.getElementById('oldPassword').value;
  var confirmPasswordValue = document.getElementById('confirmPassword').value;
  state.newPassword = newPasswordValue;
  state.oldPassword = oldPasswordValue;

  //console.log("Update Business Unit",state)
      
     if(newPasswordValue == '' ||  oldPasswordValue == ""){
       alert("Please add new password to Continue");
        //setUpdateError("Please add new Field to Continue")
    }
    else{
     
        
                //Check  password should not be less than 12 Character
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
        
                  //password and confirm password matching
        if(confirmPasswordValue != newPasswordValue)
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

      //Check If Old Password Exist in Daatbase
      axios.get(BASE_URL + "/CheckPasswordExist?password="  + newPasswordValue )
      .then(response => {
          const isPasswordExist = response.data;
          debugger;
          if(isPasswordExist == "")
          {
       
            //Update Password if Old password Exist in DataBase
            //   var data = {userId:state.userId, oldPassword:oldPasswordValue,
            //     newPassword:newPasswordValue,
            //     modifiedBy:state.modifiedBy}

        var data = {newPassword:newPasswordValue,oldPassword:oldPasswordValue,userId:state.userId }
          axios
         .put(BASE_URL + "/UpdateUserLoginPassword", data)
         .then((result) => {
            const passwordChangemessage = result.data;
           
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
       })
      .catch(error =>{
          const errorMsg = error.message
      })

                  document.getElementById('confirmPassword').value = ""
                  document.getElementById('newPassword').value = ""
                  document.getElementById('oldPassword').value = ""

    } 
    
}

    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <Row className="heading-bg">
                        <Col lg="3" md="4" sm="4" xs="12">
                            <h5 className="txt-dark">Change Password</h5>
                        </Col>
                        <Col lg="9" md="8" sm="8" xs="12">
                            <ol className="breadcrumb">
                                <li><a href="/">Dashboard</a></li>
                                <li className="active">Change Password</li>
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
                                                        <label className="control-label ">Old Password</label>
                                                        <Input type="text" 
                                                        type="password" 
                                                        id="oldPassword"
                                                        placeholder='Old Password' 
                                                        onMouseDown = {preventPaste }
                                                        className="form-control"/>
                                                          <i  id="oldPasswordpassStatus" className="fa fa-eye" aria-hidden="true" 
                                                           onClick={viewPasswordOld} ></i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="6">
                                                    <div className="form-group control-group">
                                                        <label className="control-label ">New Password</label>
                                                        <Input type="text"
                                                        type="password"
                                                        id="newPassword"
                                                        className="form-control"
                                                        placeholder='New Password' 
                                                        onMouseDown = {preventPaste }
                                                        onChange={ e => setPassword(e.target.value)} />

                                                        <i className="fa fa-eye" aria-hidden="true" 
                                                         id="newPasswordpassStatus"  onClick={viewPasswordNew} ></i>

                                                       
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
                                                    <div className="form-group control-group">
                                                        <label className="control-label ">Confirm Password</label>
                                                        <Input type="text"
                                                        type="password"
                                                        id="confirmPassword"
                                                        className="form-control"
                                                        placeholder='Confirm Password' 
                                                        onMouseDown = {preventPaste }
                                                        onChange={ e => setPassword(e.target.value)} />

                                                        <i className="fa fa-eye" aria-hidden="true" 
                                                         id="confirmPasswordpassStatus"  onClick={viewPasswordConfirm} ></i>

                                                       
                                                    </div>
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

export default ChangePassword
