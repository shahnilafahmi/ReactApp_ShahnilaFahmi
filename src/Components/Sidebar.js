import React, { useEffect,useState} from 'react'
import '../css/sidebar.css'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchByCompanyId } from '../Redux/actions/companyDataAction'
import { fetchHomeMenu } from '../Redux/actions/homeMenuAction'
import {fetchToggle} from '../Redux/actions/toggleAction'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars';

const Sidebar = ({companyData, fetchByCompanyIds, menuData, toggleData, fetchToggle}) => {
    useEffect(() => {
        fetchByCompanyIds({id : compId})
        fetchToggle()
    }, [])
    const dispatch = useDispatch()
    // const toggle = toggleData.toggle;
    const [isActive, setActive] = useState(false);
    const [text, setText] = useState('');
    const [isChildActive, setChildActive] = useState(false);
    // const isToggle = true;
    const isToggle = toggleData.toggle !== undefined ? toggleData.toggle : true;
    var addClass = document.querySelector('.page-wrapper');
    var addSideBarClass = document.querySelector('.fixed-sidebar-left')
    
    
    // else{
    //     addClass.classList.add('toggle-sidebar');
    // }
    const [child, setChild]= useState('');
    
    
    var storedNames = []
    var compId = ''
    if (localStorage.getItem("loginData") !== null) {
        storedNames = JSON.parse(localStorage.getItem("loginData"));
        compId = storedNames.companyId !== null ? storedNames.companyId : ''
    }
    else{
        storedNames = '';
        compId = '';
    }
    const parentClick = (params, e) =>{
        var roleId =storedNames.roleId
        e.preventDefault()
        setActive(!isActive);
        dispatch(fetchHomeMenu(roleId))
        
    }
    const childClick = (params, e) =>{
        e.preventDefault()
        setChildActive(!isChildActive);
        setChild(params) 
        setText(e.target.innerText)
        
    }
    try{
        if(isToggle === false){
            addClass.classList.add('toggle-sidebar');
        }
        else if(isToggle === true){
            addClass.classList.remove('toggle-sidebar')
        }
    }
    catch(error){
        fetchByCompanyIds({id : compId})
    }
    
    return (
        <>
        { isToggle ?
            <>
                <div className="fixed-sidebar-left" >
                    <div className="slimScrollDivasd"  >
                        <Scrollbars style={{ height: "550px" }}>
                            {companyData.loading ?(
                                <ul className="nav side-nav nicescroll-bar" ><li>Loading</li></ul>
                            ): companyData.error ? (
                                <ul className="nav side-nav nicescroll-bar" ><li className='text-light'>{companyData.error}</li></ul> 
                            ): (
                                <ul className="nav side-nav nicescroll-bar" >
                                    {companyData.company.map((company) =>{
                                        return(
                                            <li className="" key={company.applicationId}>
                                                <a href="#"  className="dropdownm" onClick={(e)=>parentClick(company.applicationId, e)}>
                                                    <div className="pull-left">
                                                        <i className="ti ti-user"></i>
                                                        <span className="right-nav-text">{company.applicationName}</span>
                                                    </div>
                                                    <div className="pull-right">
                                                        <i className="ti ti-angle-down"></i>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </a>
                                            </li>
                                        )
                                        })
                                    }
                                </ul>
                            )}
                        </Scrollbars>
                    </div>
                </div>
                { isActive ?
                <div className="submenu show">
                    <div className="slimScrollDiv" >
                        <div className="nicescroll-bar" >
                        <Scrollbars style={{ height: "460px" }}>
                            <div id="childm" className="submenuinn">
                                {menuData.loading ?(
                                    <h4>Loading</h4>
                                ): menuData.error ? (
                                    <h4>{menuData.error}</h4> 
                                ): (
                                <ul id="dropdown1" className="list-group d-block" >
                                    {menuData.homemenus.map((menu) =>{
                                        return(
                                            <li className="sub" key={menu.menuItemId}>
                                                {!menu['children'].length ? 
                                                    <Link className='noChild' to={menu.menuURL}>
                                                        <i className="ti ti-user"></i>
                                                        <span>{menu.label}</span>
                                                        <span className="holder"></span>
                                                    </Link> 
                                                    :
                                                    <>
                                                        <a className='haveChild' id={text === menu.label && isChildActive ? 'childClass' : ''} href="#" onClick={(e)=>childClick(menu.children,e)}>
                                                            <i id={text === menu.label && isChildActive ? 'childIcon' : ''} className="ti ti-user"></i>
                                                            <span>{menu.label}</span>
                                                            <span className="holder"></span>
                                                        </a>
                                                        {text === menu.label ?
                                                    <>
                                                    {isChildActive ?
                                                        <ul id="" className="list-group d-block" style={{borderTop:'1px solid #afa3a3', borderRadius: '0px'}}>
                                                                
                                                            {child.map((subMenu) => {
                                                                return(
                                                                    <li className="sub" key={subMenu.menuItemId}>
                                                                        <Link to={subMenu.menuURL} className='makeLabel'>{subMenu.label}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                            </ul>
                                                    : ''}
                                                    </>
                                                    : ''}
                                                    </>
                                                }
                                                
                                            </li>
                                        )
                                    })
                                    }
                                </ul>
                                )}
                            </div>
                        </Scrollbars>
                        </div>
                    </div>
                </div>
                : ''}
            </>
        : '' }
        </>
    )
}
const mapStateToProps = state => {
    return {
        companyData: state.company,
        menuData: state.homeMenu,
        toggleData: state.toggle
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchByCompanyIds: (params) => dispatch(fetchByCompanyId(params)),
        fetchToggle: () => dispatch(fetchToggle())
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Sidebar)
