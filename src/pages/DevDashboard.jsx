import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import { getAllPublications, savePublication } from '../data/publicationStorage';

const INITIAL_FORM = {
  titulo: '',
  descripcion: '',
  fecha: new Date().toISOString().slice(0, 10),
  rasterTif: null,
  rasterKmz: null,
  rasterJpg: null,
  contorno: null
};

function getContornoTipo(file) {
  if (!file) return '';

  const name = file.name.toLowerCase();

  if (name.endsWith('.zip')) return 'shp';
  if (name.endsWith('.geojson')) return 'geojson';
  if (name.endsWith('.kmz')) return 'kmz';

  return 'desconocido';
}

export default function DevDashboard() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    setPublications(getAllPublications());
  }, []);

  const ultimaPublicacion = useMemo(() => {
    return publications.find((item) => item.esUltima) || null;
  }, [publications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;

    setForm((prev) => ({
      ...prev,
      [name]: file
    }));
  };

  const resetForm = () => {
    setForm({
      ...INITIAL_FORM,
      fecha: new Date().toISOString().slice(0, 10)
    });

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = '';
    });
  };

  const validateForm = () => {
    if (!form.titulo.trim()) {
      return 'Debes ingresar un título de publicación.';
    }

    if (!form.fecha) {
      return 'Debes indicar una fecha.';
    }

    if (!form.rasterTif) {
      return 'Debes cargar el raster TIF de 4 bandas.';
    }

    if (!form.rasterKmz) {
      return 'Debes cargar el raster KMZ.';
    }

    if (!form.rasterJpg) {
      return 'Debes cargar el JPG de vista previa.';
    }

    if (!form.contorno) {
      return 'Debes cargar el contorno vectorial.';
    }

    const contornoTipo = getContornoTipo(form.contorno);
    if (contornoTipo === 'desconocido') {
      return 'El contorno debe ser ZIP (shapefile), GEOJSON o KMZ.';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const contornoTipo = getContornoTipo(form.contorno);

    const newPublication = {
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      fecha: form.fecha,
      epsg: 'EPSG:32719',
      raster: {
        tif: {
          nombre: form.rasterTif.name,
          url: URL.createObjectURL(form.rasterTif)
        },
        kmz: {
          nombre: form.rasterKmz.name,
          url: URL.createObjectURL(form.rasterKmz)
        },
        jpg: {
          nombre: form.rasterJpg.name,
          url: URL.createObjectURL(form.rasterJpg)
        }
      },
      contorno: {
        tipo: contornoTipo,
        nombre: form.contorno.name,
        url: URL.createObjectURL(form.contorno)
      }
    };

    const result = savePublication(newPublication);

    if (!result.ok) {
      setError('No fue posible guardar la publicación en localStorage.');
      return;
    }

    setPublications(getAllPublications());
    setMessage('Publicación guardada correctamente. Ahora el cliente verá esta última versión.');
    resetForm();
  };

  return (
    <main className="dashboard-shell">
      <Header title="Panel Desarrollador" />

      <section className="dashboard-grid dashboard-grid--dev">
        <section className="card">
          <h2 className="section-title">Nueva publicación</h2>
          <p className="section-text">
            Carga los archivos oficiales del proyecto. Esta publicación quedará
            marcada automáticamente como la última visible para el cliente.
          </p>

          <form className="upload-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Título de publicación</span>
              <input
                type="text"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                placeholder="Ej: Laguna MEL - 2026-03-27"
              />
            </label>

            <label className="field">
              <span>Descripción</span>
              <textarea
                rows="4"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Observaciones de la publicación"
              />
            </label>

            <label className="field">
              <span>Fecha de publicación</span>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
              />
            </label>

            <div className="upload-grid">
              <label className="upload-box">
                <span>Raster TIF 4 bandas</span>
                <input
                  type="file"
                  name="rasterTif"
                  accept=".tif,.tiff"
                  onChange={handleFileChange}
                />
                <small>{form.rasterTif ? form.rasterTif.name : 'Sin archivo seleccionado'}</small>
              </label>

              <label className="upload-box">
                <span>Raster KMZ</span>
                <input
                  type="file"
                  name="rasterKmz"
                  accept=".kmz"
                  onChange={handleFileChange}
                />
                <small>{form.rasterKmz ? form.rasterKmz.name : 'Sin archivo seleccionado'}</small>
              </label>

              <label className="upload-box">
                <span>Preview JPG</span>
                <input
                  type="file"
                  name="rasterJpg"
                  accept=".jpg,.jpeg"
                  onChange={handleFileChange}
                />
                <small>{form.rasterJpg ? form.rasterJpg.name : 'Sin archivo seleccionado'}</small>
              </label>

              <label className="upload-box">
                <span>Contorno vectorial</span>
                <input
                  type="file"
                  name="contorno"
                  accept=".zip,.geojson,.kmz"
                  onChange={handleFileChange}
                />
                <small>{form.contorno ? form.contorno.name : 'Sin archivo seleccionado'}</small>
              </label>
            </div>

            <div className="form-inline-note">
              <span>
                EPSG fijo de trabajo: <strong>32719</strong>
              </span>
              <span>
                Formatos vectoriales permitidos: <strong>ZIP / GEOJSON / KMZ</strong>
              </span>
            </div>

            {error ? <p className="form-error">{error}</p> : null}
            {message ? <p className="form-success">{message}</p> : null}

            <button type="submit" className="btn btn--primary">
              Guardar publicación
            </button>
          </form>
        </section>

        <section className="card">
          <h2 className="section-title">Última publicación cargada</h2>

          {ultimaPublicacion ? (
            <div className="mini-info">
              <p>
                <strong>{ultimaPublicacion.titulo}</strong>
              </p>
              <p>{ultimaPublicacion.fecha}</p>
              <p>{ultimaPublicacion.epsg}</p>
              <p>Contorno: {ultimaPublicacion.contorno?.tipo}</p>
            </div>
          ) : (
            <p className="section-text">Aún no hay publicaciones guardadas.</p>
          )}
        </section>

        <section className="card">
          <h2 className="section-title">Historial local</h2>

          {publications.length === 0 ? (
            <p className="section-text">Todavía no existen publicaciones en localStorage.</p>
          ) : (
            <div className="history-list">
              {publications.map((item) => (
                <article key={item.id} className="history-item">
                  <div className="history-item__top">
                    <strong>{item.titulo}</strong>
                    {item.esUltima ? <span className="badge">Última</span> : null}
                  </div>
                  <p>{item.fecha}</p>
                  <p>{item.epsg}</p>
                  <p>Contorno: {item.contorno?.tipo}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}