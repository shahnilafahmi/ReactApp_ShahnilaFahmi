import React from 'react'
import { Col, Container, Nav, Row } from 'reactstrap'
import Breadcrumbs from '../../Components/Breadcrumbs'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import MenuFeatureMappingDetails from '../../Components/Setup/MenuFeatureMappingDetails'
import Sidebar from '../../Components/Sidebar'
       
const Test = () => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <MenuFeatureMappingDetails />
                </Container>
                <Footer />
            </div>
        </div>
    )
}

export default Test
