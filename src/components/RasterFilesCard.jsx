export default function RasterFilesCard({ raster }) {
  return (
    <section className="card">
      <h3 className="section-title">Raster disponible</h3>

      <div className="preview-box">
        <img src={raster.jpg.url} alt={raster.jpg.nombre} className="preview-box__image" />
      </div>

      <div className="file-list">
        <a className="file-item" href={raster.tif.url} download>
          <span>TIF 4 bandas</span>
          <strong>{raster.tif.nombre}</strong>
        </a>

        <a className="file-item" href={raster.kmz.url} download>
          <span>KMZ raster</span>
          <strong>{raster.kmz.nombre}</strong>
        </a>

        <a className="file-item" href={raster.jpg.url} download>
          <span>JPG preview</span>
          <strong>{raster.jpg.nombre}</strong>
        </a>
      </div>
    </section>
  );
}