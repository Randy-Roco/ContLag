export default function PublicationCard({ publication }) {
  return (
    <section className="card publication-card">
      <div className="card__topline">
        <span className="badge">Última publicación</span>
        <span className="badge badge--muted">{publication.epsg}</span>
      </div>

      <h2 className="card__title">{publication.titulo}</h2>
      <p className="card__text">{publication.descripcion}</p>

      <div className="meta-grid">
        <div className="meta-item">
          <span className="meta-item__label">Fecha</span>
          <span className="meta-item__value">{publication.fecha}</span>
        </div>
        <div className="meta-item">
          <span className="meta-item__label">Raster</span>
          <span className="meta-item__value">TIF / KMZ / JPG</span>
        </div>
        <div className="meta-item">
          <span className="meta-item__label">Vector</span>
          <span className="meta-item__value">SHP ZIP / GeoJSON / KMZ</span>
        </div>
      </div>
    </section>
  );
}