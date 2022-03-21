import React from 'react'
import { Col, Row } from 'reactstrap'
import '../css/dashboard.css'

const Breadcrumbs = () => {
    return (
        <>
            <Row className="heading-bg">
                <Col lg="3" md="4" sm="4" xs="12">
                    <h5 className="txt-dark">Role</h5>
                </Col>
                <Col lg="9" md="8" sm="8" xs="12">
                    <ol className="breadcrumb">
                        <li><a href="index.html">Dashboard</a></li>
                        <li className="active">Role</li>
                    </ol>
                </Col>
            </Row>
        </>
    )
}

export default Breadcrumbs
