import { Button } from "../Button/Button";
import { useAuth } from "../../context/AppContext";
import "./Header.css"
import { Link } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

function Header(){
    const {isAuthenticated} = useAuth();
    return (
    <header className="mainHeader">
        <div className="headerTitle">
            <Link to="/"><h1>AURORA</h1></Link>
        </div>

        <div className="buttonSection">
            {isAuthenticated? (
                <>
            <ProfileDropdown/>   
                </>
            ):(
                <>
            <Link to="/login"><Button variant="secondary">Iniciar Sesión</Button></Link>
                        <Link to="/register"><Button variant="primary">Registrarse</Button></Link>
                </>
            )}
            </div>
    </header>
    )
}
export default Header;