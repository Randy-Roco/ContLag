export default function RasterFilesCard({ raster }) {
  const previewDisponible = raster?.jpg?.url && raster.jpg.url !== '#';

  return (
    <section className="card">
      <h3 className="section-title">Raster disponible</h3>

      <div className="preview-box">
        {previewDisponible ? (
          <img
            src={raster.jpg.url}
            alt={raster.jpg.nombre}
            className="preview-box__image"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) fallback.style.display = 'grid';
            }}
          />
        ) : null}

        <div
          className="preview-box__fallback"
          style={{ display: previewDisponible ? 'none' : 'grid' }}
        >
          <span>Vista previa no disponible en esta sesión</span>
          <small>La metadata sigue guardada, pero el archivo local debe recargarse o migrarse a storage real.</small>
        </div>
      </div>

      <div className="file-list">
        <a className="file-item" href={raster?.tif?.url || '#'} download>
          <span>TIF 4 bandas</span>
          <strong>{raster?.tif?.nombre || 'No disponible'}</strong>
        </a>

        <a className="file-item" href={raster?.kmz?.url || '#'} download>
          <span>KMZ raster</span>
          <strong>{raster?.kmz?.nombre || 'No disponible'}</strong>
        </a>

        <a className="file-item" href={raster?.jpg?.url || '#'} download>
          <span>JPG preview</span>
          <strong>{raster?.jpg?.nombre || 'No disponible'}</strong>
        </a>
      </div>
    </section>
  );
}