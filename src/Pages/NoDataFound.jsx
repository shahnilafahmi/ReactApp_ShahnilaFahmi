import React from 'react'
import { Col, Container, Nav, Row } from 'reactstrap'
import Breadcrumbs from '../Components/Breadcrumbs'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import NoDataFoundDetails from '../Components/NoDataFoundDetails'
import Sidebar from '../Components/Sidebar'

const NoDataFound = (props) => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <NoDataFoundDetails />
                </Container>
                <Footer />
            </div>
        </div>
    )
}

export default NoDataFound
