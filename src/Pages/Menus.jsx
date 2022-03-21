import React from 'react'
import { Col, Container, Nav, Row } from 'reactstrap'
import Breadcrumbs from '../Components/Breadcrumbs'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import MenuDetails from '../Components/MenuDetails'
import Sidebar from '../Components/Sidebar'

const Menus = () => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <MenuDetails />
                </Container>
                <Footer />
            </div>
        </div>
    )
}

export default Menus
