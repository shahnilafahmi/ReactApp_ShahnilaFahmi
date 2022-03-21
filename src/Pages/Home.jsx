import React from 'react'
import { Col, Container, Nav, Row } from 'reactstrap'
import Breadcrumbs from '../Components/Breadcrumbs'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import HomeDetails from '../Components/HomeDetails'
import Sidebar from '../Components/Sidebar'
import RegistrationList from '../Components/RegistrationList'

const Home = (props) => {
    return (
        <div>
            <Header/>
            <Sidebar />
            <div className="page-wrapper" >
                <Container className="pt-2">
                    <HomeDetails />
                    {/* <RegistrationList /> */}
                </Container>
                <Footer />
            </div>
        </div>
    )
}

export default Home
