import React,{useState,useEffect} from 'react'
import { Button, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import Swal from "sweetalert2";
import { fetchEmployeeByCompany } from '../../Redux/actions/Setup/employeeCompanyAction'
import { fetchCompanyCorres } from '../../Redux/actions/Setup/companyCorresAction'
import { addedUserRole, fetchAppByCompany } from '../../Redux/actions/Setup/applicationCompanyAction'
import { fetchAccessFeature } from '../../Redux/actions/getAccessFeatureAction';



const UserRoleApplicationDetails = ({appData, fetchCompany, compData, empCompanyData, employeeAccess, fetchAccessFeature}) => {
    const dispatch = useDispatch()
    var storedNames = JSON.parse(localStorage.getItem("loginData"));
    var checkedUniquie = [];
    useEffect(() => {
        fetchCompany()
        fetchAccessFeature()
    }, [])
    var arrFeature = []
    employeeAccess.accessfeature.map(data=>{
        arrFeature.push(data.feature)
    })
    const [selectValue, setSelectValue] = useState();
    const [userValue, setUserValue] = useState();
    const [roleValue, setRoleValue] = useState([]);
    const [error, setError] = useState("");
    const [roleId, setRoleId]= useState()
    const getSelect = (e) =>{
        const getValue = e.target.value;
        dispatch(fetchEmployeeByCompany({id: getValue}))
        dispatch(fetchAppByCompany({id: getValue}))
        setRoleValue(getValue)
    }
    const getUserSelect = (e) =>{
        const getValue = e.target.value;
        setUserValue(getValue)
        setSelectValue(getValue)
    }
   
    var arrayToSave =[]
    var state = {}
    const getRoleSelect = (e, app) =>{
        state ={
            app: 0,
            roleId : "",
            userId: userValue,
            createdBy: storedNames.createdBy,
            modifiedBy: storedNames.modifiedBy,
            userIp: ""
    
        }
        state.roleId = e.target.value
        state.app = app
        checkedUniquie.push(state);
        
        function getUniqueListBy(checkedUniquie, key) {
            return [...new Map(checkedUniquie.map(item => [item[key], item])).values()]
        }
        
        arrayToSave = getUniqueListBy(checkedUniquie, 'app')
    }
    
    
    const submitRoleApp = (e) =>{
        if(!userValue || !state.roleId){
            setError("Please Fill All Fields")
        }
        else{
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
                dispatch(addedUserRole(arrayToSave))
                if(result.isDismissed){
                    setTimeout(() => {
                        dispatch(fetchEmployeeByCompany({id: 0}))
                        dispatch(fetchAppByCompany({id: 0}))
                        document.getElementById('companyId').value = 0
                    }, 500);
                }
                else if(result.isConfirmed){
                    setTimeout(() => {
                        dispatch(fetchEmployeeByCompany({id: 0}))
                        dispatch(fetchAppByCompany({id: 0}))
                        document.getElementById('companyId').value = 0                        
                    }, 500);
                }
            })
        }
    }
    
    return (
        <>
            <Row className="heading-bg">
                <Col lg="5" md="6" sm="6" xs="12">
                    <h5 className="txt-dark">User Role Application </h5>
                </Col>
                <Col lg="7" md="6" sm="6" xs="12">
                    <ol className="breadcrumb">
                        <li><a href="/">Dashboard</a></li>
                        <li className="active">User Role Application</li>
                    </ol>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="panel-body">
                                    <Row>
                                        <Col sm="4">
                                            <div className="form-group">
                                                <label className="control-label "> Company</label>
                                                <select
                                                className='form-control form-select'
                                                name="companyId"
                                                // value={selectValue}
                                                onChange={getSelect}
                                                id="companyId"
                                                >
                                                    <option value={0}>Please Select Value</option>
                                                    {compData.compcores.map((data)=>{
                                                        return(
                                                        <option key={data.companyId} value={data.companyId}>{data.companyName}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label "> Employee</label>
                                                <select
                                                className='form-control form-select'
                                                name="userId"
                                                onChange={getUserSelect}
                                                >
                                                    <option value={0}>Please Select Value</option>
                                                    {empCompanyData.empcompany.map((data)=>{
                                                        return(
                                                        <option key={data.userId} value={data.userId}>{data.employeeName}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="table-responsive">
                                                <table className="table table-striped mb-0 mt-3">
                                                    <thead>
                                                        <tr>
                                                            <th>Application Name</th>
                                                            <th width="30%" className="text-right">Action</th>
                                                        </tr>
                                                    </thead>
                                                    {appData.loading ?(
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    Loading
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): appData.error ? (
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                   No Data Found 
                                                                   {/* {appData.error} */}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ): (
                                                        <tbody>
                                                            {appData && appData.appcompany &&
                                                            appData.appcompany.map((data, index) =>{
                                                                return(
                                                                    <tr key={data.applicationId}>
                                                                    
                                                                        <td>{data.applicationName}</td>
                                                                    
                                                                        <td className="text-right">
                                                                            <select
                                                                            key={data.applicationId}
                                                                            className='form-control form-select'
                                                                            name="roleId"
                                                                            onChange={(e)=>getRoleSelect(e,data.applicationId)}
                                                                            >
                                                                                <option>Please Select Value</option>
                                                                                {data.roleDropDownList.map((data)=>{
                                                                                    return(
                                                                                    <option key={data.roleId} value={data.roleId}>{data.roleName}</option>
                                                                                    )
                                                                                })}
                                                                            </select>
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
                                    <Row>
                                        <Col className='text-right'>
                                        <p style={{color:'red'}}>{error}</p>
                                        { roleValue && userValue > 0 ?
                                            arrFeature.includes("Add") ? 
                                            <Button 
                                                onClick={submitRoleApp} 
                                                className='btn mt-3' 
                                                color="primary">
                                                    Submit
                                            </Button>
                                            : ''
                                        : ''}
                                        </Col>
                                    </Row>
                                    
                                </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
const mapStateToProps = state => {
    return {
        compData: state.compcores,
        empCompanyData: state.empcompany,
        appData: state.appcompany,
        employeeAccess: state.employeeAccess
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchCompany: () => dispatch(fetchCompanyCorres()),
        fetchEmployeeByCompany: () => dispatch(fetchEmployeeByCompany()),
        fetchAppByCompany: () => dispatch(fetchAppByCompany()),
        fetchAccessFeature: () => dispatch(fetchAccessFeature())
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (UserRoleApplicationDetails)
