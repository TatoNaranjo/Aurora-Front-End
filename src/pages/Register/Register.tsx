import "./Register.css"
import { Button } from "../../components/Button/Button"
export default function Register(){
    return (
        <>
        <div className="registerContainer">
            <div className="imageDiv1">
                <img src="/assets/register1.svg" alt="RocketMan"/>
            </div>

            <div className="registerCard">
                <div className="legendContainer">
                    <h1 className="registerTitle">Registro de Usuario</h1>
                    <h2 className="registerSubtitle">Ingresa Tus Datos Para Crear Una Cuenta</h2>
                </div>
                <form className="formContainer" onSubmit={(e) => e.preventDefault()}>
                  <div className="iContainer">
                    <div className="legend">
                      <label htmlFor="name">Nombre</label>
                    </div>
                    <div className="inputDiv">
                      <input type="text" id="name" placeholder="¿Cuál es tu Nombre?" />
                    </div>
                  </div>

                  <div className="iContainer">
                    <div className="legend">
                      <label htmlFor="email">Correo Electrónico</label>
                    </div>
                    <div className="inputDiv">
                      <input type="email" id="email" placeholder="tu@ejemplo.com" />
                    </div>
                  </div>

                  <div className="iContainer">
                    <div className="legend">
                      <label htmlFor="username">Nombre de Usuario</label>
                    </div>
                    <div className="inputDiv">
                      <input type="text" id="username" placeholder="Usuario123" />
                    </div>
                    <small className="inputHint">Este será tu identificador único en el sistema</small>
                  </div>

                  <div className="iContainer">
                    <div className="legend">
                      <label htmlFor="userType">Tipo de Usuario</label>
                    </div>
                    <div className="inputDiv">
                      <select id="userType" defaultValue="">
                        <option value="" disabled>Selecciona Una Opción</option>
                        <option>Estudiante Practicante</option>
                        <option>Psicólogo</option>
                        <option>Investigador Psicológico</option>
                      </select>
                    </div>
                  </div>

                  <div className="iContainer">
                    <div className="legend">
                      <label htmlFor="password">Contraseña</label>
                    </div>
                    <div className="inputDiv">
                      <input type="password" id="password" placeholder="********************" />
                    </div>
                  </div>

                  <div className="iContainer">
                    <div className="legend">
                      <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    </div>
                    <div className="inputDiv">
                      <input type="password" id="confirmPassword" placeholder="********************" />
                    </div>
                  </div>

                  <div className="buttonDiv">
                    <Button variant="secondary">Registrarse</Button>
                    </div>
                </form>
                </div>

                <div>
            </div>

          <div className="imageDiv2">
            <img src="/assets/register2.svg" alt="Researcher"/>
            </div>
        </div>
        
        </>
    )
}