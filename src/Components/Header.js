import React,{useState} from 'react'
import { Container, Nav, Row,Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import '../css/header.css'
import {logout} from '../utils'
import { useHistory } from 'react-router'
import ToggleComponent from './ToggleComponent'
import { Link } from 'react-router-dom'

const Header = () => {
    let history = useHistory();
    const [isActive, setActive] = useState(false);
    const toggleMenu = (e)=>{
        e.preventDefault();
        setActive(!isActive);
    }
    function logOut(){
        logout()
        history.push("/login")
        
    }
    
    return (
        <div className="mainHeader">
            <Nav className="navbar navbar-inverse navbar-fixed-top ">
                <Container fluid className="nav-wrap">
                    <div className="mobile-only-brand pull-left">
                        <div className="nav-header pull-left">
                            <div className="logo-wrap"> 
                                <Link to="/"> 
                                    <img className="logo-img" src="/logo.png" alt="Logo"/> 
                                    {/* <span className="brand-text">
                                        <img src="logo.png" alt="brand"/>
                                    </span>  */}
                                </Link> 
                            </div>
                        </div>
                        <ToggleComponent message="Data from first component" />
                    </div>
                    <div id="mobile_only_nav" className="mobile-only-nav pull-right">
                        <ul className="nav navbar-right top-nav pull-right">
                            <li className="dropdown auth-drp">
                                <a href="#" className=" pr-0" data-toggle="dropdown" onClick={toggleMenu}> 
                                    <span className="user-auth-name inline-block"> 
                                        <span id="lblLoginStatus">HRMS</span> 
                                        <span className="ti ti-angle-down"></span> 
                                    </span> 
                                    <img src="/Images/user1.jpg" alt="user_auth" className="user-auth-img img-circle"/>
                                    <span className="user-online-status"></span> 
                                </a>
                                { isActive ?
                                <ul className="dropdown-menu user-auth-dropdown show">
                                    <li> <a href="#"><i className="ti ti-user text-primary"></i><span>Profile</span></a> </li>
                                    <li className="divider"></li>
                                    <li> <Link to="/changepassword"><i className="ti ti-pencil-alt text-warning"></i> Change Password</Link> </li>
                                    <li className="divider"></li>
                                    <li> <a href="#"><i className="ti ti-check text-success"></i> available</a> </li>
                                    <li className="divider"></li>
                                    <li> <a href="#" onClick={logOut}><i className="ti ti-power-off text-danger"></i><span>Log Out</span></a> </li>
                                </ul>
                                : ''}
                            </li>
                        </ul>
                    </div>
                </Container>
            </Nav>
        </div>
    )
}

export default Header
