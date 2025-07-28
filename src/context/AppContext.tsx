import { createContext, useState, useContext, type ReactNode } from "react";

type User = {
    name: string;
    email:string;
    password:string;
    username: string;
    userType: string;
    profileImg: string;
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
};



const AuthContext = createContext<AuthContextType | undefined> (undefined);

export function AuthProvider({children}: {children:ReactNode}){

    const [user,setUser] = useState<User| null>(()=>{
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser): null;
    });


    const login = async (email: string, password: string) => {
        try {
            // Esquema de Petición Real al Back-End
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password }),
            //     credentials: 'include',
            // });

            // Sección para realizar un Fetch luego del Login Exitoso
            // const userData = await fetch('/api/me', { credentials: 'include' }).then(res => res.json());

            // Simulación un usuario mientras no hay conexión al Back-End
            const mockUser = {
                name: "Santiago Naranjo",
                profileImg:"/assets/profile.svg",
                username: "TatoNaranjo",
                email: "nar2004@gmail.com",
                password: "12345678",
                userType:"Psicólogo",
            };

            setUser(mockUser);
            // localStorage opcional solo para mostrar datos (no seguridad)
            localStorage.setItem('user', JSON.stringify({ name: mockUser.name,username:mockUser.username, email: mockUser.email, userType: mockUser.userType, profileImg:mockUser.profileImg }));
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            setUser(null);
        }
    };

    const logout = () =>{
        setUser(null);
        localStorage.removeItem('user');
    }

    const register = async (name: string, email: string, password: string,) => {
        try {
            // Simulación: en el futuro esto sería una llamada a POST /register
            const mockUser = { name, email, password, username: name.toLowerCase().replace(/\s+/g, ''), userType: "Estudiante Practicante", profileImg: "/assets/profile.svg" };
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify({ name, email }));
        } catch (error) {
            console.error("Error al registrar usuario", error);
        }
    };

    return (
    <AuthContext.Provider value ={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register

    }}>
        {children}
    </AuthContext.Provider>
)
};


export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error ("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}
