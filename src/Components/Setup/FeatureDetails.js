import React,{useState,useEffect} from 'react'
import { Button, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addedFeature, fetchFeature, updatedFeature, deletedFeature, searchFeature } from '../../Redux/actions/Setup/featureAction'
import { useHistory } from 'react-router'
import Swal from "sweetalert2";
import { fetchAccessFeature } from '../../Redux/actions/getAccessFeatureAction'


const FeatureDetails = ({featureData, fetchFeature, employeeAccess, fetchAccessFeature}) => {
    const dispatch = useDispatch()
    let history = useHistory();
    var storedNames = JSON.parse(localStorage.getItem("loginData"));
    useEffect(() => { 
        fetchFeature()
        fetchAccessFeature()
    }, [])
    var arrFeature = []
    employeeAccess.accessfeature.map(data=>{
        arrFeature.push(data.feature)
    })
    const [modalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const handleUpdateClose = () => setUpdateModalOpen(false);
   

    const [featureId,setFeatureId] = useState()
    const [feature,setFeature] = useState()
  
    
    const [search, setSearch] =useState('')

    // Show Modal for Insert  
    const addFeature = () => {
        setModalOpen(!modalOpen);
        setError("")
    }
    // Show Modal and set Data
    const updateFeature = (featureData) => {
        setUpdateError("")
        setUpdateModalOpen(!updateModalOpen);
        setFeatureId(featureData.featureId)
        setFeature(featureData.feature)
       

    }
    
    // State handle 
    const [state, setState] = useState({
        featureId: featureId,
        feature: "",
        applicationId: storedNames.applicationId,
        createdBy: storedNames.createdBy,
        modifiedBy: storedNames.modifiedBy,
        userIp: ""
    });
   
    const [error, setError] = useState("");
    const [updateError, setUpdateError] = useState("");
    
    // Set states 


    // OnChange for Insert 
    const handleInputChange = (e) =>{
        let {name, value} = e.target;
        setState({...state, [name]: value})
    }


    
    // Insert Role Dispatch
    const submitFeature = (e) =>{
        e.preventDefault()
       
      
            if(!state.feature){
            setError("Please Fill All Fields")
        }
        else{
            setModalOpen(false);
            setError("")
            Swal.fire({
                customClass: {
                  container: 'my-swal'
                },
                text: 'Saved Data Successfully',
                icon: 'success',
                confirmButtonText: `OK`,
                timer: 3000,
            }).then((result) => { 
                dispatch(addedFeature(state))

                state.feature = '';

                if(result.isDismissed){
                    setTimeout(() => {
                        fetchFeature();
                    }, 500);
                }
                else if(result.isConfirmed){
                    setTimeout(() => {
                        fetchFeature();
                    }, 500);
                }
            })
        }
    }


    // onchange Function for Update
    const handleInputUpdateChange = (e) =>{
      
        let {name, value} = e.target;
        setState({...state, [name]: value})
    }


    //Update  Dispatch
    const submitUpdateFeature = (e) =>{
        e.preventDefault()
      
        var featureValue = document.getElementById('txtFeature').value;
       

         if(featureValue == "" ){
           
            setUpdateError("Please Update any Field to Continue")
        }
        else{
            state.feature = featureValue;
            setUpdateModalOpen(!updateModalOpen)
            setUpdateError("")
            Swal.fire({
                customClass: {
                  container: 'my-swal'
                },
                text: 'Update Data Successfully',
                icon: 'success',
                confirmButtonText: `OK`,
                timer: 3000,
            }).then((result) => { 
                dispatch(updatedFeature(state,featureId))

                state.feature = '';

                if(result.isDismissed){
                    setTimeout(() => {
                        fetchFeature();
                    }, 500);
                }
                else if(result.isConfirmed){
                    setTimeout(() => {
                        fetchFeature();
                    }, 500);
                }
            })
        }    
    }

 
    // Delete  Dispatch 
    const deleteFeature = (featureData) => {
        Swal.fire({
            customClass: {
              container: 'my-swal'
            },
            text: 'Are your sure?',
            icon: 'error',
            confirmButtonText: `Confirm`,
            confirmButtonColor: '#bf1e2e',
            showCancelButton: true,
            focusConfirm: false,
            cancelButtonText: `Cancel`,
            cancelButtonColor: '#2f4050',
        }).then((result) => { 
            if(result.isConfirmed){
                dispatch(deletedFeature({featureId:featureData.featureId,
                    modifiedDate:storedNames.modifiedDate,
                    modifiedBy:storedNames.modifiedBy,
                    userIP:""
                }))
                setTimeout(() => {
                    fetchFeature();
                }, 500);
            }
        });
        

    }

    // Search Role Dispatch 
    function searFeature (){
     
         if(search === undefined || search === ''){
           
            Swal.fire({
                customClass: {
                  container: 'my-swal'
                },
                text: 'Insert Any Word to Search',
                icon: 'warning',
                confirmButtonText: `Close`,
                confirmButtonColor: '#d33',
              })
        }
        else{
         
        dispatch(searchFeature({name: search}))
        }
    }
    function clearSearch () {
       setSearch('')
       fetchFeature()
    }

    
    return (
        <>
            <Row className="heading-bg">
                <Col lg="3" md="4" sm="4" xs="12">
                    <h5 className="txt-dark">Feature </h5>
                </Col>
                <Col lg="9" md="8" sm="8" xs="12">
                    <ol className="breadcrumb">
                        <li><a href="/">Dashboard</a></li>
                        <li className="active">Feature</li>
                    </ol>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h6">
                                Search
                            </CardTitle>
                            <Form >
                                <div className="panel-body">
                                    <Row>
                                        <Col sm="4">
                                            <div className="form-group">
                                                <label className="control-label ">Feature</label>
                                              
                                               <Input 
                                                type="text" 
                                              
                                                value={search}
                                                className="form-control"
                                                onChange={e => setSearch(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="text-right" sm="8">
                                            {arrFeature.includes("Search") ? 
                                                <Button 
                                                onClick={searFeature}
                                                color="primary"
                                                // type="submit" 
                                                className="btn">
                                                    Search
                                                </Button>
                                                : ''
                                            }
                                            <Button 
                                            className="btn"
                                            color="secondary"
                                            onClick={clearSearch}
                                            >
                                                Reset
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
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
                                            Feature Details
                                        </h6>
                                    </Col>
                                    <Col className="text-right">
                                        {arrFeature.includes("Add") ? 
                                            <Button 
                                            color="primary"
                                            onClick={addFeature}>
                                                Add New
                                            </Button>
                                            : ''
                                        }
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
                                                           
                                                            <th width="25%">Feature Name</th>
                                                          
                                                            <th className="text-right">Action</th>
                                                        </tr>
                                                    </thead>
                                                    {featureData.loading ?(
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    Loading
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): featureData.error ? (
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    {featureData.error}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): (
                                                        <tbody>
                                                            {featureData && featureData.features &&
                                                            featureData.features.map((feature) =>{
                                                                return(
                                                                    <tr key={feature.featureId}>
                                                                        <td>{feature.feature}</td>
                                                                        <td className="text-right">
                                                                        {arrFeature.includes("Edit") ? 
                                                                            <Button 
                                                                            className="btn btnic" 
                                                                            color="primary" 
                                                                            onClick={() => {updateFeature(feature)}}
                                                                            >
                                                                                <i className="fa fa-pencil"></i>
                                                                            </Button>
                                                                            : ''
                                                                        }
                                                                        {arrFeature.includes("Delete") ? 
                                                                            <Button 
                                                                            className="btn btnic" 
                                                                            color="secondary" 
                                                                            onClick={() => {deleteFeature(feature)}}
                                                                            >
                                                                                <i className="fa fa-trash"></i>
                                                                            </Button>
                                                                            : ''
                                                                        }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                            }
                                                        </tbody>
                                                    )
                                                    }
                                                </table>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        {/* Add  Modal */}
        <Modal
        isOpen={modalOpen}
        toggle={addFeature}
        backdrop="static"
        >
            <Form onSubmit={submitFeature}>
                <div className='modal-header'>
                    <h5 className="modal-title">Add Feature</h5>
                    <Button type="button" className="btn btn-close" color='close' aria-label="Close"
                    onClick={handleClose}
                    >×
                    </Button>
                </div>
                <ModalBody>
                    <Row>
                        <Col>
                            <p style={{color:'red'}}>{error}</p>
                            <div className="form-group">
                                <label className="control-label ">Feature</label>
                                <Input type="text" 
                                className="form-control" 
                                name="feature"
                                onChange={handleInputChange}
                                />
                            </div>
                           
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary">
                        Add Feature
                    </Button>
                    {' '}
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>

        {/* Update Modal */}
        <Modal
        isOpen={updateModalOpen}
        toggle={updateFeature}
        backdrop="static"
        >
            <Form onSubmit={submitUpdateFeature}>
                <div className='modal-header'>
                    <h5 className="modal-title">Update Feature</h5>
                    <Button type="button" className="btn btn-close" color='close' aria-label="Close"
                    onClick={handleUpdateClose}
                    >×
                    </Button>
                </div>
                <ModalBody>
                    <p style={{color:'red'}}>{updateError}</p>
                    <div className="form-group">
                      
                        <label className="control-label ">Feature</label>
                        <Input type="text" 
                        className="form-control" 
                        name="feature"
                        ID="txtFeature"
                        defaultValue={feature}
                        onChange={handleInputUpdateChange}
                        />
                    </div>
                  
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        // onClick={function noRefCheck(){}}
                        >
                        Update Feature
                    </Button>
                    {' '}
                    <Button onClick={handleUpdateClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
        </>
    )
}
const mapStateToProps = state => {
    return {
        
        featureData: state.feature,
        employeeAccess: state.employeeAccess
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchFeature: () => dispatch(fetchFeature()),
        fetchAccessFeature: () => dispatch(fetchAccessFeature())
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (FeatureDetails)
