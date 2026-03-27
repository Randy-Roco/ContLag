import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="card notfound-card">
        <h1 className="card__title">404</h1>
        <p className="card__text">La ruta que buscas no existe.</p>
        <Link className="btn btn--primary" to="/">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}