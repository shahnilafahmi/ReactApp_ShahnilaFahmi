import React from 'react'
import { Button, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input } from 'reactstrap'

const HomeDetails = () => {
    return (
        <>
            <Row className="heading-bg">
                <Col lg="3" md="4" sm="4" xs="12">
                    <h5 className="txt-dark">Home Page (will design later after getting HTML)</h5>
                </Col>
                <Col lg="9" md="8" sm="8" xs="12">
                    <ol className="breadcrumb">
                        <li><a href="/">Dashboard</a></li>
                        <li className="active">Home</li>
                    </ol>
                </Col>
            </Row>
            {/* <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h6">
                                Search
                            </CardTitle>
                            <form role="form">
                                <div className="panel-body">
                                    <Row>
                                        <Col sm="2">
                                            <div className="form-group">
                                                <label className="control-label ">Bank Prefix</label>
                                                <Input type="text" className="form-control"/>
                                            </div>
                                        </Col>
                                        <Col sm="2">
                                            <div className="form-group">
                                                <label className="control-label">Bank Description</label>
                                                <Input type="text" className="form-control"/>
                                            </div>
                                        </Col>
                                        <Col className="text-right" sm="8">
                                            <Button type="submit" color="primary">
                                                Search
                                            </Button>
                                            <Button type="submit" color="secondary">
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle tag="div">
                                <Row style={{alignItems:'center'}}>
                                    <Col>
                                        <h6>
                                            Bank Detail
                                        </h6>
                                    </Col>
                                    <Col className="text-right">
                                        <Button type="submit" color="primary">
                                            Add New
                                        </Button>
                                    </Col>
                                </Row>
                            </CardTitle>
                            <form role="form">
                                <div className="panel-body">
                                    <Row>
                                        <Col sm="12">
                                        <div className="table-responsive">
                                                <table className="table table-striped mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th width="8%">S.No</th>
                                                            <th width="12%">Role</th>
                                                            <th width="33%" className="text-center">Created By</th>
                                                            <th width="33%" className="text-center">Modified By</th>
                                                            <th className="text-right">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                1
                                                            </td>
                                                            <td>
                                                                Admin
                                                            </td>
                                                            <td className="text-center">
                                                                Super Admin
                                                             
                                                                On 28-Aug
                                                            </td>
                                                            <td className="text-center">
                                                            Super Admin
                                                               
                                                                On 28-Aug
                                                            </td>
                                                            <td className="text-right">
                                                            <Button className="btn btnic" color="primary"><i className="fa fa-pencil"></i></Button>
                                                            <Button className="btn btnic" color="secondary"><i className="fa fa-trash"></i></Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
        </>
    )
}

export default HomeDetails
