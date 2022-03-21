import React from 'react'
import { Col, Container, Nav, Row } from 'reactstrap'
import Breadcrumbs from '../../Components/Breadcrumbs'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import UserLocationMappingDetails from '../../Components/Setup/UserLocationMappingDetails'
import Sidebar from '../../Components/Sidebar'
       
const UserLocationMapping = () => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <UserLocationMappingDetails />
                </Container>
                <Footer />
            </div>
        </div>
    )
}

export default UserLocationMapping
