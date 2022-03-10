import axios from "axios";
import React, {Fragment, useState} from "react";
import {BrowserRouter as Route, Switch, HashRouter} from "react-router-dom";
import Profile from "../profile/Profile";

function App() {

  const[datos, setDatos] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = (event) =>{
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
  }
  
  const  enviarDatos = (event) =>{
    event.preventDefault();
  }

  <HashRouter>
    <Switch>
      <Route exact path="/Profile">
            <Profile/>
      </Route>
    </Switch>
  </HashRouter>

  var postData = {
    "username" : datos.username,
    "password" : datos.password
  }


  const consumir_login = () => {
    axios
    .post("http://localhost:8000/api/v1/Login",postData, {
      Headers: { "Content-Type": "application/json", },
    })
      .then(response => {
        localStorage.setItem('user_id', response.data['user_id']);
        localStorage.setItem('token', response.data['token']);
        console.log(response.data.token);
        alert("Bienvenido "+ response.data.first_name);
        window.location="/Profile";
       })
      .catch((error) => {
        alert("Datos Incorrectos")
        console.log(error.response.data.password[0]);
        console.log(error.response.data.username[0]);
      });
  };




  return (
    <Fragment>
      <h1>Login</h1>
      <form className="row" onSubmit={enviarDatos}>
        <div className="col-md-3">
          <input
            placeholder= "Ingrese el username"
            className="form-control"
            type="text"
            name="username"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="col-md-3">
          <input
            placeholder="Ingrese password"
            className="form-control"
            type="text"
            name="password"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="col-md-3">
          <button onClick={consumir_login}>Enviar</button>
        </div>
      </form>
    </Fragment>
  )

  
}



export default App;