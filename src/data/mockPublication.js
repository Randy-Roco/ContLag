export const mockPublication = {
  id: 1,
  titulo: 'Publicación Laguna MEL',
  descripcion: 'Última entrega cargada por el desarrollador.',
  fecha: '2026-03-27',
  epsg: 'EPSG:32719',
  raster: {
    tif: {
      nombre: 'laguna_mel_2026_03_27_4bandas.tif',
      url: '#'
    },
    kmz: {
      nombre: 'laguna_mel_2026_03_27_raster.kmz',
      url: '#'
    },
    jpg: {
      nombre: 'laguna_mel_2026_03_27_preview.jpg',
      url: 'https://placehold.co/1200x700/0a0a0a/22d4fd?text=Vista+Previa+Laguna'
    }
  },
  contorno: {
    tipo: 'geojson',
    nombre: 'laguna_mel_2026_03_27_contorno.geojson',
    url: '#'
  }
};