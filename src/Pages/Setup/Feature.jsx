import React from 'react'
import { Col, Container, Nav, Row } from 'reactstrap'
import Breadcrumbs from '../../Components/Breadcrumbs'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import FeatureDetails from '../../Components/Setup/FeatureDetails'
import Sidebar from '../../Components/Sidebar'
       
const Feature = () => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <FeatureDetails />
                </Container>
                <Footer />
            </div>
        </div>
    )
}

export default Feature
