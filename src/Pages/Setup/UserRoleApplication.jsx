import React from 'react'
import { Col, Container, Nav, Row } from 'reactstrap'
import Breadcrumbs from '../../Components/Breadcrumbs'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import UserRoleApplicationDetails from '../../Components/Setup/UserRoleApplicationDetails'
import Sidebar from '../../Components/Sidebar'
       
const UserRoleApplication = () => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <UserRoleApplicationDetails />
                </Container>
                <Footer />
            </div>
        </div>
    )
}

export default UserRoleApplication
