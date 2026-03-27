export default function VectorFilesCard({ vector }) {
  if (!vector) {
    return (
      <section className="card">
        <h3 className="section-title">Contorno vectorial</h3>
        <p className="section-text">No hay archivos vectoriales disponibles.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h3 className="section-title">Contorno vectorial</h3>

      <div className="file-list">
        <a className="file-item" href={vector.shpZip?.url || '#'} download>
          <span>SHP en ZIP</span>
          <strong>{vector.shpZip?.nombre || 'No disponible'}</strong>
        </a>

        <a className="file-item" href={vector.geojson?.url || '#'} download>
          <span>GeoJSON</span>
          <strong>{vector.geojson?.nombre || 'No disponible'}</strong>
        </a>

        <a className="file-item" href={vector.kmz?.url || '#'} download>
          <span>KMZ vectorial</span>
          <strong>{vector.kmz?.nombre || 'No disponible'}</strong>
        </a>
      </div>
    </section>
  );
}