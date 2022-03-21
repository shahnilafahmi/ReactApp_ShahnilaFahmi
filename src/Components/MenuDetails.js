import React,{useState,useEffect} from 'react'
import { Button, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addedMenu, fetchMenu, updatedMenu, deletedMenu, searchMenu } from '../Redux/actions/menuAction'
import { appMenu } from '../Redux/actions/applicationAction'
import { useHistory } from 'react-router'
import Swal from "sweetalert2";
import { fetchParentMenu } from '../Redux/actions/parentMenuAction'


const MenuDetails = ({menuData, fetchMenu, fetchParentMenu, parentData, appData, appMenu}) => {
    const dispatch = useDispatch()
    let history = useHistory();
  
    var storedNames = JSON.parse(localStorage.getItem("loginData"));
    useEffect(() => {
        fetchMenu()
        
    }, [])
    const [modalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const handleUpdateClose = () => setUpdateModalOpen(false);
    const [menuId,setMenuId] = useState()
    const [menuNameOf,setMenuNameOf] = useState()
    const [parentIdOf, setParentIdOf] =useState()
    const [appIdOf, setAppIdOf] =useState()
    const [search, setSearch] =useState('')

    // Show Modal for Insert Role 
    const addMenu = () => {
        fetchParentMenu()
        appMenu()
        setModalOpen(!modalOpen);
        setError("")
    }
    // Show Modal and set Data
    const updateMenu = (menuData) => {
        setUpdateError("")
        setUpdateModalOpen(!updateModalOpen);
        setMenuId(menuData.menuId)
        setMenuNameOf(menuData.menuName)
        setParentIdOf(menuData.parentId)
        setAppIdOf(menuData.applicationId)
        fetchParentMenu()
        appMenu()
    }
    
    // State handle 
    const [state, setState] = useState({
        menuId: "",
        menuName: "",
        menuURL: "",
        sortOrder: "",
        parentId: "",
        applicationId: "",
        createdBy: storedNames.createdBy,
        modifiedBy: storedNames.modifiedBy,
        userIp: ""
    });
   
    const [error, setError] = useState("");
    const [updateError, setUpdateError] = useState("");
    
    // Set states 
    const {menuName,menuURL,sortOrder,parentId,applicationId} = state;
    // OnChange for Insert 
    const handleInputChange = (e) =>{
        let {name, value} = e.target;
        setState({...state, [name]: value})
    }


    
    // Insert Menu Dispatch
    const submitRole = (e) =>{
        e.preventDefault()
        if(!menuName || !menuURL || !sortOrder || !parentId || !applicationId){
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
                dispatch(addedMenu(state))
                if(result.isDismissed){
                    setTimeout(() => {
                        fetchMenu();
                    }, 500);
                }
                else if(result.isConfirmed){
                    setTimeout(() => {
                        fetchMenu();
                    }, 500);
                }
            })
        }    
    }



    //Update Role Dispatch
    const submitUpdateMenu = (e) =>{
        e.preventDefault()
        
        if(!menuNameOf || !parentIdOf || !appIdOf) {
            setUpdateError("Please Change any Field to Continue")
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
                dispatch(updatedMenu({menuName: menuNameOf, 
                    parentId: parentIdOf, 
                    applicationId: appIdOf, 
                    modifiedBy: storedNames.modifiedBy,
                    userIp: ""  },menuId))
                if(result.isDismissed){
                    setTimeout(() => {
                        fetchMenu();
                    }, 500);
                }
                else if(result.isConfirmed){
                    setTimeout(() => {
                        fetchMenu();
                    }, 500);
                }
            })
        }
    }


    // Delete Role Dispatch 
    const deleteMenu = (menuData) => {
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
                dispatch(deletedMenu({menuId: menuData.menuId,modifiedBy: storedNames.modifiedBy,
                    userIp: ""}))
                setTimeout(() => {
                    fetchMenu()
                }, 500);
            }
        });
        

    }

    // Search Menu Dispatch 
    function searMenus (){
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
        dispatch(searchMenu({name: search}))
        }
    }
    function clearSearch () {
       setSearch('')
       fetchMenu()
    }

    
    return (
        <>
            <Row className="heading-bg">
                <Col lg="3" md="4" sm="4" xs="12">
                    <h5 className="txt-dark">Menu</h5>
                </Col>
                <Col lg="9" md="8" sm="8" xs="12">
                    <ol className="breadcrumb">
                        <li><a href="/">Dashboard</a></li>
                        <li className="active">Menu</li>
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
                                                <label className="control-label ">Menu</label>
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
                                            onClick={searMenus}
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
                                            Menu Details
                                        </h6>
                                    </Col>
                                    <Col className="text-right">
                                        <Button 
                                        color="primary"
                                        onClick={addMenu}>
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
                                                            <th width="25%">Menu Name</th>
                                                            {/* <th width="25%">Menu Url</th> */}
                                                            <th className="text-right">Action</th>
                                                        </tr>
                                                    </thead>
                                                    {menuData.loading ?(
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    Loading
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): menuData.error ? (
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    {menuData.error}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): (
                                                        <tbody>
                                                            {menuData && menuData.menus &&
                                                            menuData.menus.map((menu) =>{
                                                                return(
                                                                    <tr key={menu.menuId}>
                                                                        <td>{menu.menuName}</td>
                                                                        {/* <td>{menu.menuURL}</td> */}
                                                                        <td className="text-right">
                                                                            <Button className="btn btnic" color="primary" onClick={() => {updateMenu(menu)}}><i className="fa fa-pencil"></i></Button>
                                                                            <Button className="btn btnic" color="secondary" onClick={() => {deleteMenu(menu)}}><i className="fa fa-trash"></i></Button>
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

        {/* Add Role Modal */}
        <Modal
        isOpen={modalOpen}
        toggle={addMenu}
        backdrop="static"
        >
            <Form onSubmit={submitRole}>
                <div className='modal-header'>
                    <h5 className="modal-title">Add Menu</h5>
                    <Button type="button" className="btn btn-close" color='close' aria-label="Close"
                    onClick={handleClose}
                    >×
                    </Button>
                </div>
                <ModalBody>
                    <Row>
                        <Col md="12"><p style={{color:'red'}}>{error}</p></Col>
                        <Col md="6">
                            <div className="form-group">
                                <label className="control-label ">Menu Name</label>
                                <Input type="text" 
                                className="form-control" 
                                name="menuName"
                                onChange={handleInputChange}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="form-group">
                                <label className="control-label ">Menu URL</label>
                                <Input type="text" 
                                className="form-control" 
                                name="menuURL"
                                onChange={handleInputChange}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="form-group">
                                <label className="control-label ">Parent Node</label>
                                <select
                                className='form-control form-select'
                                name="parentId"
                                onChange={handleInputChange}
                                >
                                    <option>Please Select Value</option>
                                    {parentData.parentMenus.map((parent)=>{
                                        return(
                                        <option key={parent.menuId} value={parent.menuId}>{parent.menuName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="form-group">
                                <label className="control-label ">Sort Order</label>
                                <Input type="number" 
                                className="form-control" 
                                name="sortOrder"
                                onChange={handleInputChange}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="form-group">
                                <label className="control-label ">Application</label>
                                <select
                                className='form-control form-select'
                                name="applicationId"
                                onChange={handleInputChange}
                                >
                                    <option>Please Select Value</option>
                                    {appData.appMenus.map((app)=>{
                                        return(
                                        <option key={app.applicationId} value={app.applicationId}>{app.applicationName}</option>
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
                        Add Menu
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
        toggle={updateMenu}
        backdrop="static"
        >
            <Form onSubmit={submitUpdateMenu}>
                <div className='modal-header'>
                    <h5 className="modal-title">Update Menu</h5>
                    <Button type="button" className="btn btn-close" color='close' aria-label="Close"
                    onClick={handleUpdateClose}
                    >×
                    </Button>
                </div>
                <ModalBody>
                    <Row>
                        <Col md="12"><p style={{color:'red'}}>{updateError}</p></Col>
                        <Col md="6">
                            <div className="form-group">
                                <label className="control-label ">Menu Name</label>
                                <Input type="text" 
                                className="form-control" 
                                name="menuName"
                                value={menuNameOf}
                                onChange={(e)=> setMenuNameOf(e.target.value)}
                                // defaultValue={menuNameOf}
                                // onChange={handleInputUpdateChange}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="form-group">
                                <label className="control-label ">Parent </label>
                                <select
                                className='form-control form-select'
                                name="parentId"
                                value={parentIdOf}
                                onChange={(e)=> setParentIdOf(e.target.value)}
                                // onChange={handleInputUpdateChange}
                                // defaultValue={parentIdOf}
                                
                                >
                                    {/* <option>Please Select Value</option> */}
                                    {parentData.parentMenus.map((parent)=>{
                                        return(
                                        <option key={parent.menuId} value={parent.menuId }>{parent.menuName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="form-group">
                                <label className="control-label ">Application</label>
                                <select
                                className='form-control form-select'
                                name="applicationId"
                                value={appIdOf}
                                onChange={(e)=> setAppIdOf(e.target.value)}
                                // onChange={handleInputUpdateChange}
                                // defaultValue={appIdOf}
                                >
                                   
                                    {appData.appMenus.map((app)=>{
                                        return(
                                        <option key={app.applicationId} value={app.applicationId }>{app.applicationName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        // onClick={handleUpdateClose}
                        >
                        Update Menu
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
        menuData: state.menu,
        parentData: state.parentMenu,
        appData: state.appMenu
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchMenu: () => dispatch(fetchMenu()),
        fetchParentMenu: () =>dispatch(fetchParentMenu()),
        appMenu: () =>dispatch(appMenu())
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (MenuDetails)
