import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div>
        <p className="header__eyebrow">Contorno Laguna 2</p>
        <h1 className="header__title">{title}</h1>
      </div>

      <div className="header__actions">
        <div className="header__userbox">
          <span className="header__userbox__name">{user?.nombre}</span>
          <span className="header__userbox__role">Rol: {user?.role}</span>
        </div>
        <button className="btn btn--ghost" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}