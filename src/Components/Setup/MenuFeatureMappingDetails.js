import React,{useState,useEffect} from 'react'
import { Button, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL_SETUP } from "../../Redux/actionType/apiConfig";
import { fetchFeature } from '../../Redux/actions/Setup/featureAction';
import { fetchMenuFeature } from '../../Redux/actions/Setup/menuFeatureAction';
import { addedMenuItemFeature, DeleteMenuItemById, fetchMenuItemFeature } from '../../Redux/actions/Setup/menuItemFeatureAction';
import { fetchAccessFeature } from '../../Redux/actions/getAccessFeatureAction';
const MenuFeatureMappingDetails = ({ fetchFeature,  featureData,fetchMenuFeature, menuFeatureData, menuFeatureItemData, employeeAccess, fetchAccessFeature}) => {
    const dispatch = useDispatch()
    var storedNames = JSON.parse(localStorage.getItem("loginData"));
    useEffect(() => {
        fetchMenuFeature()
        fetchFeature()
        fetchAccessFeature()
    }, [])
    var arrFeature = []
    employeeAccess.accessfeature.map(data=>{
        arrFeature.push(data.feature)
    })
    const [menuItemId, setMenuItemId] = useState()
    const [featureId, setFeatureId] = useState()
    const [selectValue, setSelectValue] = useState();
    const [error, setError] = useState("");

  
    // Insert Cost center Dispatch
    const submitData = (e) =>{
        e.preventDefault()
        if(!menuItemId || !featureId ){
            setError("Please Fill All Fields")
        }
        else{
            setError("")
        //    dispatch(fetchMenuItemExists({menuId: menuItemId,featureId: featureId}))
           axios
           .get(BASE_URL_SETUP + "/IsFeatureMappingAlreadyExist/" + menuItemId + "/" + featureId)
           .then((response) => {
                if(response.data === false){
                    Swal.fire({
                        customClass: {
                        container: 'my-swal'
                        },
                        text: 'Feature Already Exists',
                        icon: 'error',
                        confirmButtonText: `Ok`,
                        confirmButtonColor: '#bf1e2e',
                        focusConfirm: false,
                        timer: 3000,
                    })  
                }
                else{
                    Swal.fire({
                    customClass: {
                    container: 'my-swal'
                    },
                    text: 'Saved Data Successfully',
                    icon: 'success',
                    confirmButtonText: `OK`,
                    timer: 3000,
                }).then((result) => { 
                    dispatch(addedMenuItemFeature({
                    featureId: featureId,
                    menuItemId: menuItemId,
                    createdBy: storedNames.createdBy,
                    modifiedBy: storedNames.modifiedBy,
                }))
                    if(result.isDismissed){
                        setTimeout(() => {
                            dispatch(fetchMenuItemFeature({id: selectValue}))
                            // setMenuItemId('')
                            setFeatureId('')
                        }, 500);
                    }
                    else if(result.isConfirmed){
                        setTimeout(() => {
                            dispatch(fetchMenuItemFeature({id: selectValue}))
                            // setMenuItemId('')
                            setFeatureId('')
                        }, 500);
                        }
                    })
                }
            })
        }      
    }
    
    const getSelect = (e) =>{
        const getValue = e.target.value;
        setMenuItemId(getValue)
        dispatch(fetchMenuItemFeature({id: getValue}))
        setSelectValue(getValue)
    }



    // Delete Role Dispatch 
    const deleteModal = (data) => {
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
                dispatch(DeleteMenuItemById({menuItemFeatureId: data.menuItemFeatureId
                }))
                setTimeout(() => {
                    dispatch(fetchMenuItemFeature({id: selectValue}))
                }, 500);
            }
        });
    }



    
    return (
        <>
            <Row className="heading-bg">
                <Col lg="6" md="6" sm="6" xs="12">
                    <h5 className="txt-dark">Menu Item Feature Mapping</h5>
                </Col>
                <Col lg="6" md="8" sm="6" xs="12">
                    <ol className="breadcrumb">
                        <li><a href="/">Dashboard</a></li>
                        <li className="active">Menu Item Feature Mapping</li>
                    </ol>
                </Col>
            </Row>
            <Row>
            <Col sm="5">
                    <Card>
                        <CardBody>
                            <CardTitle tag="div">
                                <Row style={{alignItems:'center'}}>
                                    <Col sm="6">
                                        <h6>
                                        Add Menu Feature
                                        </h6>
                                    </Col>
                                </Row>
                            </CardTitle>
                            <Form onSubmit={submitData}>
                                <div className='panel-body'>
                                    <Row>
                                        <Col sm="12">
                                            <p style={{color:'red'}}>{error}</p>
                                        </Col>
                                        <Col sm="12">
                                            <div className="form-group">
                                                <label className="control-label ">Menu Name</label>
                                                <select
                                                className='form-control form-select'
                                                name="menuItemId"
                                                id="menuItemId"
                                                value={menuItemId}
                                                onChange={getSelect}
                                                // onChange={e => setMenuItemId(e.target.value)}
                                                // onChange={handleInputChange}
                                                >
                                                    <option value="0">Please Select Value</option>
                                                    {menuFeatureData.menufeature.map((data)=>{
                                                        return(
                                                        <option key={data.menuId} value={data.menuId}>{data.menuName}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </Col>
                                        <Col sm="12">
                                            <div className="form-group">
                                                <label className="control-label ">Feature Name</label>
                                                <select
                                                className='form-control form-select'
                                                name="featureId"
                                                id="featureId"
                                                value={featureId}
                                                onChange={e => setFeatureId(e.target.value)}
                                                // onChange={handleInputChange}
                                                >
                                                    <option value="0">Please Select Value</option>
                                                    {featureData.features.map((data)=>{
                                                        return(
                                                        <option key={data.featureId} value={data.featureId}>{data.feature}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </Col>
                                        <Col sm="12">
                                            {arrFeature.includes("Add") ? 
                                                <Button
                                                    color="primary"
                                                    className='mt-2 mb-2'
                                                    >
                                                    Add Menu Feature
                                                </Button>
                                                : ''
                                            }
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="7">
                    <Card>
                        <CardBody>
                            {/* <CardTitle tag="div">
                                <Row style={{alignItems:'center'}}>
                                    <Col sm="6">
                                        <h6>
                                        Menu Feature
                                        </h6>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className='mapingfear'>
                                            <select className='form-select form-control' 
                                            onChange={getSelect}
                                            style={{width: '250px'}}>
                                                <option value="null">Please Select Value</option>
                                                {menuFeatureData.menufeature.map((data)=>{
                                                    return(
                                                    <option key={data.menuId} value={data.menuId}>{data.menuName}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                            </CardTitle> */}
                            <form role="form">
                                <div className="panel-body">
                                    <Row>
                                        <Col sm="12">
                                            <div className="table-responsive">
                                                <table className="table table-striped mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th width="25%">Feature</th>
                                                            <th className="text-right">Action</th>
                                                        </tr>
                                                    </thead>
                                                    {menuFeatureItemData.loading ?(
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    Loading
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): menuFeatureItemData.error ? (
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    {menuFeatureItemData.error}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): (
                                                        <tbody>
                                                            {menuFeatureItemData && menuFeatureItemData.menuitem &&
                                                            menuFeatureItemData.menuitem.map((data) =>{
                                                                return(
                                                                    <tr key={data.featureId}>
                                                                        <td>{data.feature}</td>
                                                                        <td className="text-right">
                                                                        {arrFeature.includes("Delete") ? 
                                                                            <Button 
                                                                            className="btn btnic" 
                                                                            color="secondary" 
                                                                            onClick={() => {deleteModal(data)}}
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
        </>
    )
}
const mapStateToProps = state => {
    return {
        featureData:state.feature,
        menuFeatureData: state.menufeature,
        menuFeatureItemData: state.menufeatureitem,
        employeeAccess: state.employeeAccess
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchFeature:()=>dispatch(fetchFeature()),
        fetchMenuFeature:()=> dispatch(fetchMenuFeature()),
        fetchMenuItemFeature:()=> dispatch(fetchMenuItemFeature()),
        fetchAccessFeature: () => dispatch(fetchAccessFeature())
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (MenuFeatureMappingDetails)
