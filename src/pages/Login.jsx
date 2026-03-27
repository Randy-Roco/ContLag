import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(username.trim(), password.trim());

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(result.user.role === 'desarrollador' ? '/desarrollador' : '/cliente');
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-card__eyebrow">Sistema privado</p>
        <h1 className="auth-card__title">Contorno Laguna 2</h1>
        <p className="auth-card__text">
          Plataforma de publicación y visualización de raster y contornos vectoriales en EPSG:32719.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Usuario</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
            />
          </label>

          <label className="field">
            <span>Clave</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu clave"
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="btn btn--primary" type="submit">
            Ingresar
          </button>
        </form>

        <div className="auth-help">
          <p><strong>Demo desarrollador:</strong> dev / 1234</p>
          <p><strong>Demo cliente:</strong> cliente / 1234</p>
        </div>
      </section>
    </main>
  );
}