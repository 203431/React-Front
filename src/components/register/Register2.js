import axios from "axios";
import Login2 from '../login/Login2'
import React, {Fragment, useState} from "react";


function App() {

  const[datos, setDatos] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: ''
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

  var postData = {
    "username" : datos.username,
    "password" : datos.password,
    "password2" : datos.password2,
    "email" : datos.email,
    "first_name" : datos.first_name,
    "last_name" : datos.last_name
  }


  const consumir_login = () => {
    axios
    .post("http://localhost:8000/api/v1/create_user/",postData, {
      Headers: { "Content-Type": "application/json", },
    })
      .then(response => {
        console.log(response.data.token);
        localStorage.setItem('id_user', response.data['username']);
        localStorage.setItem('token', response.data['token']);
        alert("Bienvenido")
        window.location="/Login2";
      })
      .catch((error) => {
        alert("Datos Incorrectos")
        console.log(error.response.data.password[0]);
        console.log(error.response.data.username[0]);
      });
  };




  return (
    <Fragment>
      <h1>Register</h1>
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
          <input
            placeholder="Confirme la contraseña"
            className="form-control"
            type="text"
            name="password2"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="col-md-3">
          <input
            placeholder="Coloque el email"
            className="form-control"
            type="text"
            name="email"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="col-md-3">
          <input
            placeholder="Coloque su nombre"
            className="form-control"
            type="text"
            name="first_name"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="col-md-3">
          <input
            placeholder="Coloque su apellido"
            className="form-control"
            type="text"
            name="last_name"
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
