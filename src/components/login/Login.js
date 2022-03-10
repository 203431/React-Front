import axios from "axios";

function App() {

  var postData = {
    "username" : "Victor",
    "password" : "jaguares1"
  }
  const consumir_login = () => {
    axios
    .post("http://localhost:8000/api/v2/Login",postData, {
      Headers: { "Content-Type": "application/json", },
    })
      .then(response => {
        console.log(response.data.token);
      })
      .catch((error) => {
        console.log(error.response.data.password[0]);
        console.log(error.response.data.username[0]);
      });
  };

  return (
    <div>
      <header className="App-header">
        <button onClick={consumir_login}> Login</button>
      </header>
    </div>

  );


}

export default App;