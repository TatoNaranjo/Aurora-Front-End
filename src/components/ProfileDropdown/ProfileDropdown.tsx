import { useState, useRef, useEffect } from "react";
import "./ProfileDropdown.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AppContext";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const {logout} = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profileDropdown" ref={dropdownRef}>
      <img
        src="/assets/profile.svg"
        alt="Avatar"
        className="avatar"
        onClick={toggleDropdown}
      />
      {isOpen && (
        <ul className="dropdownMenu">
          <li>
            <Link to="/profile">
              Perfil
            </Link>
          </li>
          <li>
            <Link to="/settings">
              Ajustes
            </Link>
          </li>
          <li>
            <button onClick={logout} className="dropdownLink">
              Cerrar Sesión
            </button>
  </li>
        </ul>
      )}
    </div>
  );
}