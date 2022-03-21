import React,{useState,useEffect} from 'react'
import { Button, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addedRole, fetchRoles, updatedRole, deletedRole, searchRole } from '../Redux/actions/roleAction'
import { useHistory, useLocation  } from 'react-router'
import Swal from "sweetalert2";
import { appMenu } from '../Redux/actions/applicationAction'


const RoleDetails = ({roleData, fetchRoles, appMenu, appData}) => {
    const dispatch = useDispatch()
    var storedNames = JSON.parse(localStorage.getItem("loginData"));
    useEffect(() => {
        fetchRoles()
    }, [])
    const [modalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const handleUpdateClose = () => setUpdateModalOpen(false);
    
    const [roleId,setRoleId] = useState()
    const [roleNameOf,setRoleNameOf] = useState()
    const [appId,setAppId] = useState()
    const [search, setSearch] =useState('')

    // Show Modal for Insert Role 
    const addRole = () => {
        setModalOpen(!modalOpen);
        setError("")
        appMenu()
    }
    // Show Modal and set Data
    const updateRole = (roleData) => {
        setUpdateError("")
        appMenu()
        setUpdateModalOpen(!updateModalOpen);
        setRoleId(roleData.roleId)
        setRoleNameOf(roleData.roleName)
        setAppId(roleData.applicationId)

    }
    
    // State handle 
    const [state, setState] = useState({
        roleName: "",
        applicationId: "",
        createdBy: storedNames.createdBy,
        modifiedBy: storedNames.modifiedBy,
        userIp: ""
    });
    const [error, setError] = useState("");
    const [updateError, setUpdateError] = useState("");
    
    // Set states 
    const {roleName, applicationId} = state;

    // OnChange for Insert 
    const handleInputChange = (e) =>{
        let {name, value} = e.target;
        setState({...state, [name]: value})
    }

  
    // Insert Role Dispatch
    const submitRole = (e) =>{
        e.preventDefault()
      
        if(!roleName || !applicationId){
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
                dispatch(addedRole(state))
                state.roleName = '';

                if(result.isDismissed){
                    setTimeout(() => {
                        fetchRoles();
                    }, 500);
                }
                else if(result.isConfirmed){
                    setTimeout(() => {
                        fetchRoles();
                    }, 500);
                }
            })
        }
        
    }




    //Update Role Dispatch
    const submitUpdateRole = (e) =>{
        e.preventDefault()
        if(!roleNameOf || !appId ){
            setUpdateError("Please Fill All Fields")
        }
        else{
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
                dispatch(updatedRole({roleName: roleNameOf,
                    applicationId: appId,
                    modifiedBy: storedNames.modifiedBy,
                    userIp: ""},roleId))

                state.roleName = '';
                state.applicationId= 0
                
                if(result.isDismissed){
                    setTimeout(() => {
                        fetchRoles();
                    }, 500);
                }
                else if(result.isConfirmed){
                    setTimeout(() => {
                        fetchRoles();
                    }, 500);
                }
            })
        }
        
    }


    // Delete Role Dispatch 
    const deleteRole = (roleData) => {
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
                dispatch(deletedRole({roleId: roleData.roleId, modifiedBy: storedNames.modifiedBy,
                    userIp: "", modifiedDate: storedNames.modifiedDate }))
                setTimeout(() => {
                    fetchRoles();
                }, 500);
            }
        });
    }

    // Search Role Dispatch 
    function searRoles (){
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
        dispatch(searchRole({name: search}))
        }
    }
    function clearSearch () {
       setSearch('')
       fetchRoles()
    }

    
    return (
        <>
            <Row className="heading-bg">
                <Col lg="3" md="4" sm="4" xs="12">
                    <h5 className="txt-dark">Role</h5>
                </Col>
                <Col lg="9" md="8" sm="8" xs="12">
                    <ol className="breadcrumb">
                        <li><a href="/">Dashboard</a></li>
                        <li className="active">Role</li>
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
                                                <label className="control-label ">Role</label>
                                                <Input 
                                                type="text" 
                                                value={search}
                                                className="form-control"
                                                onChange={e => setSearch(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="text-right" sm="8">
                                            <Button 
                                            onClick={searRoles}
                                            // type="submit"
                                            color="primary" 
                                            className="btn">
                                                Search
                                            </Button>
                                            <Button 
                                            color="secondary"
                                            className="btn"
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
                                            Role Details
                                        </h6>
                                    </Col>
                                    <Col className="text-right">
                                        <Button 
                                        color="primary"
                                        onClick={addRole}>
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
                                                            <th width="35%">Role Name</th>
                                                            <th>Application Name</th>
                                                            <th className="text-right">Action</th>
                                                        </tr>
                                                    </thead>
                                                    {roleData.loading ?(
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <h2>Loading</h2>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): roleData.error ? (
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    {roleData.error}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): (
                                                        <tbody>
                                                            {roleData && roleData.roles &&
                                                            roleData.roles.map((role) =>{
                                                                return(
                                                                    <tr key={role.roleId}>
                                                                        <td>{role.roleName}</td>
                                                                        <td>{role.applicationName}</td>
                                                                        {role.isFixed!==true ? 
                                                                        <td className="text-right">
                                                                            <Button className="btn btnic" color="primary" onClick={() => {updateRole(role)}}><i className="fa fa-pencil"></i></Button>
                                                                            <Button className="btn btnic" color="secondary" onClick={() => {deleteRole(role)}}><i className="fa fa-trash"></i></Button>
                                                                        </td>
                                                                        : <td style={{height: '52px'}}></td>}
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

        {/* Add Role Modal */}
        <Modal
        isOpen={modalOpen}
        toggle={addRole}
        backdrop="static"
        >
            <Form onSubmit={submitRole}>
                <div className='modal-header'>
                    <h5 className="modal-title">Add Role</h5>
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
                                <label className="control-label ">Role Name</label>
                                <Input type="text" 
                                className="form-control" 
                                name="roleName"
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label ">Application</label>
                                <select
                                className='form-control form-select'
                                name="applicationId"
                                onChange={handleInputChange}
                                >
                                    <option>Please Select Value</option>
                                    {appData.appMenus.map((data)=>{
                                        return(
                                        <option key={data.applicationId} value={data.applicationId}>{data.applicationName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary">
                        Add Role
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
        toggle={updateRole}
        backdrop="static"
        >
            <Form onSubmit={submitUpdateRole}>
                <div className='modal-header'>
                    <h5 className="modal-title">Update Role</h5>
                    <Button type="button" className="btn btn-close" color='close' aria-label="Close"
                    onClick={handleUpdateClose}
                    >×
                    </Button>
                </div>
                <ModalBody>
                    <p style={{color:'red'}}>{updateError}</p>
                    <div className="form-group">
                        <label className="control-label ">Role Name</label>
                        <Input type="text" 
                        className="form-control" 
                        name="roleName"
                        id="txtRoleName"
                        value={roleNameOf}
                        onChange={(e)=> setRoleNameOf(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                            <label className="control-label ">Application</label>
                            <select
                            className='form-control form-select'
                            name="applicationId"
                            value={appId}
                            onChange={(e)=> setAppId(e.target.value)}
                            >
                                <option>Please Select Value</option>
                                    {appData.appMenus.map((data)=>{
                                        return(
                                        <option key={data.applicationId} value={data.applicationId}>{data.applicationName}</option>
                                        )
                                    })}
                            </select>
                        </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        // onClick={function noRefCheck(){}}
                        >
                        Update Role
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
        roleData: state.role,
        appData: state.appMenu
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchRoles: () => dispatch(fetchRoles()),
        appMenu: () => dispatch(appMenu())
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (RoleDetails)
