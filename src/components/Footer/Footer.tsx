import { Link } from "react-router-dom"
import "./Footer.css"

export default function Footer(){

    return(
        <footer className="">
            <div>
                <p>© 2025 Universidad de Cundinamarca Extensión Facatativá. Todos los derechos reservados.</p>
            </div>
            <div className="linkSection">
                <Link to ="/">Términos de Uso</Link>
                <Link to ="/">Políticas de Privacidad</Link>
            </div>
        </footer>
    )
}