import React,{useEffect,useState} from 'react'
import DropdownTreeSelect from "react-dropdown-tree-select";
import { Button, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input } from 'reactstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchAccessRoles, deleteAccessRole, addedAccessRole, deleteAccessRoleByPara, deleteAccessRoleByMenuId} from '../Redux/actions/accessRoleAction';
import { useHistory } from 'react-router'
import "../css/treeview.css";
import Swal from 'sweetalert2';
import { fetchRoles } from '../Redux/actions/roleAction';
import { access } from '../utils/globalVariables';


const AccessControlDetails = ({accessData,roleData, fetchRoles}) => {
    
    useEffect(() => {
        fetchRoles()
    }, [])
    var storedNames = []
    var roleId = ''
    if (localStorage.getItem("loginData") !== null) {
        storedNames = JSON.parse(localStorage.getItem("loginData"));
        roleId = storedNames.roleId !== null ? storedNames.roleId : 0
    }
    else{
        storedNames = '';
        roleId = '';
    }
    let history = useHistory();
    const [selectValue, setSelectValue] = useState();
    const dispatchParam = useDispatch();
    // debugger

    if(roleId === access.SuperAdmin || roleId === access.CompanyAdmin){
    //   history.push("/login")  
    }
    else{
        history.push("/login")
    }
    var checkedNodes = [];
    
    const onChange = (currentNode, selectedNodes) => {
        const state ={
            roleId : selectValue,
            menuItemId: currentNode.menuItemId,
            featureId: currentNode.featureId,
            menuItemFeatureId: currentNode.menuItemFeatureId,
            createdBy: storedNames.createdBy,
            modifiedBy: storedNames.modifiedBy,
            checked:currentNode.checked,
            userIp: ""
    
        }
        
        if(currentNode.checked === true){
            checkedNodes.push(state);
         }
         else{
            if(state.menuItemFeatureId == 0)
            {
            dispatchParam(deleteAccessRoleByMenuId(state))
            }
            else{
                dispatchParam(deleteAccessRoleByPara(state))
            }
           
         }
        
        
    };
   

    const getSelect = (e) =>{
        const getValue = e.target.value;
        setSelectValue(getValue)
        dispatchParam(fetchAccessRoles({id: getValue}))
    }
    
    // function deleteAccessRoleById (){
    //     const getId = selectValue;
    //     console.log(getId)
    //     Swal.fire({
    //         customClass: {
    //           container: 'my-swal'
    //         },
    //         text: 'Are your sure?',
    //         icon: 'error',
    //         confirmButtonText: `OK`,
    //         confirmButtonColor: '#bf1e2e',
    //     }).then(() => { 
    //         dispatchParam(deleteAccessRole(getId))
    //         history.go(0)
    //     });
    // }
    function insertData (){
        Swal.fire({
                customClass: {
                  container: 'my-swal'
                },
                text: 'Data Saved Successfully',
                icon: 'success',
                confirmButtonText: `OK`,
                timer: 3000,
            }).then((result) => { 
                dispatchParam(addedAccessRole(checkedNodes))
                if(result.isDismissed){
                    setTimeout(() => {
                        dispatchParam(fetchAccessRoles({id: selectValue}))
                    }, 500);
                }
                else if(result.isConfirmed){
                    setTimeout(() => {
                        dispatchParam(fetchAccessRoles({id: selectValue}))
                    }, 500);
                }
            })
    }
    
      
    return (
        
        <>
            <Row className="heading-bg">
                <Col lg="3" md="4" sm="4" xs="12">
                    <h5 className="txt-dark">Access Control</h5>
                </Col>
                <Col lg="9" md="8" sm="8" xs="12">
                    <ol className="breadcrumb">
                        <li><a href="/">Dashboard</a></li>
                        <li className="active">Access Control</li>
                    </ol>
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
                                            Access Control
                                        </h6>
                                    </Col>
                                </Row>
                            </CardTitle>
                            <Row style={{alignItems:'center'}}>
                                <Col sm="3">
                                    <div className="controlRole">
                                        <div className="roleType">
                                            <select className="roleMenu form-select form-control"  onChange={getSelect}>
                                                <option value="null">Please Select</option>
                                                {roleData.roles.map((value)=> {
                                                    return(
                                                        <option key={value.roleId} value={value.roleId}>{value.roleName}</option>
                                                        
                                                    )
                                                } )}
                                            </select>
                                            
                                        </div>
                                    </div>
                                </Col>
                                <Col sm="12">
                                    <div className="controlAccess">
                                        
                                        {accessData.loading ?(
                                            <h4 className="text-danger" style={{padding:'5px 10px'}}>Loading</h4>
                                            ): 
                                            accessData.error ? (
                                            <h4 className="text-danger" style={{padding:'5px 10px'}}>{accessData.error}</h4>
                                            ): 
                                            (
                                            <DropdownTreeSelect 
                                            data={accessData.access} 
                                            onChange={onChange} 
                                            showDropdown='initial'
                                            />
                                            )
                                        }
                                        <div className="butns text-right ">
                                            {/* <Button color="danger" onClick={deleteAccessRoleById}>Delete Selected Role</Button> */}
                                            <Button
                                            color="primary"
                                            onClick={insertData}>Submit</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => {
    return {
        accessData: state.access,
        roleData: state.role
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchAccessRoles: () => dispatch(fetchAccessRoles()),
        fetchRoles: () => dispatch(fetchRoles())
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (AccessControlDetails)