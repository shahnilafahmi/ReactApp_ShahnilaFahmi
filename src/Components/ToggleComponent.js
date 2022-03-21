import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {fetchToggle} from '../Redux/actions/toggleAction'

const ToggleComponent = () => {
    const dispatch = useDispatch()
    const [isToggleOn, isToggleOf] = useState(false)
    const isToggle=(e)=>{
        e.preventDefault();
        isToggleOf(!isToggleOn)
        dispatch(fetchToggle(isToggleOn))
        
    }
    return (
        <>
            <a href="#" id="toggle_nav_btn" 
            onClick={isToggle} 
            className="toggle-left-nav-btn inline-block ml-20 pull-left" >
                <i className="ti ti-align-left"></i>
            </a> 
        </>
    )
}

export default ToggleComponent
