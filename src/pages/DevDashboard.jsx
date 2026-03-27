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
  vectorShpZip: null,
  vectorGeojson: null,
  vectorKmz: null
};

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
      return 'Debes cargar el raster TIF.';
    }

    if (!form.rasterKmz) {
      return 'Debes cargar el raster KMZ.';
    }

    if (!form.rasterJpg) {
      return 'Debes cargar el raster JPG.';
    }

    if (!form.vectorShpZip) {
      return 'Debes cargar el contorno SHP en ZIP.';
    }

    if (!form.vectorGeojson) {
      return 'Debes cargar el contorno GeoJSON.';
    }

    if (!form.vectorKmz) {
      return 'Debes cargar el contorno KMZ.';
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
      vector: {
        shpZip: {
          nombre: form.vectorShpZip.name,
          url: URL.createObjectURL(form.vectorShpZip)
        },
        geojson: {
          nombre: form.vectorGeojson.name,
          url: URL.createObjectURL(form.vectorGeojson)
        },
        kmz: {
          nombre: form.vectorKmz.name,
          url: URL.createObjectURL(form.vectorKmz)
        }
      }
    };

    const result = savePublication(newPublication);

    if (!result.ok) {
      setError('No fue posible guardar la publicación en localStorage.');
      return;
    }

    setPublications(getAllPublications());
    setMessage('Publicación guardada correctamente. El cliente ya puede descargar raster y vector en todos los formatos cargados.');
    resetForm();
  };

  return (
    <main className="dashboard-shell">
      <Header title="Panel Desarrollador" />

      <section className="dashboard-grid dashboard-grid--dev">
        <section className="card">
          <h2 className="section-title">Nueva publicación</h2>
          <p className="section-text">
            Carga raster y contornos vectoriales completos para que el cliente visualice la última publicación y descargue los archivos.
          </p>

          <form className="upload-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Título de publicación</span>
              <input
                type="text"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                placeholder="Ej: 2025-10-06 Laguna MEL"
              />
            </label>

            <label className="field">
              <span>Descripción</span>
              <textarea
                rows="4"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Ej: Actualización laguna MEL correspondiente a la fecha..."
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

            <h3 className="subsection-title">Raster</h3>
            <div className="upload-grid">
              <label className="upload-box">
                <span>Raster TIF</span>
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
                <span>Raster JPG</span>
                <input
                  type="file"
                  name="rasterJpg"
                  accept=".jpg,.jpeg"
                  onChange={handleFileChange}
                />
                <small>{form.rasterJpg ? form.rasterJpg.name : 'Sin archivo seleccionado'}</small>
              </label>
            </div>

            <h3 className="subsection-title">Contorno vectorial</h3>
            <div className="upload-grid">
              <label className="upload-box">
                <span>SHP en ZIP</span>
                <input
                  type="file"
                  name="vectorShpZip"
                  accept=".zip"
                  onChange={handleFileChange}
                />
                <small>{form.vectorShpZip ? form.vectorShpZip.name : 'Sin archivo seleccionado'}</small>
              </label>

              <label className="upload-box">
                <span>GeoJSON</span>
                <input
                  type="file"
                  name="vectorGeojson"
                  accept=".geojson,.json"
                  onChange={handleFileChange}
                />
                <small>{form.vectorGeojson ? form.vectorGeojson.name : 'Sin archivo seleccionado'}</small>
              </label>

              <label className="upload-box">
                <span>KMZ vectorial</span>
                <input
                  type="file"
                  name="vectorKmz"
                  accept=".kmz"
                  onChange={handleFileChange}
                />
                <small>{form.vectorKmz ? form.vectorKmz.name : 'Sin archivo seleccionado'}</small>
              </label>
            </div>

            <div className="form-inline-note">
              <span>
                EPSG fijo de trabajo: <strong>32719</strong>
              </span>
              <span>
                Tranque Minera Escondida MEL
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
              <p><strong>{ultimaPublicacion.titulo}</strong></p>
              <p>{ultimaPublicacion.fecha}</p>
              <p>{ultimaPublicacion.epsg}</p>
              <p>Raster: TIF / KMZ / JPG</p>
              <p>Vector: SHP ZIP / GeoJSON / KMZ</p>
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
                  <p>Raster: TIF / KMZ / JPG</p>
                  <p>Vector: SHP ZIP / GeoJSON / KMZ</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}