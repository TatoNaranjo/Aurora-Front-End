import "./RoleGuide.css";

const roles = [
  {
    icon: "/assets/researcherIcon.svg",
    title: "Investigador Psicológico",
    className: "investigador",
    roleColor:"blue",
    perfil: [
      { label: "Educación", value: "Maestría en Psicología o Ciencias de la Salud" },
      { label: "Experiencia", value: "Investigación académica y análisis de datos clínicos" },
      { label: "Habilidades", value: "Machine learning, análisis de datos, herramientas de investigación" }
    ],
    funcionalidades: [
      { icon: "/assets/functionalityIcons/chart.svg", text: "Análisis avanzado de datos poblacionales" },
      { icon: "/assets/functionalityIcons/stats.svg", text: "Generación de estudios e investigaciones" },
      { icon: "/assets/functionalityIcons/database.svg", text: "Acceso completo a bases de datos" },
      { icon: "/assets/functionalityIcons/sheet.svg", text: "Exportación de reportes científicos" }
    ],
    nota: "Como investigador, puedes analizar patrones en grandes volúmenes de datos para generar conocimiento científico sobre trastornos depresivos."
  },
  {
    icon: "/assets/medical.svg",
    title: "Psicólogo / Terapeuta",
    className: "psicologo",
    roleColor:"yellow",
    perfil: [
      { label: "Educación", value: "Licenciatura en Psicología o Psiquiatría" },
      { label: "Experiencia", value: "Experiencia en diagnóstico clínico" },
      { label: "Habilidades", value: "Software clínico, CIE-11" }
    ],
    funcionalidades: [
      { icon: "/assets/functionalityIcons/patient.svg", text: "Evaluación y diagnóstico" },
      { icon: "/assets/functionalityIcons/evalSheet.svg", text: "Seguimiento clínico" },
      { icon: "/assets/functionalityIcons/paper.svg", text: "Generación de reportes" },
      { icon: "/assets/functionalityIcons/history.svg", text: "Gestión de historiales" }
    ],
    nota: "Como profesional clínico, apoyas el diagnóstico y seguimiento de pacientes con esta herramienta."
  },
  {
    icon: "/assets/openBook.svg",
    title: "Estudiante Practicante",
    className: "estudiante",
    roleColor:"darkBlue",
    perfil: [
      { label: "Educación", value: "Estudiante de pregrado en Psicología" },
      { label: "Experiencia", value: "Conocimientos básicos en salud mental" },
      { label: "Habilidades", value: "Capacidad de aprendizaje en software clínico" }
    ],
    funcionalidades: [
      { icon: "/assets/functionalityIcons/book.svg", text: "Casos de estudio" },
      { icon: "/assets/functionalityIcons/search.svg", text: "Exploración de diagnósticos" },
      { icon: "/assets/functionalityIcons/evalSheet.svg", text: "Herramientas de evaluación" },
      { icon: "/assets/functionalityIcons/paper.svg", text: "Acceso a material educativo" }
    ],
    nota: "Como estudiante, puedes practicar en un entorno seguro para fortalecer tus habilidades."
  }
];

export default function RoleGuide() {
  return (
    <div className="roleGuideContainer">
      <header className="user-roles-header">
        <div className="container">
          <h1 className="title">Guía de Roles de Usuario</h1>
          <p className="subtitle">
            Comprende las funcionalidades y capacidades de cada tipo de usuario en nuestro sistema de diagnóstico de depresión.
          </p>
        </div>
      </header>

      <main className="user-roles-main container">
        {roles.map((role, index) => (
          <section key={index} className={`role-card ${role.className} ${role.roleColor}`}>
            <div className={`${role.roleColor}-header role-header`}>
                <div className={`${role.roleColor}-icon roleIcon`}>
                  <img src={`${role.icon}`} alt="Role Icon" />
                </div>
            <h2 className="role-title">{`${role.title}`}</h2>

            </div>
            <div className="role-content">
              <div className="userProfile">
                <h3>Perfil</h3>
                <div className="profileList">
                  {role.perfil.map((item, i) => (
                    <div key={i} className="roleProfileItem">
                      <label>{item.label}</label>
                      <span>{item.value}</span>
                      </div>
                  ))}
                </div>
              </div>
              <div className="userFunctionality">
                <h3>Funcionalidades</h3>
                <div className="profileList">
                  {role.funcionalidades.map((func, i) => (
                    <div key={i} className="functionalityItem">
                      <img className="functionalityIcon" src={`${func.icon}`}/>
                      <span>{func.text}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`noteContainer ${role.roleColor}-note`}>
            <img src={`${role.icon}`} alt="Role Icon" />
            <p className="role-note">{role.nota}</p>
            </div>
          </section>
        ))}

        {/* Tabla de comparación de funcionalidades por rol */}
        <section className="comparison-section">
          <h2 className="comparison-title">Comparación de Funcionalidades Por Rol</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Funcionalidad</th>
                <th className="blue">Investigador</th>
                <th className="yellow">Psicólogo</th>
                <th className="darkBlue">Estudiante</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Análisis de Datos Poblacionales",
                  access: { blue: true, yellow: false, darkBlue: false }
                },
                {
                  name: "Diagnóstico de Pacientes",
                  access: { blue: true, yellow: true, darkBlue: false }
                },
                {
                  name: "Casos de Estudio",
                  access: { blue: true, yellow: true, darkBlue: true }
                },
                {
                  name: "Material Educativo",
                  access: { blue: true, yellow: true, darkBlue: true }
                }
              ].map((func, index) => (
                <tr key={index}>
                  <td className="function-name">{func.name}</td>
                  {(["blue", "yellow", "darkBlue"] as const).map((color) => (
                    <td key={color}>
                      <span className={`access-dot ${func.access[color] ? color : "noAccess"}`}></span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="legend">
            <span><span className="access-dot blue" /> Acceso Completo</span>
            <span><span className="access-dot noAccess" /> Sin Acceso</span>
          </div>
        </section>
      </main>
    </div>
  );
}