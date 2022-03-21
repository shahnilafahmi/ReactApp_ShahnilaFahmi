import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import roleReducer from "./roleReducer";
import { combineReducers } from "redux";
import usReducer from "./userReducer";
import accessRoleReducer from "./accessRole";
import companyReducer from "./comapnyDataAccess";
import homeMenuReducer from "./homeMenuReducer";
import menuReducer from "./menuReducer";
import parentMenuReducer from "./ParentMenuReducer";
import appMenuReducer from "./appMenuReducer";   
import featureReducer from "./Setup/featureReducer";
import toggleReducer from "./toggleReducer";
import menuFeatureReducer from "./Setup/menuFeatureReducer";
import menuItemFeatureReducer from "./Setup/menuItemFeatureReducer";
import applicationCompanyReducer from "./Setup/applicationCompanyReducer";
import accessFeatureReducer from "./getAccessFeatureReducer";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    role: roleReducer,
    access: accessRoleReducer,
    user: usReducer,
    // bank: bankReducer,
    // businessUnit : businessUnitReducer,
     company: companyReducer,
    homeMenu: homeMenuReducer,
    menu: menuReducer,
    parentMenu:  parentMenuReducer,
    appMenu: appMenuReducer,
    feature:featureReducer,
    // department: departmentReducer,
    // companysetup:companySetupReducer,
    // city: cityReducer,
    // country:countryReducer,
    // campaign:campaignReducer,
    // visaType:visaTypeReducer,
    // costcenter:costCenterReducer,
    // currency:currencyReducer,
    // doctype: docTypeReducer,
    // docsubtype: docSubTypeReducer,
    // domain: domainReducer,
    // religion:religionReducer,
    // designation: designationReducer,
    // eduScore: educationScoreReducer,
    // eduStatus: educationStatusReducer,
    // jobCategory: jobCategoryReducer,
    // eduType: educationTypeReducer,
    // empType: employeeTypeReducer,
    // group: groupReducer,
    // profession: professionReducer,
     toggle: toggleReducer,
    menufeature: menuFeatureReducer,
    menufeatureitem: menuItemFeatureReducer,
    // employees: employeesReducer,
    // location: locationReducer,
    // empcompany: employeeCompanyReducer,
    // compcores: companyCorresReducer,
     appcompany: applicationCompanyReducer,
    // setupmaster: setupMasterReducer,
    // setupmasterdetail: setupMasterDetailReducer,
    // employeedu: employeeEducationReducer,
    // employbyid: employeeByIdReducer,
    // employeexp: employeeExperienceReducer,
    // employepro: employeeProfessionalRefReducer,
    // employedoc: employeeDocumentReducer,
    // bankdetail: bankDetailReducer,
    // relationship: relationshipReducer,
    // witness: witnessReducer,
    // lifeinsurance: lifeInsuranceReducer,
    // medicalinsurance: medicalInsuranceReducer,
    // providentfund: providentFundReducer,
    // emplPic: employeeProfPicReducer,
    // contactdetail: contactDetailReducer,
    // emercontdetail: emerContactDetailReducer,
    // qualification: qualificationReducer,
    // familymemb: familyMemberReducer,
    // nationality: nationalityReducer,
    // maritalstatus: maritalStatusReducer,
    // building: buildingReducer,
    // floor: floorReducer,
    // tmsshift: tmsShiftReducer,
    // leavetype: leaveTypeReducer,
    // hod: hodReducer,
    // manager: managerReducer,
    // incharge: inchargeReducer,
    // emplbenefits: employeeBenefitsReducer,
    //emplbenefitsmap: employeeBenefitsMappingReducer,
    employeeAccess: accessFeatureReducer
    // statecountry: stateReducer,
    // gender: genderReducer,
    // userLocation: userLocationReducer,
    // userBusiness: userBusinessReducer,
    // applyLeave: applyForLeaveReducer,
    // leaveHistory: leaveHistoryReducer,
    // leaveHistoryDetail: leaveHistoryDetailReducer,
    // emplListCom: employeeListByCompanyReducer
})

export default allReducers;