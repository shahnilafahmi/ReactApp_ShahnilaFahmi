import React from 'react'
import { Col, Container, Nav, Row } from 'reactstrap'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import RoleDetails from '../Components/RoleDetails'
import Sidebar from '../Components/Sidebar'

const Role = () => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <RoleDetails />
                </Container>
                <Footer />
            </div>
        </div>
    )
}

export default Role
