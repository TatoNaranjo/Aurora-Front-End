import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import './Home.css'
export default function Home(){
    const {isAuthenticated} = useAuth();
    
    return (
    <>
    <section className="introSection">

        <div className="textDiv">
        <h1 className="textIntro">Sistema de Apoyo al Diagnóstico de Trastornos Depresivos</h1>

        <p>Herramienta avanzada que utiliza modelos de clasificación de Machine Learning para apoyar el diagnóstico de trastornos depresivos en la práctica clínica.</p>

            <div className="buttonDivider">
                <Button variant="primary">Comenzar Diagnóstico</Button>
                <Button variant="secondary">Ver Tutorial</Button>
            </div>
        </div>
        <div className="imageDiv">
            <img src="/assets/womanResearcher.svg" alt="Woman Researcher"/>
        </div>
    </section>
    
    <section className="featuresSection">
        <h1 className="fTitle">Características Principales</h1>
        <h4 className="fSubtitle">Herramientas avanzadas para Estudiantes y Profesionales de la Salud Mental</h4>

        <div className="fCardSection">
            <Card alignment="center" iconURL="/assets/stats.svg">
                <h3>Análisis Predictivo</h3>
                <p className="subtitle">Modelos de Machine Learning para clasificación y apoyo al diagnóstico.</p>

                <p>Algoritmos entrenados con datos clínicos que ayudan a identificar patrones y factores de riesgo asociados a trastornos depresivos.</p>
                
                <Link className="" to="/login">Explorar Modelos</Link>
            </Card>

            <Card alignment="center" iconURL="/assets/users.svg">
                <h3>Gestión de Pacientes</h3>
                <p className="subtitle">Seguimiento integral de casos clínicos y evolución de pacientes.</p>

                <p>Sistema de registro y seguimiento que permite documentar la evolución de los pacientes y mantener un historial clínico organizado.</p>
                
                <Link className="" to="/login">Gestionar Pacientes</Link>
            </Card>

        </div>
    </section>

    <section className="aboutSection">

<div className="textDiv">
        <h1 className="fTitle">Acerca del Sistema</h1>
        <p>Este sistema ha sido desarrollado como parte de un proyecto de investigación en la Universidad de Cundinamarca Extensión Facatativá, con el objetivo de proporcionar a los estudiantes practicantes del programa de Psicología una herramienta de apoyo para el diagnóstico de trastornos depresivos.</p>

        <p>Utilizando técnicas avanzadas de Machine Learning, el sistema analiza datos clínicos para identificar patrones y factores de riesgo asociados a trastornos depresivos, proporcionando una herramienta complementaria al juicio clínico profesional.</p>

        <div>
            <Button variant="secondary">Conocer Más Sobre el Proyecto</Button>
        </div>
</div>


        <div className="imageDiv">
            <img src="/assets/about.svg" alt="Woman Researcher"/>
        </div>        
    </section>
    

    <section className="resourcesSection">
        <h1 className="fTitle">Recursos Para Estudiantes</h1>
        <h4 className="fSubtitle">Herramientas avanzadas para estudiantes practicantes del programa de Psicología</h4>

        <div className="rCardSection">
            <Card alignment="left" iconURL="/assets/book.svg">
                <h3>Biblioteca de Recursos</h3>
                <p className="subtitle">Accede a artículos científicos, guías clínicas y material de estudio.</p>

                <p>Colección curada de recursos académicos y clínicos para profundizar en el conocimiento sobre trastornos depresivos y su diagnóstico.</p>
                
                <Link className="" to="/login">Explorar Biblioteca</Link>
            </Card>

            <Card alignment="left" iconURL="/assets/brain.svg">
                <h3>Casos de Estudio</h3>
                <p className="subtitle">Aprende con casos prácticos y simulaciones clínicas.</p>

                <p>Casos clínicos simulados para practicar el proceso diagnóstico y familiarizarse con diferentes presentaciones de trastornos depresivos.</p>
                
                <Link className="" to="/login">Ver Casos de Estudio</Link>
            </Card>

        </div>
    </section>

    <section className="invitationSection">
        <h1 className="fTitle">Comienza a Utilizar el Sistema</h1>
        {!isAuthenticated?
        <>
        <h2 className="fSubtitle">Registrate Para Acceder a Todas las Funcionalidades</h2>
        <Button>Registrarse Ahora</Button>
        </>
        :
        <h2 className="fSubtitle">Qué Diagnóstico Nuevo Estudiarás Hoy?</h2>
        }

    </section>
    </>
    )
}