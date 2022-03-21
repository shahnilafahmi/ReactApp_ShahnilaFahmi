import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Role from './Pages/Role';
import Feature from './Pages/Setup/Feature';
import AccessControl from './Pages/AccessControl';
import Menus from './Pages/Menus';
import ChangePassword from './Pages/ChangePassword';
import ForgetPassword from './Pages/ForgetPassword';
import PrivateRoute from './routes/PrivateRoutes';
import NoDataFound from './Pages/NoDataFound';
import MenuItem from './Pages/Setup/MenuFeatureMaping';
import UserRoleApplication from './Pages/Setup/UserRoleApplication';
import Test from './Pages/test';




function App(props) {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route component={Login} path="/login" exact />
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/role" exact component={Role}/>
          <PrivateRoute path="/feature" exact component={Feature}/>
          <PrivateRoute path="/access" exact component={AccessControl}/>
          <PrivateRoute path="/menu" exact component={Menus}/>
          <PrivateRoute path="/changepassword" exact component={ChangePassword}/>
          <PrivateRoute path="/forgetpassword" exact component={ForgetPassword}/>
          <PrivateRoute path="/menufeaturemapping" component={MenuItem} />
          <PrivateRoute path="/userroleapp" component={UserRoleApplication} />
          <PrivateRoute path="/testdetails" component={Test} />
          <PrivateRoute exact component={NoDataFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
