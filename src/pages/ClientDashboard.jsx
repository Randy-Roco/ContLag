import Header from '../components/Header';
import PublicationCard from '../components/PublicationCard';
import RasterFilesCard from '../components/RasterFilesCard';
import VectorFilesCard from '../components/VectorFilesCard';
import { mockPublication } from '../data/mockPublication';

export default function ClientDashboard() {
  return (
    <main className="dashboard-shell">
      <Header title="Panel Cliente" />

      <section className="dashboard-grid">
        <PublicationCard publication={mockPublication} />
        <RasterFilesCard raster={mockPublication.raster} />
        <VectorFilesCard contorno={mockPublication.contorno} />
      </section>
    </main>
  );
}