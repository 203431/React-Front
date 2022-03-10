import axios from "axios";
import "./Estilo_Profile.css";

function Profile() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user_id');
    let image_profile = "";
    let usernameR, first_nameR,last_nameR,emailR;

    const change_image = () => {
        let postData = new FormData();
        postData.append('id_user', user);
        postData.append('url_img', document.getElementById('img').files[0]);

        axios.post("http://localhost:8000/api/v1/user/profile", postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
                console.log(response.data);
                image_profile = "http://localhost:8000" + response.data.url_img;
                console.log(image_profile);
                document.getElementById('preview').src = image_profile;
                window.location.reload();
            }).catch((error) => {
                console.log(error.response.data);
                if (error.response.data === "Metodo post no permitido") {
                    console.log("Enviar a un metodo put");
                    put_image();
                }
            })
    }

    let put_image = () => {
        let putData = new FormData();
        putData.append('url_img', document.getElementById('img').files[0]);

        axios.put("http://localhost:8000/api/v1/user/perfil/" + user + "/", putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
            console.log(response.data);
            image_profile = "http://localhost:8000" + response.data.url_img;
            document.getElementById('preview').src = image_profile;
            window.location.reload();
        }).catch((error) => {
            console.log(error.response.data);
            alert("No se pudo actualizar la imagen");
        });
    }

    let delete_image = () => {
        axios.delete("http://localhost:8000/api/v1/user/perfil/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            console.log(response.data);
            alert("Imagen eliminada");
            image_profile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            document.getElementById('preview').url = image_profile;
            window.location.reload();
        });
    }

    window.onload = function visualize_data() {
        axios.get("http://localhost:8000/api/v1/user/perfil/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
                console.log(response.data);
                if(response.data.url_img != null){
                    image_profile = "http://localhost:8000" + response.data.url_img;
                    document.getElementById('preview').src = image_profile;
                }else{
                    document.getElementById('preview').src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                }
            }).catch((error) => {
                console.error("Error al obtener la imagen");
                document.getElementById('preview').src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            });

        axios.get("http://localhost:8000/api/v1/user/data/"+user+"/",{
            headers:{
                'Authorization': 'Token ' + token,
            },
        }).then((response) =>{
            usernameR = response.data.username;
            first_nameR = response.data.first_name;
            last_nameR = response.data.last_name;
            emailR = response.data.email;
            document.getElementById("firstName").placeholder = first_nameR;
            document.getElementById("lastName").placeholder = last_nameR;
            document.getElementById("email").placeholder = emailR;
            document.getElementById("username").placeholder = usernameR;
        }).catch((error)=>{
            console.log(error.response.data);
        })
    }

    let change_profile = () =>{
        let putData = new FormData();
        let usernamePut = document.getElementById("username").value;
        let lastNamePut = document.getElementById("lastName").value;
        let firstNamePut = document.getElementById("firstName").value;
        let emailPut = document.getElementById("email").value;

        if(usernamePut === ""){
            usernamePut = usernameR; 
        }
        if(lastNamePut === ""){
            lastNamePut = last_nameR;
        }
        if(firstNamePut === ""){
            firstNamePut = first_nameR;
        }
        if(emailPut === ""){
            emailPut = emailR;
        }
        putData.append("first_name",firstNamePut);
        putData.append("last_name",lastNamePut);
        putData.append("username",usernamePut);
        putData.append("email",emailPut);

        axios.put("http://localhost:8000/api/v1/user/data/"+user+"/",putData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            console.log(response.data);
            window.location.reload();
        }).catch((error)=>{
            alert("No se pudieron actualizar los datos");
            console.log(error.response.data);
        })
    }

    

    const cerrar_sesion = () => {
        localStorage.clear();
        let putData = new FormData();
        axios.put("http://localhost:8000/api/v1/user/data/"+user+"/",putData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response)=>{
            console.log(response.data);
            window.location.reload();
        }).catch((error)=>{
            alert("No hay sesión iniciada");
            console.log(error.response.data);
        })
        window.location="/Login";
    }

    return (
        <div className= "Profile_body" >
            <div className="Profile_container">
                <div className="Profile_options">
                       <h5>Bienvenido usurario no.{user }</h5>
                </div>
                
                <div className="Profile_profileImg">
                    <div className="Profile_bordeImg"></div>
                    <img alt="error img" id="preview" />
                </div>
                <div className="Profile_image">
                    <input accept="image/*" type="file" id="img"></input>
                </div>
                <div className="Profile_image">
                    <p/>
                    <button onClick={change_image}>Cambiar imagen</button>
                    <p/>
                    <button onClick={delete_image}>Borrar la imagen</button>
                </div>
                <div className="Profile_profileInfo">
                    <div className="Profile_profileField">
                        <b>First name: </b><input id="firstName"></input>
                    </div>
                    <div className="Profile_profileField">
                        <b>Last name: </b><input id="lastName"></input>
                    </div>
                    <div className="Profile_profileField">
                        <b>Username: </b><input id="username"></input>
                    </div>
                    <div className="Profile_profileField">
                        <b>E-mail: </b><input id="email"></input>
                    </div>
                </div>
                <div className="Profile_update" onClick={change_profile}>
                    <button>Actualizar perfil</button>
                </div>
                <div className="Profile_backLogin">
                    <button className="Profile_backLogin" onClick={cerrar_sesion}>Cerrar sesión</button>
                </div>
                
                
            </div>
           
        </div>
    )
}

export default Profile;