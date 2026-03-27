export default function VectorFilesCard({ contorno }) {
  return (
    <section className="card">
      <h3 className="section-title">Contorno vectorial</h3>

      <div className="file-list">
        <a className="file-item" href={contorno.url} download>
          <span>Formato</span>
          <strong>{contorno.nombre}</strong>
        </a>
      </div>
    </section>
  );
}