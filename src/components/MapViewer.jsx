import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapViewer({ rasterUrl, geojsonData }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const rasterLayerRef = useRef(null);
  const vectorLayerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-32.8337, -70.5983],
      zoom: 13,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (rasterLayerRef.current) {
      map.removeLayer(rasterLayerRef.current);
      rasterLayerRef.current = null;
    }

    if (rasterUrl) {
      const fakeBounds = [
        [-32.845, -70.615],
        [-32.822, -70.582]
      ];

      const rasterLayer = L.imageOverlay(rasterUrl, fakeBounds, {
        opacity: 0.8
      });

      rasterLayer.addTo(map);
      rasterLayerRef.current = rasterLayer;
      map.fitBounds(fakeBounds);
    }
  }, [rasterUrl]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (vectorLayerRef.current) {
      map.removeLayer(vectorLayerRef.current);
      vectorLayerRef.current = null;
    }

    if (geojsonData) {
      const vectorLayer = L.geoJSON(geojsonData, {
        style: {
          color: '#22d4fd',
          weight: 3,
          opacity: 1,
          fillColor: '#22d4fd',
          fillOpacity: 0.12
        },
        pointToLayer: (_, latlng) =>
          L.circleMarker(latlng, {
            radius: 6,
            color: '#22d4fd',
            weight: 2,
            fillColor: '#22d4fd',
            fillOpacity: 0.9
          }),
        onEachFeature: (feature, layer) => {
          const props = feature?.properties || {};
          const content =
            Object.keys(props).length > 0
              ? Object.entries(props)
                  .map(([key, value]) => `<strong>${key}</strong>: ${value}`)
                  .join('<br>')
              : 'Contorno vectorial';

          layer.bindPopup(content);
        }
      });

      vectorLayer.addTo(map);
      vectorLayerRef.current = vectorLayer;

      const bounds = vectorLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [geojsonData]);

  return (
    <section className="card">
      <h3 className="section-title">Vista geoespacial</h3>
      <div className="map-viewer">
        <div ref={mapContainerRef} className="map-viewer__map" />
      </div>
    </section>
  );
}