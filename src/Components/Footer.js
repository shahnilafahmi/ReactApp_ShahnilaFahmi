import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import '../css/footer.css'

const Footer = () => {
    return (
        <div className="footer pl-3 pr-3">
            <Container>
                <Row>
                    <Col sm="12">
                        <p>Copyright Sybrid © 2016-2021.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
