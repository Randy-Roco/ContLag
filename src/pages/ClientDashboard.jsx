import { useEffect, useState } from 'react';
import Header from '../components/Header';
import PublicationCard from '../components/PublicationCard';
import RasterFilesCard from '../components/RasterFilesCard';
import VectorFilesCard from '../components/VectorFilesCard';
import MapViewer from '../components/MapViewer';
import { getLastPublication } from '../data/publicationStorage';

export default function ClientDashboard() {
  const [publication, setPublication] = useState(null);

  useEffect(() => {
    const ultima = getLastPublication();
    setPublication(ultima);
  }, []);

  return (
    <main className="dashboard-shell">
      <Header title="Panel Cliente" />

      {!publication ? (
        <section className="card">
          <h2 className="section-title">Sin publicaciones</h2>
          <p className="section-text">
            Aún no hay publicaciones disponibles. Espera a que el desarrollador cargue una.
          </p>
        </section>
      ) : (
        <section className="dashboard-grid">
          <PublicationCard publication={publication} />

          <MapViewer
            rasterUrl={publication?.raster?.jpg?.url || null}
            geojsonData={null}
          />

          <RasterFilesCard raster={publication.raster} />
          <VectorFilesCard contorno={publication.contorno} />
        </section>
      )}
    </main>
  );
}