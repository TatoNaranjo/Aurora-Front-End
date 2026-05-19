import { useState, useMemo } from 'react';
import {
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser, useLogout } from '@/hooks';
import { UserRole } from '@/types/Roles';

// Define the menu structure with role restrictions
const menuItems = [
  {
    label: 'Inicio',
    path: '/dashboard',
    roles: [UserRole.PRACTICANTE, UserRole.ADMIN, UserRole.MODERADOR, UserRole.PSICOLOGO, UserRole.EVALUADOR],
  },
  {
    label: 'Diagnóstico',
    path: '/cases',
    roles: [UserRole.PRACTICANTE, UserRole.PSICOLOGO, UserRole.EVALUADOR],
  },
  {
    label: 'Investigación',
    path: '/researching-panel',
    roles: [UserRole.ADMIN, UserRole.MODERADOR, UserRole.PSICOLOGO],
  },
  {
    label: 'Validación',
    path: '/testing-validation',
    roles: [UserRole.EVALUADOR, UserRole.ADMIN, UserRole.MODERADOR],
  },
  {
    label: 'Administración',
    path: '/admin-panel',
    roles: [UserRole.ADMIN, UserRole.MODERADOR],
  },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userState = useUser();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const userRole = userState.usuario?.tipo_usuario as UserRole;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const filteredMenuItems = useMemo(() => {
    if (!userRole) return [];
    return menuItems.filter((item) => {
      // If role specific check needed
      if (item.roles && !item.roles.includes(userRole)) {
        return false;
      }
      return true;
    });
  }, [userRole]);

  const onLogout = async () => {
    await handleLogout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className='w-full bg-primary transition-colors duration-300'>
      <nav className="navbar h-20 relative bg-primary flex justify-between p-0 md:p-5 items-center flex-wrap max-w-[1600px] mx-auto transition-colors duration-300">
        <button type="button" className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(userState.usuario ? '/dashboard' : '/')}>
          <span className="text-primary-foreground text-3xl font-bold my-5 ml-5 md:m-0">AURORA</span>
        </button>

        {/* Desktop Menu */}
        <div className='flex gap-5 items-center'>
          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {userState.usuario ? (
              filteredMenuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className={isActive(item.path) ? "bg-background text-primary hover:bg-background/90" : "text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))
            ) : (
              <>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" onClick={() => navigate("/login")}>
                  Iniciar Sesión
                </Button>
                <Button variant="secondary" className="bg-background text-primary hover:bg-accent" onClick={() => navigate("/register")}>
                  Registrarse
                </Button>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          {userState.usuario && (
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
                      <AvatarImage src={`${apiUrl}${userState.usuario.imagen}`} alt={userState.usuario.nombre} />
                      <AvatarFallback>{userState.usuario.nombre?.substring(0, 2).toUpperCase() || 'US'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userState.usuario.nombre}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userState.usuario.correo}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/mis-pqrs")}>
                      Mis PQRS
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/profile/settings")}>
                      Configuración
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 mr-4 text-sm text-primary-foreground rounded-lg md:hidden hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Abrir menú</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:hidden absolute top-20 left-0 bg-primary z-50 shadow-lg px-4 pb-4 transition-colors duration-300`}>
          <ul className="flex flex-col space-y-2 mt-4">
            {userState.usuario ? (
              <>
                {filteredMenuItems.map((item) => (
                  <li key={item.path}>
                    <Button
                      variant={isActive(item.path) ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive(item.path) ? "bg-background text-primary" : "text-primary-foreground hover:bg-primary/90"}`}
                      onClick={() => {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Button>
                  </li>
                ))}
              </>
            ) : (
              <>
                <li>
                  <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary/90" onClick={() => { navigate("/login"); setIsMenuOpen(false); }}>
                    Iniciar Sesión
                  </Button>
                </li>
                <li>
                  <Button variant="secondary" className="w-full justify-start bg-background text-primary" onClick={() => { navigate("/register"); setIsMenuOpen(false); }}>
                    Registrarse
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
