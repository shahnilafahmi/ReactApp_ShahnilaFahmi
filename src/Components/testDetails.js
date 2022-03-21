import React,{useState,useEffect} from 'react'
import { Button, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Swal from "sweetalert2";
import zxcvbn from 'zxcvbn';
import axios from "axios";
import Select from 'react-select';

const TestDetails = (accessData) => {
    const dispatch = useDispatch()
    let history = useHistory();
    var storedNames = JSON.parse(localStorage.getItem("loginData"));

    const [ip, setIP] = useState('');

    const aquaticCreatures = [
        { label: 'Shark', value: 'Shark' },
        { label: 'Dolphin', value: 'Dolphin' },
        { label: 'Whale', value: 'Whale' },
        { label: 'Octopus', value: 'Octopus' },
        { label: 'Crab', value: 'Crab' },
        { label: 'Lobster', value: 'Lobster' },
      ];

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/');
       // alert(res.data.IPv4);
        //console.log(res.data);
        setIP(res.data.IPv4);
      }
  
    return (
        
        <>
        <div>shahnila</div>
        <Select
        isMulti
        options={aquaticCreatures}
        onChange={opt => console.log(opt.label, opt.value)}
      />



        </>
    )




    }


const mapStateToProps = state => {
    return {
        accessData:state.access
        // accessData: state.access,
        // roleData: state.role
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        // fetchAccessRoles: () => dispatch(fetchAccessRoles()),
        // fetchRoles: () => dispatch(fetchRoles())
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (TestDetails)