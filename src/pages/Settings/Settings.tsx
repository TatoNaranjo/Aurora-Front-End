import "./Settings.css"
import { useAuth } from "../../context/AppContext"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/Button/Button";
export default function Settings(){

        const navigate = useNavigate();
    const {user} = useAuth();
    console.log(user);
    if(!user){
        return <h1>Por favor, inicia sesión para ver tu perfil.</h1>
    }

        const [email,setEmail] = useState(user.email);
        const [name,setName] = useState(user.name);
        const [newPassword,setNewPassword] = useState("");
        const [confirmPassword,setConfirmPassword] = useState("");

        const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!name || !email || !newPassword || !confirmPassword) {
            alert("Por favor completa todos los campos.");
            return;
        }
          try {
    navigate("/profile");
  } catch (error) {
    alert("Credenciales incorrectas o error en el servidor.");
    console.error(error);
  }
    }
    return(
        <div className="settingsContainer">
            <div className="titleContainer">
                <h1 className="settingsTitle">Perfil de Usuario</h1>
                <h2 className="settingsSubtitle">Visualiza y Actualiza Tu Información Personal</h2>
            </div>

            <section className="formSection">
              <div className="profileImageContainer">
                <img src="/assets/profile.svg" alt="Foto de perfil" className="profileImage" />
                <p>Haz clic en la imagen o en el botón para cambiar tu foto de perfil</p>
                <Button>Cambiar Imagen</Button>
              </div>

              <div className="formFieldsContainer">
                <div className="iContainer">
                  <div className="legend">
                    <label htmlFor="name">Nombre</label>
                  </div>
                  <div className="inputDiv">
                    <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                  </div>
                </div>

                <div className="iContainer">
                  <div className="legend">
                    <label htmlFor="email">Correo Electrónico</label>
                  </div>
                  <div className="inputDiv">
                    <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                  </div>
                </div>

                <div className="iContainer">
                  <div className="legend">
                    <label htmlFor="username">Nombre de Usuario</label>
                  </div>
                  <div className="inputDiv">
                    <input type="text" id="username" value={user.username} readOnly />
                  </div>
                  <small className="inputHint">Este es tu identificador único en el sistema</small>
                </div>

                <div className="iContainer">
                  <div className="legend">
                    <label htmlFor="userType">Tipo de Usuario</label>
                  </div>
                  <div className="inputDiv">
                    <select id="userType" disabled>
                      <option>{user.userType}</option>
                    </select>
                  </div>
                  <small className="inputHint">El tipo de Usuario No Puede Ser Modificado</small>
                </div>

                <hr className="divider" />


                <div className="iContainer">
                <h3 className="sectionTitle">Cambiar Contraseña</h3>
                  <div className="legend">
                    <label htmlFor="newPassword">Nueva Contraseña</label>
                  </div>
                  <div className="inputDiv">
                    <input type="password" id="newPassword" onChange={(e)=>{setNewPassword(e.target.value)}} placeholder="********************" />
                  </div>
                  <small className="inputHint">Deja en blanco si no deseas cambiar tu contraseña</small>
                </div>

                <div className="iContainer">
                  <div className="legend">
                    <label htmlFor="confirmPassword" >Confirmar Nueva Contraseña</label>
                  </div>
                  <div className="inputDiv">
                    <input type="password" id="confirmPassword" onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="********************" />
                  </div>
                </div>

                <div className="buttonRow">
                  <Button variant="secondary">Eliminar Cuenta</Button>
                  <Button>Guardar Cambios</Button>
                </div>
              </div>
            </section>
        </div>
    )
}