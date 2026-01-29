import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Dashboard Items</h1>
        
        {isAuthenticated ? (
          <div className="home-actions">
            <p className="home-welcome">Bienvenido de nuevo, {user?.name}</p>
            <Link to="/dashboard" className="btn btn-primary">
              Ir al Dashboard
            </Link>
          </div>
        ) : (
          <div className="home-actions">
            <Link to="/register" className="btn btn-primary">
              Comenzar Ahora
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Iniciar Sesion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
