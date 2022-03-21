import React from 'react'
import AccessControlDetails from '../Components/AccessControlDetails';
import { Col, Container, Nav, Row } from 'reactstrap'
import Header from '../Components/Header';
import Footer from '../Components/Footer'
import Sidebar from '../Components/Sidebar';

const AccessControl = () => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <AccessControlDetails />
                </Container>
                <Footer />
            </div>
        </div>
        
    )
}

export default AccessControl
