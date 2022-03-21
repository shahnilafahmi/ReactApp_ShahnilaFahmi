import React from 'react'
import { Col, Container, Nav, Row } from 'reactstrap'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import TestDetails from '../Components/testDetails'
import Sidebar from '../Components/Sidebar'

const Test = () => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <TestDetails />
                </Container>
                <Footer />
            </div>
        </div>
    )
}

export default Test
