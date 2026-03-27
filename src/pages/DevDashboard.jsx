import Header from '../components/Header';
import { mockPublication } from '../data/mockPublication';

export default function DevDashboard() {
  return (
    <main className="dashboard-shell">
      <Header title="Panel Desarrollador" />

      <section className="dashboard-grid">
        <section className="card">
          <h2 className="section-title">Nueva publicación</h2>
          <p className="section-text">
            Aquí cargaremos luego los archivos reales: TIF 4 bandas, KMZ raster, JPG preview y contorno vectorial.
          </p>

          <form className="upload-form">
            <label className="field">
              <span>Título de publicación</span>
              <input type="text" placeholder="Ej: Laguna MEL - 2026-03-27" />
            </label>

            <label className="field">
              <span>Descripción</span>
              <textarea rows="4" placeholder="Observaciones de la publicación"></textarea>
            </label>

            <div className="upload-grid">
              <label className="upload-box">
                <span>Raster TIF 4 bandas</span>
                <input type="file" accept=".tif,.tiff" />
              </label>

              <label className="upload-box">
                <span>Raster KMZ</span>
                <input type="file" accept=".kmz" />
              </label>

              <label className="upload-box">
                <span>Preview JPG</span>
                <input type="file" accept=".jpg,.jpeg" />
              </label>

              <label className="upload-box">
                <span>Contorno vectorial</span>
                <input type="file" accept=".zip,.geojson,.kmz" />
              </label>
            </div>

            <div className="form-inline-note">
              <span>EPSG fijo de trabajo: <strong>32719</strong></span>
            </div>

            <button type="button" className="btn btn--primary">
              Guardar publicación
            </button>
          </form>
        </section>

        <section className="card">
          <h2 className="section-title">Última publicación cargada</h2>
          <div className="mini-info">
            <p><strong>{mockPublication.titulo}</strong></p>
            <p>{mockPublication.fecha}</p>
            <p>{mockPublication.epsg}</p>
          </div>
        </section>
      </section>
    </main>
  );
}