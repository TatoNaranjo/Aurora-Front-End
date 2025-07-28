import "./Login.css"
import { Button } from "../../components/Button/Button"
import { useAuth } from "../../context/AppContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Login (){

    const {login} = useAuth();
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e:React.SyntheticEvent) =>{
  e.preventDefault();

  if (!email || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    login(email, password);
    navigate("/");
  } catch (error) {
    alert("Credenciales incorrectas o error en el servidor.");
    console.error(error);
  }
    }
    return (
        <div className="loginContainer">
        
        <div className="imageDiv1">
            <img src="/assets/login1.svg" alt="Woman Researcher"/>
        </div>
        
        <div className="loginCard">
            <div className="legendContainer">
        <h1 className="loginTitle">Inicio de Sesión</h1>
        <h2 className="loginSubtitle">Ingresa Tus Datos Para Acceder a La Plataforma</h2>
            </div>

            <div>
                <form onSubmit={handleSubmit} className="formContainer" name="loginForm">

                <div className="iContainer">
                  <div className="legend">
                    <label htmlFor="mailInput">Correo Electrónico</label>
                  </div>
                  <div className="inputDiv">
                    <input
                      type="email"
                      id="mailInput"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="iContainer">
                  <div className="legend">
                    <label htmlFor="passwordInput">Contraseña</label>
                  </div>
                  <div className="inputDiv">
                    <input
                      type="password"
                      id="passwordInput"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                  <div className="">
                    <Button variant="secondary">Iniciar Sesión</Button>
                  </div>
                </form>
            </div>
        </div>

        <div className="imageDiv2">
            <img src="/assets/login2.svg" alt="Woman Researcher"/>
        </div>
        </div>
    )
}