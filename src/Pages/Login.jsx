import React,{useEffect, useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Row, Col,Form, FormGroup, Label ,Input, Button, ModalFooter, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { fetchParam, fetchUsers, passwordReset } from '../Redux/actions/userAction'
import { hasWhiteSpace, validateEmail } from '../utils/helperFunction'
import '../css/login.css'
// import Swal from "sweetalert2";


const Login = (props) => {
    const [loginId, setloginId] = useState()
    const [pass, setPass] = useState()
    const dispatchParam = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [resetPas, setResetPas] = useState();
    
    function submitData (){
        dispatchParam(fetchParam({email: loginId,password: pass, propLink: props}))
    }
    function preventPaste()
    {
    var inputpassword = document.getElementById('loginPswd');
     inputpassword.onpaste = e => e.preventDefault();
   }
    const handleKeyPress = (event) => {
      
        if(event.key === 'Enter'){
            submitData()
            // dispatchParam(fetchParam({email: loginId,password: pass, propLink: props}))
        }
      }
    const resetPassword = () => {
        setModalOpen(!modalOpen);
    }
    const handleClose = () => {
        setModalOpen(false)
        setError("")
        
    };
    
    function submitReset(){

        if(!resetPas ||  hasWhiteSpace(resetPas)){
            setError("Email Field is empty")
        }
        else if(!validateEmail(resetPas)){
            setError("Email is not Valid")
        }
        else{
            dispatchParam(passwordReset({loginId: resetPas, propLink: props}))
        }
    }
    return (
        <div className='auth-page'>
             <Nav className="navbar-transparent navbar navbar-expand-lg " style={{position:'absolute', zIndex:'9'}}>
                 <Container fluid>
                     <div className="ss">
                         <a href="#">
                            <img src="logo.png"/>
                         </a>
                     </div>
                 </Container>
            </Nav>
            <Container className='login100'>
            <div className="auth-form-collimg" style={{backgroundImage:'url(../Images/login-bg2.jpg)'}} >
                <div className="cimg"></div>
            </div>
                
                        <div className="auth-form-col">
                            <div className="aform-wrap">
                                <div className=" auth-form">
                                    <h2 className="text-center mb-0">WELCOME</h2>
                                    <h6 className="text-center nonecase-font mb-10">Sign in to continue</h6>
                                    <Form >
                                        <FormGroup className="form-group">
                                            <Label for="exampleEmail">
                                            Login id
                                            </Label>
                                            <Input
                                            id="loginId"
                                            name="loginId"
                                            type="text"
                                            required=""
                                            height="32"
                                            onChange={e => setloginId(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            
                                            />
                                        </FormGroup>
                                        <FormGroup className="form-group">
                                            <Label for="Password">
                                            Password
                                            </Label>
                                            <Input
                                            id="loginPswd"
                                            name="loginPswd"
                                            type="password"
                                            required=""
                                            onChange={e => setPass(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            onMouseDown = {preventPaste }
                                            />
                                        </FormGroup>
                                        <Button
                                        type="button"
                                        className="w-100 mb-3" 
                                        onClick={submitData}
                                        
                                        >
                                            Login
                                        </Button>
                                        <div className="form-copyright text-center">
                                            Copyright © 2016-2022 Sybrid Pvt Ltd. 
                                        </div>
                                    </Form>
                                </div>
                                <Button onClick={resetPassword} className="form-forgot">Forgot Password</Button>
                            </div>	
                        </div>
                    
            </Container>
            <Modal
            isOpen={modalOpen}
            toggle={resetPassword}>
                <Form >
                    <div className='modal-header'>
                        <h5 class="modal-title">Forget Password</h5>
                        <Button type="button" class="btn btn-close" color='close' aria-label="Close"
                        onClick={handleClose}
                        toggle={function noRefCheck(){}}
                        >×
                        </Button>
                    </div>
                    <ModalBody>
                        <Row>
                            <Col>
                                <p style={{color:'red'}}>{error}</p>
                                <div className="form-group">
                                    <label className="control-label ">Email</label>
                                    <Input type="text" 
                                    className="form-control" 
                                    name="resetEmail"
                                    onChange={e => setResetPas(e.target.value)}
                                    // value={roleName}
                                    // onChange={handleInputChange}
                                    />
                                </div>
                                
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            type="button"
                            onClick={submitReset}>
                            Send
                        </Button>
                        {' '}
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default Login
