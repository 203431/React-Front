import axios from "axios";

function App() {

  var postData = {
    "username" : "robertoguzman333",
    "password" : "Apple141189.",
    "password2" : "Apple141189.",
    "email" : "2robertoguzman71777@gmail.com",
    "first_name" : "Roberto Eduardo",
    "last_name" : "Guzman Ruisz." 
}
  const consumir_register = () => {
    axios
    .post("http://localhost:8000/api/v1/create_user/",postData, {
      Headers: { "Content-Type": "application/json", },
    })
      .then(response => {
        console.log(response.data);
        console.log("Registrado");
      })
      .catch((error) => {
        console.log(error.response.data.password[0]);
        console.log(error.response.data.email[0]);
        console.log(error.response.data.username[0]);
      });
  };

  return (
    <div>
      <header className="App-header">
        <button onClick={consumir_register}> Register</button>
      </header>
    </div>

  );


}

export default App;