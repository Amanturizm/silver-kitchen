'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { point, polygon } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { TextInput } from '../TextInput';
import { MapPin } from 'lucide-react';
import { KyrgyzstanGeometry } from './kyrgyzstan-geo';

interface MapInputProps {
  value?: { addressText: string; lat: string; lng: string };
  onChange?: (val: { addressText: string; lat: string; lng: string }) => void;
  label?: string;
  disabled?: boolean;
}

const defaultCenter: [number, number] = [42.863122292050065, 74.5868706454166];
const defaultZoom = 8;
const reverseUrl = 'https://nominatim.openstreetmap.org/reverse';
const kyrgyzPolygonTurf = polygon([KyrgyzstanGeometry[0].map(([lat, lng]) => [lng, lat])]);

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export const MapInput = ({ value, onChange, label, disabled }: MapInputProps) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const mapRef = useRef<any>(null);

  const [tempPlaceMark, setTempPlaceMark] = useState<[number, number]>(
    value && value.lat && value.lng ? [Number(value.lat), Number(value.lng)] : defaultCenter,
  );
  const [tempAddress, setTempAddress] = useState(value?.addressText || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mapRef.current && open) {
      const map = (mapRef.current as any)._leaflet_map as L.Map;
      if (map) {
        map.invalidateSize();
        map.setView(tempPlaceMark, map.getZoom(), { animate: false });
      }
    }
  }, [open, tempPlaceMark]);

  const handleOpen = () => {
    setVisible(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setVisible(false), 100);
  };

  const handleMapClick = async (latlng: L.LatLng) => {
    const pt = point([latlng.lng, latlng.lat]);
    if (!booleanPointInPolygon(pt, kyrgyzPolygonTurf)) return;

    setTempPlaceMark([latlng.lat, latlng.lng]);

    try {
      setLoading(true);
      const res = await fetch(
        `${reverseUrl}?lat=${latlng.lat}&lon=${latlng.lng}&format=json&accept-language=ru`,
      );
      const data = await res.json();
      setTempAddress(data.display_name);
    } catch (err) {
      console.error('Ошибка reverse geocode', err);
    } finally {
      setLoading(false);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({ click: (e) => handleMapClick(e.latlng) });
    return null;
  };

  const handleOk = () => {
    onChange?.({
      addressText: tempAddress,
      lat: String(tempPlaceMark[0]),
      lng: String(tempPlaceMark[1]),
    });
    handleClose();
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setTempPlaceMark(
      value && value.lat && value.lng ? [Number(value.lat), Number(value.lng)] : defaultCenter,
    );
    setTempAddress(value?.addressText || '');
    handleClose();
  };

  const isCoordsSelected = !!tempAddress;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <TextInput
        value={value?.addressText}
        onChange={(v) =>
          onChange?.({ addressText: v, lat: value?.lat || '', lng: value?.lng || '' })
        }
        disabled={disabled || !isCoordsSelected}
        leftSection={
          <button
            type="button"
            className="px-2 rounded-md bg-gray-500 text-white transition-colors duration-200 hover:bg-gray-600 cursor-pointer"
            onClick={handleOpen}
          >
            <MapPin size={22} />
          </button>
        }
      />

      {visible && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleCancel}
        >
          <div
            ref={mapRef}
            className={`bg-white rounded-md p-2 animate-duration-200 ${
              open ? 'animate-none' : 'animate-jump-out animate-duration-100 animate-ease-in'
            }`}
            style={{ height: '70vh', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <MapContainer
              center={tempPlaceMark}
              zoom={defaultZoom}
              style={{ height: '100%', width: '100%' }}
              maxBounds={L.latLngBounds(KyrgyzstanGeometry[0])}
              maxBoundsViscosity={1.0}
              scrollWheelZoom
              minZoom={8}
              maxZoom={18}
            >
              <TileLayer
                url="https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Polygon
                positions={[
                  [
                    [-90, -180],
                    [-90, 180],
                    [90, 180],
                    [90, -180],
                  ],
                  ...KyrgyzstanGeometry,
                ]}
                pathOptions={{
                  color: 'transparent',
                  weight: 0,
                  fillColor: 'white',
                  fillOpacity: 1,
                }}
              />
              <Polygon
                positions={KyrgyzstanGeometry}
                pathOptions={{
                  color: '#34485b',
                  weight: 1,
                  fillColor: 'transparent',
                  fillOpacity: 1,
                }}
              />
              <Marker position={tempPlaceMark}>
                <Popup>{tempAddress}</Popup>
              </Marker>
              <MapClickHandler />
            </MapContainer>

            <div className="mt-4 flex justify-center gap-2">
              <button
                type="button"
                onClick={handleOk}
                disabled={!isCoordsSelected || loading}
                className={`rounded-lg py-2 px-5 text-md transition-colors flex items-center justify-center gap-3 ${
                  isCoordsSelected && !loading
                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading && (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                )}
                Подтвердить
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer rounded-lg py-2 px-4 text-md bg-gray-500 text-white hover:bg-gray-600 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
