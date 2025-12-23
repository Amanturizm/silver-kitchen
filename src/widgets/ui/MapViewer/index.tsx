'use client';

import React, { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

type MapViewerProps = {
  latitude: number | string;
  longitude: number | string;
  address?: string;
  height?: number;
  zoom?: number;
};

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function ResizeFix({ open }: { open: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        map.invalidateSize();
      }, 0);
    }
  }, [map, open]);

  return null;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  latitude,
  longitude,
  address = '',
  height = 400,
  zoom = 16,
}) => {
  const mapRef = React.useRef<L.Map>(null);
  const latNum = Number(latitude);
  const lngNum = Number(longitude);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  if (isNaN(latNum) || isNaN(lngNum)) {
    return <div>Координаты не указаны</div>;
  }

  return (
    <MapContainer
      ref={mapRef}
      key={`${latNum}-${lngNum}`}
      center={[latNum, lngNum]}
      zoom={zoom}
      style={{ height, width: '100%', borderRadius: 12 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[latNum, lngNum]}>{address && <Popup>{address}</Popup>}</Marker>
      <ResizeFix open={true} />
    </MapContainer>
  );
};
