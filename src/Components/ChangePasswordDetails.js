import React,{useState,useEffect} from 'react'
import { Button, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Card, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Swal from "sweetalert2";
import zxcvbn from 'zxcvbn';

const ChangePassworDetails = ({ password}) => {
  const testResult = zxcvbn(password)
 const num = testResult.score * 100 /4;


    const dispatch = useDispatch()
    let history = useHistory();
    var storedNames = JSON.parse(localStorage.getItem("loginData"));
    useEffect(() => {
       
    }, [])

    const ChangePassworColor = () =>({

      width: '${num}%',
      background:funcProgressColor(),
      height:'7px'
  })

  const createPassLabel = () => {
    switch (testResult.score) {

      case 0:
        return 'Very Weak';
    
        case 1:
        return 'Weak';
    
        case 2:
        return 'Fair';
    
        case 3:
        return 'Good';
    
        case 4:
        return 'Strong';
    
        default:
          return '';

          
    }
  }

  const funcProgressColor = () => {
   switch (testResult.score) {

  case 0:
    return '#F53B13';

    case 1:
    return '#134DF5';

    case 2:
    return '#CF13F5';

    case 3:
    return '#E4F513';

    case 4:
    return '#0B8A28';

    default:
      return 'none';

   }

  }

    return (
     
    <div className='progress' style={{height: '18px'}} >
        <div className='progress-bar' style={ChangePassworColor()}>
        </div>
        <p style = {{color:funcProgressColor()}}>{createPassLabel()}</p>
    </div>

   
  );

}

export default ChangePassworDetails