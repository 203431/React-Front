import Register2 from '../register/Register2'
import Login2 from '../login/Login2'
import Profile from '../profile/Profile';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <div className="btn-group">
          <Link to="/Login" className="btn btn-dark">
            Login
          </Link>
        </div>
        <div className="btn-group">
          <Link to="/Register" className="btn btn-dark">
            Register
          </Link>
        </div>
        <div className="btn-group">
          <Link to="/Profile" className="btn btn-dark">
            Profile
          </Link>
        </div>
        <hr />
        <Switch>
          <Route exact path="/Login">
            <Login2/>
          </Route>
          <Route path="/Register">
            <Register2/>
          </Route>
          <Route path="/Profile">
            <Profile/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;