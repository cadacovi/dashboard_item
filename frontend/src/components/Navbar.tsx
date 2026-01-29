import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Dashboard Items
        </Link>
        
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <span className="navbar-user">Hola, {user?.name}</span>
              <button onClick={handleLogout} className="navbar-button">
                Cerrar Sesion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Iniciar Sesion
              </Link>
              <Link to="/register" className="navbar-button">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
